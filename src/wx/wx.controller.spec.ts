import { Test, TestingModule } from '@nestjs/testing';
import { WxController } from './wx.controller';

describe('Wx Controller', () => {
  let controller: WxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WxController],
    }).compile();

    controller = module.get<WxController>(WxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
