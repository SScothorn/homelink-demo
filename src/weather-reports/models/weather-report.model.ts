import { ApiProperty } from '@nestjs/swagger';
import { DailyWeatherReport } from 'src/daily-weather-reports/models/daily-weather-report.model';

export class WeatherReport {
	@ApiProperty()
	postcode: string;

	@ApiProperty()
	from: Date;

	@ApiProperty()
	to: Date;

	@ApiProperty({ type: DailyWeatherReport, isArray: true })
	dailyWeatherReports: DailyWeatherReport[];
}
