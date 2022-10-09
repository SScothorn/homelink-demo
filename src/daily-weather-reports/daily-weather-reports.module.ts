import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DailyWeatherReport } from './models/daily-weather-report.model';
import { DailyWeatherReportsController } from './daily-weather-reports.controller';
import { DailyWeatherReportsService } from './daily-weather-reports.service';

@Module({
	imports: [SequelizeModule.forFeature([DailyWeatherReport])],
	controllers: [DailyWeatherReportsController],
	providers: [DailyWeatherReportsService],
})
export class DailyWeatherReportsModule {}
