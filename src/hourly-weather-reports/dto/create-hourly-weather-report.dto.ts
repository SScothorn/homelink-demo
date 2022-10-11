import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class CreateHourlyWeatherReportDto {
	@ApiProperty({ required: true })
	dailyWeatherReportId: number;

	@ApiProperty({ required: true, format: 'date-time' })
	@IsDateString()
	time: Date;

	@IsOptional()
	@ApiProperty({ required: false })
	data: string;

	constructor(dailyWeatherReportId: number, time: Date, data: string) {
		this.dailyWeatherReportId = dailyWeatherReportId;
		this.time = time;
		this.data = data;
	}
}
