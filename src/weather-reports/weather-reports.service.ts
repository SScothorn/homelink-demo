import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { DailyWeatherReportsService } from 'src/daily-weather-reports/daily-weather-reports.service';
import { DailyWeatherReport } from 'src/daily-weather-reports/models/daily-weather-report.model';
import { UpsertHourlyWeatherReportDto } from 'src/hourly-weather-reports/dto/upsert-hourly-weather-report.dto';
import { IWeatherApiDailyResponse } from 'src/weather-api/interfaces/weather-api-response.interface';
import { WeatherApiService } from 'src/weather-api/weather-api.service';
import { WeatherReport } from './models/weather-report.model';
import { addDays, addHours, clamp, isEqual, subHours } from 'date-fns';
import { HourlyWeatherReportsService } from 'src/hourly-weather-reports/hourly-weather-reports.service';
import { UpsertDailyWeatherReportDto } from 'src/daily-weather-reports/dto/upsert-daily-weather-report.dto';
import { findAllDaysBetween2Dates, findAllHoursBetween2Dates, roundUpToHour } from 'util/date.util';

@Injectable()
export class WeatherReportsService {
	constructor(
		private sequelize: Sequelize,
		private DailyWeatherReportsService: DailyWeatherReportsService,
		private HourlyWeatherReportsService: HourlyWeatherReportsService,
		private WeatherAPIService: WeatherApiService,
	) {}

	private readonly MAX_FORECAST_IN_DAYS = 14;

	/**
	 * Gets the weather reports for a post code, and formats it to return.
	 * @param postcode
	 * @param from Weather reports from this date-time (inclusive). Defaults to now.
	 * @param to Weather reports up to this date-time (exclusive). Defaults to now + 13 days.
	 */
	async getWeatherReportsByPostCode(postcode: string, from?: Date, to?: Date): Promise<WeatherReport> {
		const minimumDate = new Date();
		const maximumDate = addDays(new Date(minimumDate.toDateString()), this.MAX_FORECAST_IN_DAYS);

		// Validate params
		from = from != null ? clamp(from, { start: minimumDate, end: maximumDate }) : minimumDate;
		to = to != null ? clamp(to, { start: minimumDate, end: maximumDate }) : maximumDate;

		// Get the unformatted weather reports
		let reports = await this.DailyWeatherReportsService.getDailyWeatherReportsByPostCode(postcode, from, to);

		if (this.isMissingReports(reports, from, to)) {
			await this.addMissingReports(postcode, reports);
			// Get the updated results
			reports = await this.DailyWeatherReportsService.getDailyWeatherReportsByPostCode(postcode, from, to);
		}
		// Format results
		const formattedReports: WeatherReport = this.formatDailyWeatherReports(postcode, from, to, reports);

		// Return results
		return formattedReports;
	}

	/**
	 * Checks whether any results are missing for the reports stored in the db.
	 */
	private isMissingReports(dailyReports: DailyWeatherReport[], from: Date, to: Date): boolean {
		// If no results, then all results are missing
		if (!dailyReports?.length) {
			return true;
		}

		// I've included 2 methods for checking for missing reports.
		// Option 1 checks by iterating through and checking each report exists
		if (this.isMissingReportsIterativeMethod(dailyReports, from, to)) {
			return true;
		}

		// Option 2 only checks the very last report. Due to how reports are stored, unless a report is manually deleted in the db,
		// if the last report is present there should be no way for any of the reports prior to it to be missing.
		if (this.isMissingReportsLastTimeMethod(dailyReports, to)) {
			return true;
		}

		return false;
	}

	/**
	 * Checks if all results are present
	 * Option 1 - iterate through and check every expect one is present
	 * This is slower but more thorough.
	 */
	private isMissingReportsIterativeMethod(dailyReports: DailyWeatherReport[], from: Date, to: Date): boolean {
		// Iterate through days first as quicker than going through by the hours
		const allExpectedDays = findAllDaysBetween2Dates(from, to);
		if (allExpectedDays.length !== dailyReports.length) {
			return true;
		}
		allExpectedDays.forEach((expectedDay, i) => {
			if (!isEqual(expectedDay, new Date(dailyReports[i].date))) {
				return true;
			}
		});

		const allExpectedHours = findAllHoursBetween2Dates(from, to);
		const allExistingHours = dailyReports.flatMap((dailyReport) => dailyReport.hourlyWeatherReports).map((hourlyReport) => hourlyReport.time);
		if (allExpectedHours.length !== allExistingHours.length) {
			return true;
		}
		allExpectedHours.forEach((expectedHour, i) => {
			if (!isEqual(expectedHour, allExistingHours[i])) {
				return true;
			}
		});
	}

