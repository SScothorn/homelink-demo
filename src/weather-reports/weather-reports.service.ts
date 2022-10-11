import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { DailyWeatherReportsService } from 'src/daily-weather-reports/daily-weather-reports.service';
import { DailyWeatherReport } from 'src/daily-weather-reports/models/daily-weather-report.model';
import { UpsertHourlyWeatherReportDto } from 'src/hourly-weather-reports/dto/upsert-hourly-weather-report.dto';
import { IWeatherApiDailyResponse } from 'src/weather-api/interfaces/weather-api-response.interface';
import { WeatherApiService } from 'src/weather-api/weather-api.service';
import { WeatherReport } from './models/weather-report.model';
import { addHours, isEqual } from 'date-fns';
import { HourlyWeatherReportsService } from 'src/hourly-weather-reports/hourly-weather-reports.service';
import { UpsertDailyWeatherReportDto } from 'src/daily-weather-reports/dto/upsert-daily-weather-report.dto';

@Injectable()
export class WeatherReportsService {
	constructor(
		private sequelize: Sequelize,
		private DailyWeatherReportsService: DailyWeatherReportsService,
		private HourlyWeatherReportsService: HourlyWeatherReportsService,
		private WeatherAPIService: WeatherApiService,
	) {}
	/**
	 * Gets the weather reports for a post code, and formats it to return.
	 * @param postcode
	 * @param from Weather reports from this date-time (inclusive)
	 * @param to Weather reports up to this date-time (exclusive)
	 */
	async getWeatherReportsByPostCode(postcode: string, from?: Date, to?: Date): Promise<WeatherReport> {
		// Validate params

		// Get the unformatted weather reports
		let reports = await this.DailyWeatherReportsService.getDailyWeatherReportsByPostCode(postcode, from, to);

		if (this.isMissingReports(reports)) {
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
	private isMissingReports(reports: DailyWeatherReport[]): boolean {
		// If no results, then all results are missing
		if (!reports?.length) {
			return true;
		}
		return true;

		// Check if all results are present

		// Option 1 - iterate through and check every expect one is present

		// Option 2 - check the very last daily and hourly report exists. If they are present, there is no reason the reports shouldn't be there.
		// Is a less thorough but quicker way of checking.
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
			const upsertDailyDTO = new UpsertDailyWeatherReportDto(postcode, date, '');
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
				const upsertHourlyDTO: UpsertHourlyWeatherReportDto = new UpsertHourlyWeatherReportDto(dailyWeatherReportId, dateTime, '');
				await this.HourlyWeatherReportsService.upsert(upsertHourlyDTO, transaction);
			}),
		);
	}

	private formatDailyWeatherReports(postcode: string, from: Date, to: Date, dailyWeatherReports: DailyWeatherReport[]): WeatherReport {
		return {
			postcode,
			from,
			to,
			dailyWeatherReports,
		};
	}
}
