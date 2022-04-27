import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { WatcherModule } from './watcher/watcher.module';
import { HealthModule } from './health/health.module';

import { RedisCacheModule } from './redis-cache/cache.module';
import databaseConfig from './config/database.config';
import appConfig from './config/app-config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      cache: true,
      isGlobal: true,
    }),
    HealthModule,
    RedisCacheModule,
    WatcherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
