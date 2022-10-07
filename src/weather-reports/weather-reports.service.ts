import { Inject, Injectable } from '@nestjs/common';
import { WeatherReport } from './entities/weather-report.entity';

@Injectable()
export class WeatherReportsService {
	constructor(
		@Inject('WEATHER_REPORTS_REPOSITORY')
		private weatherReportsRepository: typeof WeatherReport,
	) {}

	async findAll(): Promise<WeatherReport[]> {
		return this.weatherReportsRepository.findAll<WeatherReport>();
	}

	/**
	 * Finds all weather reports for a post code. Filters based on any provided date-time paramaters.
	 * @param postcode
	 * @param from Weather reports from this date-time (inclusive)
	 * @param to Weather reports up to this date-time (exclusive)
	 */
	async findByPostcode(postcode: string, from?: Date, to?: Date): Promise<WeatherReport[]> {
		// return this.weatherReports.filter((weatherReport) => {
		// 	return weatherReport.postcode === postcode && (from == null || weatherReport.dateTime >= from) && (to == null || weatherReport.dateTime < to);
		// });
		return this.weatherReportsRepository.findAll<WeatherReport>();
	}
}
