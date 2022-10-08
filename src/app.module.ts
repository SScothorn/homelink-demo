import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherReportsModule } from './weather-reports/weather-reports.module';
import { SequelizeModule } from '@nestjs/sequelize';
import config from 'config';
import { WeatherReport } from './weather-reports/models/weather-report.model';
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
			models: [WeatherReport],
		}),
		WeatherReportsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
