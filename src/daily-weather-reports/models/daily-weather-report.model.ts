import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { HourlyWeatherReport } from 'src/hourly-weather-reports/models/hourly-weather-report.model';

@Table
export class DailyWeatherReport extends Model {
	@ApiProperty()
	@Column({ allowNull: false, unique: 'compositeIndex' })
	postcode: string;

	@ApiProperty({ type: HourlyWeatherReport, isArray: true })
	@HasMany(() => HourlyWeatherReport)
	hourlyWeatherReports: HourlyWeatherReport[];

	@ApiProperty()
	@Column({ type: DataType.DATE, allowNull: false, unique: 'compositeIndex' })
	date: string;

	@ApiProperty()
	@Column({ type: DataType.JSON, allowNull: false })
	data: string;
}
