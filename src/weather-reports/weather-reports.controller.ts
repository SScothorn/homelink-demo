import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WeatherReportsByPostcodeDto } from './dto/weather-reports-by-postcode.dto';
import { WeatherReport } from './models/weather-report.model';
import { WeatherReportsService } from './weather-reports.service';

@ApiTags('Weather Reports')
@Controller('weather-reports')
export class WeatherReportsController {
	constructor(private weatherReportsService: WeatherReportsService) {}

	@ApiOkResponse({ type: WeatherReport, isArray: true })
	@Get()
	async getWeatherReports(): Promise<WeatherReport[]> {
		return this.weatherReportsService.findAll();
	}

	@ApiOkResponse({ type: WeatherReport, isArray: true })
	@ApiBadRequestResponse()
	@Get(':postcode')
	async getWeatherReportsByPostCode(@Param('postcode') postcode: string, @Query() weatherReportsByPostcodeDto: WeatherReportsByPostcodeDto): Promise<WeatherReport[]> {
		const from = weatherReportsByPostcodeDto.from ? new Date(weatherReportsByPostcodeDto.from) : null;
		const to = weatherReportsByPostcodeDto.to ? new Date(weatherReportsByPostcodeDto.to) : null;
		return this.weatherReportsService.getWeatherReportsByPostCode(postcode, from, to);
	}
}
