import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WeatherReport } from './entities/weather-report.entity';
import { WeatherReportsService } from './weather-reports.service';

@ApiTags('Weather Reports')
@Controller('weather-reports')
export class WeatherReportsController {
	constructor(private weatherReportsService: WeatherReportsService) {}

	@ApiOkResponse({ type: Array<WeatherReport>, isArray: true })
	@Get()
	getWeatherReports(): WeatherReport[] {
		return this.weatherReportsService.findAll();
	}

	@ApiOkResponse({ type: WeatherReport, isArray: true })
	@Get(':postcode')
	getWeatherReportsByPostCode(@Param('postcode') postcode: string): WeatherReport[] {
		return this.weatherReportsService.findByPostcode(postcode);
	}
}
