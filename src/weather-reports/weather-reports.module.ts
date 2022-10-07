import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { weatherReportsProviders } from './providers/weather-reports.providers';
import { WeatherReportsController } from './weather-reports.controller';
import { WeatherReportsService } from './weather-reports.service';

@Module({
	imports: [DatabaseModule],
	controllers: [WeatherReportsController],
	providers: [WeatherReportsService, ...weatherReportsProviders],
})
export class WeatherReportsModule {}
