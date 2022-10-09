import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DailyWeatherReport } from 'src/daily-weather-reports/models/daily-weather-report.model';

@Table
export class HourlyWeatherReport extends Model {
	@ApiProperty()
	@Column({ allowNull: false })
	@ForeignKey(() => DailyWeatherReport)
	dailyWeatherReportId: number;

	@ApiProperty()
	@Column({ type: DataType.TIME, allowNull: false })
	time: Date;

	@ApiProperty()
	@Column({ allowNull: false })
	data: string;
}
