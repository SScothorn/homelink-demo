import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DailyWeatherReportsByPostcodeDto } from './dto/daily-weather-reports-by-postcode.dto';
import { DailyWeatherReport } from './models/daily-weather-report.model';
import { DailyWeatherReportsService } from './daily-weather-reports.service';

@ApiTags('Weather Reports')
@Controller('weather-reports')
export class DailyWeatherReportsController {
	constructor(private DailyWeatherReportsService: DailyWeatherReportsService) {}

	@ApiOkResponse({ type: DailyWeatherReport, isArray: true })
	@Get()
	async getDailyWeatherReports(): Promise<DailyWeatherReport[]> {
		return this.DailyWeatherReportsService.findAll();
	}

	@ApiOkResponse({ type: DailyWeatherReport, isArray: true })
	@ApiBadRequestResponse()
	@Get(':postcode')
	async getDailyWeatherReportsByPostCode(
		@Param('postcode') postcode: string,
		@Query() DailyWeatherReportsByPostcodeDto: DailyWeatherReportsByPostcodeDto,
	): Promise<DailyWeatherReport[]> {
		const from = DailyWeatherReportsByPostcodeDto.from ? new Date(DailyWeatherReportsByPostcodeDto.from) : null;
		const to = DailyWeatherReportsByPostcodeDto.to ? new Date(DailyWeatherReportsByPostcodeDto.to) : null;
		return this.DailyWeatherReportsService.getDailyWeatherReportsByPostCode(postcode, from, to);
	}
}
