import { Module } from '@nestjs/common';
import { WeatherApiService } from './weather-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [HttpModule, ConfigModule],
	providers: [WeatherApiService],
	exports: [WeatherApiService],
})
export class WeatherApiModule {}
