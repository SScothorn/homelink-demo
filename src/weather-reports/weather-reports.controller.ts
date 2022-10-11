import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { formatPostcode } from 'util/postcode.util';
import { WeatherReportsByPostcodeDto } from './dto/weather-reports-by-postcode.dto';
import { WeatherReport } from './models/weather-report.model';
import { WeatherReportsService } from './weather-reports.service';

@ApiTags('Weather Reports')
@Controller('weather-reports')
export class WeatherReportsController {
	constructor(private WeatherReportsService: WeatherReportsService) {}

	@ApiOkResponse({ type: WeatherReport })
	@ApiBadRequestResponse()
	@Get()
	async getWeatherReportsByPostCode(@Query() weatherReportsByPostcodeDto: WeatherReportsByPostcodeDto): Promise<WeatherReport> {
		const postcode = formatPostcode(weatherReportsByPostcodeDto.postcode);

		const from = weatherReportsByPostcodeDto.from ? new Date(weatherReportsByPostcodeDto.from) : undefined;
		const to = weatherReportsByPostcodeDto.to ? new Date(weatherReportsByPostcodeDto.to) : undefined;
		return this.WeatherReportsService.getWeatherReportsByPostCode(postcode, from, to);
	}
}
