import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { WatcherController } from './watcher.controller';
import { RedisService } from '../redis-cache/redis.service';

describe('FileWatcherController', () => {
  let controller: WatcherController;
  const configServiceMock = {
    get: jest.fn().mockReturnValue({
      FILES_DIR: './files',
      CUSTOMER_IDS: '1,2,3',
    }),
  };
  const redisServiceMock = {
    setLastFileCreatedDate: jest.fn(),
    getLastFileCreatedDate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatcherController],
      imports: [],
      providers: [ConfigService, RedisService],
    })
      .overrideProvider(RedisService)
      .useValue(redisServiceMock)
      .overrideProvider(ConfigService)
      .useValue(configServiceMock)
      .compile();

    controller = module.get<WatcherController>(WatcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
