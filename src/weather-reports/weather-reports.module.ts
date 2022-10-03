import { Module } from '@nestjs/common';
import { WeatherReportsController } from './weather-reports.controller';
import { WeatherReportsService } from './weather-reports.service';

@Module({
  controllers: [WeatherReportsController],
  providers: [WeatherReportsService],
})
export class WeatherReportsModule {}
