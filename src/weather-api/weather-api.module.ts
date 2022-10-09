import { Module } from '@nestjs/common';
import { WeatherApiService } from './weather-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [HttpModule],
	providers: [WeatherApiService],
	exports: [WeatherApiService],
})
export class WeatherApiModule {}
