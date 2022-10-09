import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import config from 'config';

@Injectable()
export class WeatherApiService {
	constructor(private readonly httpService: HttpService) {}

	/**
	 * Gets 14 days worth of weather reports for a post code from https://www.worldweatheronline.com/
	 * @param postcode
	 * @returns
	 */
	getWeatherReportForPostcode(postcode: string): Observable<AxiosResponse<any[]>> {
		// Param definitions:
		// key = api key
		// q = location
		// tp = time interval
		// format = format of response
		return this.httpService.get('http://localhost:3000/cats', { params: { key: config.weatherAPIKey, q: postcode, tp: 1, format: 'json' } });
	}
}
