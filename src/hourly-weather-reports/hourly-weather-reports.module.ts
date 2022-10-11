import { Module } from '@nestjs/common';
import { HourlyWeatherReportsService } from './hourly-weather-reports.service';
import { HourlyWeatherReport } from './models/hourly-weather-report.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
	imports: [SequelizeModule.forFeature([HourlyWeatherReport])],
	providers: [HourlyWeatherReportsService],
	exports: [HourlyWeatherReportsService],
})
export class HourlyWeatherReportsModule {}
