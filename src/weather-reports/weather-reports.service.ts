import { Injectable } from '@nestjs/common';
import { WeatherReport } from './entities/weather-report.entity';

@Injectable()
export class WeatherReportsService {
	// Temp local db until connected to actual db
	private weatherReports: WeatherReport[] = [
		{ id: 1, postcode: 'BS12AB', dateTime: new Date('2022-10-06T09:00:00Z') },
		{ id: 2, postcode: 'BS12AB', dateTime: new Date('2022-10-07T09:00:00Z') },
		{ id: 3, postcode: 'BS13CD', dateTime: new Date('2022-10-06T09:00:00Z') },
		{ id: 4, postcode: 'BS14EF', dateTime: new Date('2022-10-06T09:00:00Z') },
		{ id: 5, postcode: 'BS12AB', dateTime: new Date('2022-10-06T11:00:00Z') },
	];

	findAll(): WeatherReport[] {
		return this.weatherReports;
	}

	findByPostcode(postcode: string, from?: Date, to?: Date): WeatherReport[] {
		return this.weatherReports.filter((weatherReport) => {
			return weatherReport.postcode === postcode && (from == null || weatherReport.dateTime >= from) && (to == null || weatherReport.dateTime < to);
		});
	}
}
