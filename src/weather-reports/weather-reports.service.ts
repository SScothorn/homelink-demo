import { Injectable } from '@nestjs/common';
import { WeatherReport } from './entities/weather-report.entity';

@Injectable()
export class WeatherReportsService {
	// Temp local db until connected to actual db
	private weatherReports: WeatherReport[] = [
		{ id: 1, postcode: 'BS12AB' },
		{ id: 2, postcode: 'BS12AB' },
		{ id: 3, postcode: 'BS13CD' },
		{ id: 4, postcode: 'BS14EF' },
		{ id: 5, postcode: 'BS12AB' },
	];

	findAll(): WeatherReport[] {
		return this.weatherReports;
	}

	findByPostcode(postcode: string): WeatherReport[] {
		return this.weatherReports.filter((weatherReport) => weatherReport.postcode === postcode);
	}
}
