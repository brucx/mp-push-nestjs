import { Test, TestingModule } from '@nestjs/testing';
import { WxService } from './wx.service';

describe('WxService', () => {
  let service: WxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WxService],
    }).compile();

    service = module.get<WxService>(WxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
