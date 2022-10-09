import { PartialType } from '@nestjs/swagger';
import { CreateHourlyWeatherReportDto } from './create-hourly-weather-report.dto';

export class UpdateHourlyWeatherReportDto extends PartialType(CreateHourlyWeatherReportDto) {}
