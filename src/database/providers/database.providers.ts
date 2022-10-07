import config from 'config';
import { Sequelize } from 'sequelize-typescript';
import { WeatherReport } from 'src/weather-reports/entities/weather-report.entity';
const { db } = config;
export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async () => {
			const sequelize = new Sequelize({
				dialect: db.dialect,
				host: db.host,
				port: db.port,
				username: db.username,
				password: db.password,
				database: db.database,
			});
			sequelize.addModels([WeatherReport]);
			await sequelize.sync();
			return sequelize;
		},
	},
];
