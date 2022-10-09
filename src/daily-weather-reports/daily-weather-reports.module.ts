import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DailyWeatherReport } from './models/daily-weather-report.model';
import { DailyWeatherReportsService } from './daily-weather-reports.service';

@Module({
	imports: [SequelizeModule.forFeature([DailyWeatherReport])],
	providers: [DailyWeatherReportsService],
	exports: [DailyWeatherReportsService],
})
export class DailyWeatherReportsModule {}
