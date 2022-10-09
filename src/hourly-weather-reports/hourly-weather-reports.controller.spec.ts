import { Test, TestingModule } from '@nestjs/testing';
import { HourlyWeatherReportsController } from './hourly-weather-reports.controller';
import { HourlyWeatherReportsService } from './hourly-weather-reports.service';

describe('HourlyWeatherReportsController', () => {
	let controller: HourlyWeatherReportsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [HourlyWeatherReportsController],
			providers: [HourlyWeatherReportsService],
		}).compile();

		controller = module.get<HourlyWeatherReportsController>(HourlyWeatherReportsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
