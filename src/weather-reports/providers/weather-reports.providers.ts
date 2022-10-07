import { WeatherReport } from '../entities/weather-report.entity';

export const weatherReportsProviders = [
	{
		provide: 'WEATHER_REPORTS_REPOSITORY',
		useValue: WeatherReport,
	},
];
