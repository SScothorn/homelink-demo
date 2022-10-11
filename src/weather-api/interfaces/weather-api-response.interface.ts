export interface IWeatherApiResponse {
	data: {
		weather: IWeatherApiDailyResponse[];
	};
}

export interface IWeatherApiDailyResponse {
	date: string;
	hourly: IWeatherApiHourlyResponse[];
}

export interface IWeatherApiHourlyResponse {
	time: string;
}
