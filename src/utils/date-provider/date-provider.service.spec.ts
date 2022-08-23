import { Test, TestingModule } from '@nestjs/testing';
import { DateProviderService } from './date-provider.service';

describe('DateProviderService', () => {
  let service: DateProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateProviderService],
    }).compile();

    service = module.get<DateProviderService>(DateProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
