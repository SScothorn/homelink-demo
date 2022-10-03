import { Test, TestingModule } from '@nestjs/testing';
import { WeatherReportsController } from './weather-reports.controller';

describe('WeatherReportsController', () => {
	let controller: WeatherReportsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WeatherReportsController],
		}).compile();

		controller = module.get<WeatherReportsController>(WeatherReportsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
