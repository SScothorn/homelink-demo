import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { IWeatherApiResponse } from './interfaces/weather-api-response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherApiService {
	constructor(private readonly httpService: HttpService, private readonly ConfigService: ConfigService) {}

	/**
	 * Gets 14 days worth of weather reports for a post code from https://www.worldweatheronline.com/
	 * @param postcode
	 * @returns
	 */
	async getWeatherReportForPostcode(postcode: string): Promise<IWeatherApiResponse> {
		// Param definitions:
		// key = api key
		// q = location
		// tp = time interval
		// format = format of response
		const result = await lastValueFrom(
			this.httpService.get('http://api.worldweatheronline.com/premium/v1/weather.ashx', {
				params: { key: this.ConfigService.get('weatherAPIKey'), q: postcode, tp: 1, format: 'json' },
			}),
		);
		return result.data;
	}
}
