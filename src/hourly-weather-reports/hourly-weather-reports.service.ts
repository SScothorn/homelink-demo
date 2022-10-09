import { Injectable } from '@nestjs/common';
import { CreateHourlyWeatherReportDto } from './dto/create-hourly-weather-report.dto';
import { UpdateHourlyWeatherReportDto } from './dto/update-hourly-weather-report.dto';

@Injectable()
export class HourlyWeatherReportsService {
	create(createHourlyWeatherReportDto: CreateHourlyWeatherReportDto) {
		return 'This action adds a new hourlyWeatherReport';
	}

	findAll() {
		return `This action returns all hourlyWeatherReports`;
	}

	findOne(id: number) {
		return `This action returns a #${id} hourlyWeatherReport`;
	}

	update(id: number, updateHourlyWeatherReportDto: UpdateHourlyWeatherReportDto) {
		return `This action updates a #${id} hourlyWeatherReport`;
	}

	remove(id: number) {
		return `This action removes a #${id} hourlyWeatherReport`;
	}
}
