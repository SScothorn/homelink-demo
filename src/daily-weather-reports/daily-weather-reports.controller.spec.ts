import { Test, TestingModule } from '@nestjs/testing';
import { DailyWeatherReportsController } from './daily-weather-reports.controller';

describe('DailyDailyWeatherReportsController', () => {
	let controller: DailyWeatherReportsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DailyWeatherReportsController],
		}).compile();

		controller = module.get<DailyWeatherReportsController>(DailyWeatherReportsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
