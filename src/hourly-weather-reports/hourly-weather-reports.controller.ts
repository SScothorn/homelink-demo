import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HourlyWeatherReportsService } from './hourly-weather-reports.service';
import { CreateHourlyWeatherReportDto } from './dto/create-hourly-weather-report.dto';
import { UpdateHourlyWeatherReportDto } from './dto/update-hourly-weather-report.dto';

@Controller('hourly-weather-reports')
export class HourlyWeatherReportsController {
	constructor(private readonly hourlyWeatherReportsService: HourlyWeatherReportsService) {}

	@Post()
	create(@Body() createHourlyWeatherReportDto: CreateHourlyWeatherReportDto) {
		return this.hourlyWeatherReportsService.create(createHourlyWeatherReportDto);
	}

	@Get()
	findAll() {
		return this.hourlyWeatherReportsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.hourlyWeatherReportsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateHourlyWeatherReportDto: UpdateHourlyWeatherReportDto) {
		return this.hourlyWeatherReportsService.update(+id, updateHourlyWeatherReportDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.hourlyWeatherReportsService.remove(+id);
	}
}
