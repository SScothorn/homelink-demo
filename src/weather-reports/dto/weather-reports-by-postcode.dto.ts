import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsPostalCode } from 'class-validator';
export class WeatherReportsByPostcodeDto {
	@ApiProperty({ required: true })
	@IsPostalCode('GB')
	postcode: string;

	@IsOptional()
	@ApiProperty({ required: false, description: 'Weather reports from this date-time (inclusive)', format: 'date-time' })
	@IsDateString()
	from?: string;

	@IsOptional()
	@ApiProperty({ required: false, description: 'Weather reports up to this date-time (exclusive)', format: 'date-time' })
	@IsDateString()
	to?: string;
}
