import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
export class DailyWeatherReportsByPostcodeDto {
	@IsOptional()
	@ApiProperty({ required: false, description: 'Daily weather reports from this date-time (inclusive)', format: 'date-time' })
	@IsDateString()
	from?: string;

	@IsOptional()
	@ApiProperty({ required: false, description: 'Daily weather reports up to this date-time (exclusive)', format: 'date-time' })
	@IsDateString()
	to?: string;
}
