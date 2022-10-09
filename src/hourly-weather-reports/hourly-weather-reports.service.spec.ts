import { Test, TestingModule } from '@nestjs/testing';
import { HourlyWeatherReportsService } from './hourly-weather-reports.service';

describe('HourlyWeatherReportsService', () => {
	let service: HourlyWeatherReportsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [HourlyWeatherReportsService],
		}).compile();

		service = module.get<HourlyWeatherReportsService>(HourlyWeatherReportsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
