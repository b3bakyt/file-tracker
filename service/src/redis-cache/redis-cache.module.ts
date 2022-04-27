import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { Module, CacheModule } from '@nestjs/common';

import { RedisCacheService } from './redis-cache.service';
import { DbConfig } from '../config/database.config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<DbConfig>('database').REDIS_HOST,
        port: configService.get<DbConfig>('database').REDIS_PORT,
        password: configService.get<DbConfig>('database').REDIS_PASSWORD,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
