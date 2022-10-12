import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DailyWeatherReport } from 'src/daily-weather-reports/models/daily-weather-report.model';

@Table
export class HourlyWeatherReport extends Model {
	@ApiProperty()
	@Column({ allowNull: false, unique: 'compositeIndex' })
	@ForeignKey(() => DailyWeatherReport)
	dailyWeatherReportId: number;

	@ApiProperty()
	@Column({ type: DataType.DATE, allowNull: false, unique: 'compositeIndex' })
	time: Date;

	@ApiProperty()
	@Column({ type: DataType.JSON, allowNull: false })
	data: string;
}
