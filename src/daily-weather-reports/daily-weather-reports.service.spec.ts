import { Test, TestingModule } from '@nestjs/testing';
import { DailyWeatherReportsService } from './daily-weather-reports.service';

describe('DailyWeatherReportsService', () => {
	let service: DailyWeatherReportsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DailyWeatherReportsService],
		}).compile();

		service = module.get<DailyWeatherReportsService>(DailyWeatherReportsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
