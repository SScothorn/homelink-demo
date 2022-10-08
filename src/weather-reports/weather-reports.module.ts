import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WeatherReport } from './models/weather-report.model';
import { WeatherReportsController } from './weather-reports.controller';
import { WeatherReportsService } from './weather-reports.service';

@Module({
	imports: [SequelizeModule.forFeature([WeatherReport])],
	controllers: [WeatherReportsController],
	providers: [WeatherReportsService],
})
export class WeatherReportsModule {}
