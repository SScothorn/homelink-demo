import { Module } from '@nestjs/common';
import { DailyWeatherReportsModule } from 'src/daily-weather-reports/daily-weather-reports.module';
import { WeatherReportsController } from './weather-reports.controller';
import { WeatherReportsService } from './weather-reports.service';

@Module({
	controllers: [WeatherReportsController],
	providers: [WeatherReportsService],
	imports: [DailyWeatherReportsModule],
})
export class WeatherReportsModule {}
