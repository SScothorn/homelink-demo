import { Injectable } from '@nestjs/common';
import { WeatherReport } from './entities/weather-report.entity';

@Injectable()
export class WeatherReportsService {
	// Temp local db until connected to actual db
	private weatherReports: WeatherReport[] = [
		{ id: 1, postcode: 'BS12AB', dateTime: new Date() },
		{ id: 2, postcode: 'BS12AB', dateTime: new Date() },
		{ id: 3, postcode: 'BS13CD', dateTime: new Date() },
		{ id: 4, postcode: 'BS14EF', dateTime: new Date() },
		{ id: 5, postcode: 'BS12AB', dateTime: new Date() },
	];

	findAll(): WeatherReport[] {
		return this.weatherReports;
	}

	findByPostcode(postcode: string, from?: Date, to?: Date): WeatherReport[] {
		return this.weatherReports.filter((weatherReport) => weatherReport.postcode === postcode);
	}
}
