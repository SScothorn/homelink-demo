import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyWeatherReportsModule } from './daily-weather-reports/daily-weather-reports.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { HourlyWeatherReportsModule } from './hourly-weather-reports/hourly-weather-reports.module';
import { WeatherApiModule } from './weather-api/weather-api.module';
import { WeatherReportsModule } from './weather-reports/weather-reports.module';
import config from 'config';
import { HttpModule, HttpService } from '@nestjs/axios';
const { db } = config;

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: db.dialect,
			host: db.host,
			port: db.port,
			username: db.username,
			password: db.password,
			database: db.database,
			autoLoadModels: true,
			synchronize: true,
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
		this.httpService.axiosRef.interceptors.request.use((config) => console.log(config));
	}
}
