import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WeatherReportsByPostcodeDto } from './dto/weather-reports-by-postcode.dto';
import { WeatherReport } from './models/weather-report.model';
import { WeatherReportsService } from './weather-reports.service';

@ApiTags('Weather Reports')
@Controller('weather-reports')
export class WeatherReportsController {
	constructor(private WeatherReportsService: WeatherReportsService) {}

	@ApiOkResponse({ type: WeatherReport })
	@ApiBadRequestResponse()
	@Get(':postcode')
	async getWeatherReportsByPostCode(@Param('postcode') postcode: string, @Query() weatherReportsByPostcodeDto: WeatherReportsByPostcodeDto): Promise<WeatherReport> {
		const from = weatherReportsByPostcodeDto.from ? new Date(weatherReportsByPostcodeDto.from) : null;
		const to = weatherReportsByPostcodeDto.to ? new Date(weatherReportsByPostcodeDto.to) : null;
		return this.WeatherReportsService.getWeatherReportsByPostCode(postcode, from, to);
	}
}
