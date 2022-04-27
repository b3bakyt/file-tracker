import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  private logger = new Logger(RedisService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setLastFileCreatedDate(timeStamp: string) {
    this.logger.log(`File created at: ${timeStamp}`);
    try {
      await this.cacheManager.set<string>('last-file-created-date', timeStamp, {
        ttl: 300,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getLastFileCreatedDate(): Promise<string> {
    try {
      const date = await this.cacheManager.get<string>(
        'last-file-created-date',
      );
      this.logger.log(`Get file created at: ${date}`);
      return date;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
