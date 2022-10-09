import { Injectable } from '@nestjs/common';
import { DailyWeatherReportsService } from 'src/daily-weather-reports/daily-weather-reports.service';
import { DailyWeatherReport } from 'src/daily-weather-reports/models/daily-weather-report.model';
import { WeatherReport } from './models/weather-report.model';

@Injectable()
export class WeatherReportsService {
	constructor(private DailyWeatherReportsService: DailyWeatherReportsService) {}
	/**
	 * Gets the weather reports for a post code, and formats it to return.
	 * @param postcode
	 * @param from Weather reports from this date-time (inclusive)
	 * @param to Weather reports up to this date-time (exclusive)
	 */
	async getWeatherReportsByPostCode(postcode: string, from?: Date, to?: Date): Promise<WeatherReport> {
		// Validate params

		// Get the unformatted weather reports
		const unformattedResults = await this.DailyWeatherReportsService.getDailyWeatherReportsByPostCode(postcode, from, to);

		// Format results
		const formattedResults: WeatherReport = this.formatDailyWeatherReports(postcode, from, to, unformattedResults);

		// Return results
		return formattedResults;
	}

	private formatDailyWeatherReports(postcode: string, from: Date, to: Date, dailyWeatherReports: DailyWeatherReport[]): WeatherReport {
		const weatherReport: WeatherReport = {
			postcode,
			from,
			to,
			dailyWeatherReports,
		};

		return weatherReport;
	}
}
