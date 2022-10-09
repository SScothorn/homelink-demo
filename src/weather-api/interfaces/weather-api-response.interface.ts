export interface IWeatherApiResponse {
	data: {
		weather: IWeatherApiDailyResponse[];
	};
}

export interface IWeatherApiDailyResponse {
	hourly: IWeatherApiHourlyResponse[];
}

export interface IWeatherApiHourlyResponse {}
