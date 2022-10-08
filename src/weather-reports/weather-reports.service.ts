import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WeatherReport } from './models/weather-report.model';

@Injectable()
export class WeatherReportsService {
	constructor(
		@InjectModel(WeatherReport)
		private model: typeof WeatherReport,
	) {}

	async findAll(): Promise<WeatherReport[]> {
		return this.model.findAll<WeatherReport>();
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
		return this.model.findAll<WeatherReport>();
	}
}
