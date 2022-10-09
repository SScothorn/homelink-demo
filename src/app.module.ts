import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyWeatherReportsModule } from './daily-weather-reports/daily-weather-reports.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { HourlyWeatherReportsModule } from './hourly-weather-reports/hourly-weather-reports.module';
import config from 'config';
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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
