import { Test, TestingModule } from '@nestjs/testing';
import { FileWatcherController } from './watcher.controller';

describe('FileWatcherController', () => {
  let controller: FileWatcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileWatcherController],
    }).compile();

    controller = module.get<FileWatcherController>(FileWatcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