	/**
	 * Option 2 - check the very last daily and hourly report exists. If they are present, there is no reason the other reports shouldn't be there.
	 * Is a less thorough but quicker way of checking.
	 */
	private isMissingReportsLastTimeMethod(dailyReports: DailyWeatherReport[], to: Date): boolean {
		// Option 2 - check the very last daily and hourly report exists. If they are present, there is no reason the other reports shouldn't be there.
		// Is a less thorough but quicker way of checking.
		// Round up and subtract one hour to handle situations where 'to' is exactly on the hour, as return is exclusive of 'to'
		const lastExpectedHour = subHours(new Date(roundUpToHour(to.getTime())), 1);
		const lastDaysHourlyReports = dailyReports?.at(-1)?.hourlyWeatherReports;
		if (!isEqual(lastDaysHourlyReports?.at(-1)?.time, lastExpectedHour)) {
			console.log('____');
			console.log(`${lastDaysHourlyReports?.at(-1)?.time}`);
			console.log(`${lastExpectedHour}`);
			return true;
		}
	}

	/**
	 * Finds all all the available weather data for a post code from the 3rd party API, then stores in the db if it might be missing.
	 */
	private async addMissingReports(postcode: string, existingDailyReports: DailyWeatherReport[]) {
		const newReports = await this.WeatherAPIService.getWeatherReportForPostcode(postcode);
		try {
			await this.sequelize.transaction(async (transaction) => {
				await Promise.all(
					newReports.data.weather.map(async (newDailyReport) => {
						// See if there's an existing result
						const existingDailyReport = existingDailyReports.find((existingDailyReport) => isEqual(new Date(newDailyReport.date), new Date(existingDailyReport.date)));
						await this.addMissingResult(postcode, newDailyReport, existingDailyReport, transaction);
					}),
				);
			});
		} catch (err) {
			// Transaction has been rolled back
			// err is whatever rejected the promise chain returned to the transaction callback
			throw new Error(`Failed to add missing reports for ${postcode}`);
		}
	}

	/**
	 * Upserts the weather data we've retrieved into the 3rd Party API into our db. Upserts as it is not known if all the retrieved data is missing from our db.
	 * Could get it from the db and compare but Upsert achieves the same. We don't upsert the data we know is in the db, and was brough down with the original request.
	 */
	async addMissingResult(postcode, newDailyReport: IWeatherApiDailyResponse, existingDailyWeatherReport: DailyWeatherReport, transaction: Transaction) {
		const date = new Date(newDailyReport.date);
		let dailyWeatherReportId = existingDailyWeatherReport?.id;

		// If there's no existing day report, add it
		if (existingDailyWeatherReport == null) {
			// Store the data as a string for the same of this demo.
			const data = { ...newDailyReport };
			delete data?.hourly;
			const upsertDailyDTO = new UpsertDailyWeatherReportDto(postcode, date, JSON.stringify(data));
			const newDailyWeatherReport = await this.DailyWeatherReportsService.upsert(upsertDailyDTO, transaction);
			dailyWeatherReportId = newDailyWeatherReport.id;
		}

		// Find the hourly reports that need to be upserted by filtering out the already existing ones from the new ones.
		const hourlyReportToUpsert = newDailyReport.hourly.filter((newHourlyReport) => {
			const existingHourlyReports = existingDailyWeatherReport?.hourlyWeatherReports ?? [];
			const res = existingHourlyReports.findIndex((hourlyWeatherReport) => isEqual(hourlyWeatherReport.time, addHours(date, +newHourlyReport.time / 100)));
			return res == -1;
		});

		// Upsert all hourly reports not in the existing report.
		await Promise.all(
			hourlyReportToUpsert.map(async (newHourlyReport) => {
				const dateTime = addHours(date, +newHourlyReport.time / 100);
				// Store the data as a string for the same of this demo.
				const upsertHourlyDTO: UpsertHourlyWeatherReportDto = new UpsertHourlyWeatherReportDto(dailyWeatherReportId, dateTime, JSON.stringify(newHourlyReport));
				await this.HourlyWeatherReportsService.upsert(upsertHourlyDTO, transaction);
			}),
		);
	}

	/**
	 * Formats the reports into a a format appropriate for the front end.
	 */
	private formatDailyWeatherReports(postcode: string, from: Date, to: Date, dailyWeatherReports: DailyWeatherReport[]): WeatherReport {
		return {
			postcode,
			from,
			to,
			dailyWeatherReports,
		};
	}
}
