import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherReportsModule } from './weather-reports/weather-reports.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [DatabaseModule, WeatherReportsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
