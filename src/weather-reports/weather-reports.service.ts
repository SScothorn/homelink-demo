import { Injectable } from '@nestjs/common';
import { DailyWeatherReportsService } from 'src/daily-weather-reports/daily-weather-reports.service';
import { DailyWeatherReport } from 'src/daily-weather-reports/models/daily-weather-report.model';
import { WeatherApiService } from 'src/weather-api/weather-api.service';
import { WeatherReport } from './models/weather-report.model';

@Injectable()
export class WeatherReportsService {
	constructor(private DailyWeatherReportsService: DailyWeatherReportsService, private WeatherAPIService: WeatherApiService) {}
	/**
	 * Gets the weather reports for a post code, and formats it to return.
	 * @param postcode
	 * @param from Weather reports from this date-time (inclusive)
	 * @param to Weather reports up to this date-time (exclusive)
	 */
	async getWeatherReportsByPostCode(postcode: string, from?: Date, to?: Date): Promise<WeatherReport> {
		// Validate params

		// Get the unformatted weather reports
		let results = await this.DailyWeatherReportsService.getDailyWeatherReportsByPostCode(postcode, from, to);

		if (this.isMissingResults(results)) {
			await this.addMissingResults(postcode, results);
			// Get the updated results
			results = await this.DailyWeatherReportsService.getDailyWeatherReportsByPostCode(postcode, from, to);
		}
		// Format results
		const formattedResults: WeatherReport = this.formatDailyWeatherReports(postcode, from, to, results);

		// Return results
		return formattedResults;
	}

	/**
	 * Checks whether any results are missing for the reports stored in the db.
	 */
	private isMissingResults(results: DailyWeatherReport[]): boolean {
		// If no results, then all results are missing
		if (!results?.length) {
			return true;
		}

		// Check if all results are present

		// Option 1 - iterate through and check every expect one is present

		// Option 2 - check the very last daily and hourly report exists. If they are present, there is no reason the reports shouldn't be there.
		// Is a less thorough but quicker way of checking.
	}

	private async addMissingResults(postcode: string, existingResults: DailyWeatherReport[]) {
		const newResults = await this.WeatherAPIService.getWeatherReportForPostcode(postcode);
		console.log(newResults);
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
