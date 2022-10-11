import { Module } from '@nestjs/common';
import { DailyWeatherReportsModule } from 'src/daily-weather-reports/daily-weather-reports.module';
import { HourlyWeatherReportsModule } from 'src/hourly-weather-reports/hourly-weather-reports.module';
import { WeatherApiModule } from 'src/weather-api/weather-api.module';
import { WeatherReportsController } from './weather-reports.controller';
import { WeatherReportsService } from './weather-reports.service';

@Module({
	controllers: [WeatherReportsController],
	providers: [WeatherReportsService],
	imports: [DailyWeatherReportsModule, HourlyWeatherReportsModule, WeatherApiModule],
})
export class WeatherReportsModule {}
