import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { HourlyWeatherReport } from 'src/hourly-weather-reports/models/hourly-weather-report.model';

@Table
export class DailyWeatherReport extends Model {
	@ApiProperty()
	@Column({ allowNull: false })
	postcode: string;

	@ApiProperty({ type: HourlyWeatherReport, isArray: true })
	@HasMany(() => HourlyWeatherReport)
	hourlyWeatherReports: HourlyWeatherReport[];

	@ApiProperty()
	@Column({ type: DataType.DATEONLY, allowNull: false })
	date: Date;

	@ApiProperty()
	@Column({ allowNull: false })
	data: string;
}
