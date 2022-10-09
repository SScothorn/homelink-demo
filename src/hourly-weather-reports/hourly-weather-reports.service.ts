import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHourlyWeatherReportDto } from './dto/create-hourly-weather-report.dto';
import { UpdateHourlyWeatherReportDto } from './dto/update-hourly-weather-report.dto';
import { HourlyWeatherReport } from './models/hourly-weather-report.model';

@Injectable()
export class HourlyWeatherReportsService {
	constructor(
		@InjectModel(HourlyWeatherReport)
		private model: typeof HourlyWeatherReport,
	) {}
	create(createHourlyWeatherReportDto: CreateHourlyWeatherReportDto) {
		return 'This action adds a new hourlyWeatherReport';
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
