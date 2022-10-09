import { Module } from '@nestjs/common';
import { HourlyWeatherReportsService } from './hourly-weather-reports.service';
import { HourlyWeatherReportsController } from './hourly-weather-reports.controller';
import { HourlyWeatherReport } from './models/hourly-weather-report.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
	imports: [SequelizeModule.forFeature([HourlyWeatherReport])],
	controllers: [HourlyWeatherReportsController],
	providers: [HourlyWeatherReportsService],
})
export class HourlyWeatherReportsModule {}
