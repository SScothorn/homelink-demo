import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { CreateHourlyWeatherReportDto } from './dto/create-hourly-weather-report.dto';
import { UpsertHourlyWeatherReportDto } from './dto/upsert-hourly-weather-report.dto';
import { HourlyWeatherReport } from './models/hourly-weather-report.model';

@Injectable()
export class HourlyWeatherReportsService {
	constructor(
		@InjectModel(HourlyWeatherReport)
		private model: typeof HourlyWeatherReport,
	) {}

	async create(createHourlyWeatherReportDto: CreateHourlyWeatherReportDto, transaction?: Transaction) {
		return this.model.create({}, { transaction });
	}

	async upsert(upsertHourlyWeatherReportDTO: UpsertHourlyWeatherReportDto, transaction?: Transaction) {
		await this.model.upsert(
			{
				dailyWeatherReportId: upsertHourlyWeatherReportDTO.dailyWeatherReportId,
				time: upsertHourlyWeatherReportDTO.time,
				data: upsertHourlyWeatherReportDTO.data,
			},
			{ transaction },
		);
	}

	findAll() {
		return `This action returns all hourlyWeatherReports`;
	}

	findOne(id: number) {
		return `This action returns a #${id} hourlyWeatherReport`;
	}

	remove(id: number) {
		return `This action removes a #${id} hourlyWeatherReport`;
	}
}
