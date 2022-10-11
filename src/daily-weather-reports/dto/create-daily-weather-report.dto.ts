import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class CreateDailyWeatherReportDto {
	@ApiProperty({ required: true })
	postcode: string;

	@ApiProperty({ required: true, description: 'Weather reports up to this date-time (exclusive)', format: 'date-time' })
	@IsDateString()
	date: Date;

	@IsOptional()
	@ApiProperty({ required: false })
	data: string;
	constructor(postcode: string, date: Date, data: string) {
		this.postcode = postcode;
		this.date = date;
		this.data = data;
	}
}
