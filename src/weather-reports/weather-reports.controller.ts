import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WeatherReportsByPostcodeDto } from './dto/weather-reports-by-postcode.dto';
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
	@ApiBadRequestResponse()
	@Get(':postcode')
	getWeatherReportsByPostCode(@Param('postcode') postcode: string, @Query() weatherReportsByPostcodeDto: WeatherReportsByPostcodeDto): WeatherReport[] {
		const from = weatherReportsByPostcodeDto.from ? new Date(weatherReportsByPostcodeDto.from) : null;
		const to = weatherReportsByPostcodeDto.to ? new Date(weatherReportsByPostcodeDto.to) : null;
		return this.weatherReportsService.findByPostcode(postcode, from, to);
	}
}
