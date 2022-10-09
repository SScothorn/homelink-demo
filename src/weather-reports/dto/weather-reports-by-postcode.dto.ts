import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
export class WeatherReportsByPostcodeDto {
	@IsOptional()
	@ApiProperty({ required: false, description: 'Weather reports from this date-time (inclusive)', format: 'date-time' })
	@IsDateString()
	from?: string;

	@IsOptional()
	@ApiProperty({ required: false, description: 'Weather reports up to this date-time (exclusive)', format: 'date-time' })
	@IsDateString()
	to?: string;
}
