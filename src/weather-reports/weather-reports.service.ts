import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
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
	 * Gets all stored weather reports for a post code. Filters based on any provided date-time paramaters.
	 * If any are missing for the time period provided, it calls the worldweatheronline API and stores then returns the results.
	 * @param postcode
	 * @param from Weather reports from this date-time (inclusive)
	 * @param to Weather reports up to this date-time (exclusive)
	 */
	async getWeatherReportsByPostCode(postcode: string, from?: Date, to?: Date): Promise<WeatherReport[]> {
		// Validate params

		// Find all existing results
		const existingWeatherReports = await this.model.findAll<WeatherReport>({
			where: {
				postcode: { [Op.iLike]: postcode },
				...(from && {
					dateTime: {
						[Op.gte]: from,
					},
				}),
				...(to && {
					dateTime: {
						[Op.lt]: to,
					},
				}),
			},
		});

		// If missing results, get data from worldweatheronline API

		// Return results

		return this.model.findAll<WeatherReport>();
	}
}
