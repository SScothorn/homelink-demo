import { Controller, Get, Param } from '@nestjs/common';
import { WeatherReport } from './entities/weather-report.entity';
import { WeatherReportsService } from './weather-reports.service';

@Controller('weather-reports')
export class WeatherReportsController {
	constructor(private weatherReportsService: WeatherReportsService) {}

	@Get()
	getWeatherReports(): WeatherReport[] {
		return this.weatherReportsService.findAll();
	}

	@Get(':postcode')
	getWeatherReportsByPostCode(@Param('postcode') postcode: string): WeatherReport[] {
		return this.weatherReportsService.findByPostcode(postcode);
	}
}
