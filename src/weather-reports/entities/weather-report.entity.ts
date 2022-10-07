import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class WeatherReport extends Model {
	// @ApiProperty()
	// @Column
	// id: number;

	@ApiProperty()
	@Column
	postcode: string;

	@ApiProperty()
	@Column
	dateTime: Date;
}
