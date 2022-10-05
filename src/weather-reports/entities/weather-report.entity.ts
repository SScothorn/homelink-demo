import { ApiProperty } from '@nestjs/swagger';

export class WeatherReport {
	@ApiProperty()
	id: number;

	@ApiProperty()
	postcode: string;

	@ApiProperty()
	dateTime: Date;
}
