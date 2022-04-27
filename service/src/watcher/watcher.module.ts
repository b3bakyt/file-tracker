import { Module } from '@nestjs/common';

import { RedisCacheModule } from '../redis-cache/redis-cache.module';
import { WatcherController } from './watcher.controller';

@Module({
  imports: [RedisCacheModule],
  controllers: [WatcherController],
  providers: [],
})
export class WatcherModule {}
