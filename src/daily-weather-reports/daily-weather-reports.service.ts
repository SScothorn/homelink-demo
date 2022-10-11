import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction } from 'sequelize';
import { HourlyWeatherReport } from 'src/hourly-weather-reports/models/hourly-weather-report.model';
import { CreateDailyWeatherReportDto } from './dto/create-daily-weather-report.dto';
import { UpsertDailyWeatherReportDto } from './dto/upsert-daily-weather-report.dto';
import { DailyWeatherReport } from './models/daily-weather-report.model';

@Injectable()
export class DailyWeatherReportsService {
	constructor(
		@InjectModel(DailyWeatherReport)
		private model: typeof DailyWeatherReport,
	) {}
	async create(createDailyWeatherReportDto: CreateDailyWeatherReportDto, transaction?: Transaction) {
		return this.model.create(
			{
				postcode: createDailyWeatherReportDto.postcode,
				date: createDailyWeatherReportDto.date,
				data: createDailyWeatherReportDto.data,
			},
			{ transaction },
		);
	}

	async upsert(upsertDailyWeatherReportDTO: UpsertDailyWeatherReportDto, transaction?: Transaction) {
		const [result, created] = await this.model.upsert(
			{
				postcode: upsertDailyWeatherReportDTO.postcode,
				date: upsertDailyWeatherReportDTO.date,
				data: upsertDailyWeatherReportDTO.data,
			},
			{ transaction },
		);
		return result;
	}

	async findAll(): Promise<DailyWeatherReport[]> {
		return this.model.findAll<DailyWeatherReport>();
	}

	/**
	 * Gets all stored weather reports for a post code. Filters based on any provided date-time paramaters.
	 * If any are missing for the time period provided, it calls the worldweatheronline API and stores then returns the results.
	 * @param postcode
	 * @param from Weather reports from this date-time (inclusive)
	 * @param to Weather reports up to this date-time (exclusive)
	 */
	async getDailyWeatherReportsByPostCode(postcode: string, from?: Date, to?: Date): Promise<DailyWeatherReport[]> {
		// Validate params

		// Find all existing results
		const existingDailyWeatherReports = await this.model.findAll<DailyWeatherReport>({
			where: {
				postcode: { [Op.iLike]: postcode },
			},
			// include: HourlyWeatherReport,
			include: {
				model: HourlyWeatherReport,
				where: {
					...(from && {
						time: {
							[Op.gte]: from,
						},
					}),
					...(to && {
						time: {
							[Op.lt]: to,
						},
					}),
				},
			},
		});

		// If missing results, get data from worldweatheronline API

		// Return results

		return existingDailyWeatherReports;
	}
}
