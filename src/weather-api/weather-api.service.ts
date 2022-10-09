import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';
import config from 'config';
import { IWeatherApiResponse } from './interfaces/weather-api-response.interface';

@Injectable()
export class WeatherApiService {
	constructor(private readonly httpService: HttpService) {}

	/**
	 * Gets 14 days worth of weather reports for a post code from https://www.worldweatheronline.com/
	 * @param postcode
	 * @returns
	 */
	getWeatherReportForPostcode(postcode: string): Promise<AxiosResponse<IWeatherApiResponse>> {
		// Param definitions:
		// key = api key
		// q = location
		// tp = time interval
		// format = format of response
		return lastValueFrom(
			this.httpService.get('http://api.worldweatheronline.com/premium/v1/weather.ashx', {
				params: { key: process.env.API_KEY_WORLD_WEATHER_ONLINE, q: postcode, tp: 1, format: 'json' },
			}),
		);
	}
}
