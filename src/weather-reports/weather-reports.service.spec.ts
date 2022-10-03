import { Test, TestingModule } from '@nestjs/testing';
import { WeatherReportsService } from './weather-reports.service';

describe('WeatherReportsService', () => {
  let service: WeatherReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherReportsService],
    }).compile();

    service = module.get<WeatherReportsService>(WeatherReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
