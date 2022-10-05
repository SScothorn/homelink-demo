import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
export class WeatherReportsByPostcodeDto {
	@ApiProperty({ required: false, description: 'Weather reports from and including this date-time', format: 'date-time' })
	@IsOptional()
	@IsDateString()
	from?: string;

	@ApiProperty({ required: false, description: 'Weather reports up to this date-time', format: 'date-time' })
	@IsOptional()
	@IsDateString()
	to?: string;
}
