import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyWeatherReportsModule } from './daily-weather-reports/daily-weather-reports.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { HourlyWeatherReportsModule } from './hourly-weather-reports/hourly-weather-reports.module';
import { WeatherApiModule } from './weather-api/weather-api.module';
import { WeatherReportsModule } from './weather-reports/weather-reports.module';
import configuration from 'config/configuration';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'rxjs';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (ConfigService: ConfigService) => ({
				dialect: ConfigService.get('db').dialect,
				host: ConfigService.get('db').host,
				port: ConfigService.get('db').port,
				username: ConfigService.get('db').username,
				password: ConfigService.get('db').password,
				database: ConfigService.get('db').database,
				autoLoadModels: true,
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		DailyWeatherReportsModule,
		HourlyWeatherReportsModule,
		WeatherApiModule,
		WeatherReportsModule,
		HttpModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private readonly httpService: HttpService) {}
	onModuleInit() {
		// // Log info for http requests
		// this.httpService.axiosRef.interceptors.request.use((config) => {
		// 	console.log(config);
		// 	return config;
		// });
	}
}
