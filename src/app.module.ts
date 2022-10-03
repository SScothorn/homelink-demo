import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherReportsModule } from './weather-reports/weather-reports.module';

@Module({
  imports: [WeatherReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
