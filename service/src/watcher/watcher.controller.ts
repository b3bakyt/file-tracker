import { Controller, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import * as chokidar from 'chokidar';
import { promises as fs } from 'fs';
import * as moment from 'moment';
import * as path from 'path';

import { AppConfig } from '../config/app-config';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Controller()
export class WatcherController {
  private logger = new Logger(WatcherController.name);
  private filesDir: string;
  private customerIds: string;
  private processedDate: number;
  private lastValidFeedTime: string = moment()
    .subtract(1, 'hour')
    .toISOString();

  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: RedisCacheService,
  ) {
    this.filesDir = this.configService.get<AppConfig>('app').FILES_DIR;
    this.customerIds = this.configService.get<AppConfig>('app').CUSTOMER_IDS; // This could be taken from DB or file. Just kept is simpler

    const watcher = chokidar.watch(this.filesDir, {
      ignored: /^\./,
      persistent: true,
    });
    watcher
      .on('add', this.processEvent.bind(this))
      .on('error', function (error) {
        console.error('Error happened', error);
      });
  }

  async processEvent(fullPath: string) {
    const fileName = path.basename(fullPath);

    if (this.fileNameNotCorrect(fileName)) {
      this.logger.warn(`Wrong filename: ${fileName}`);
      return;
    }

    const [customerId] = fileName.split('.');

    if (this.isNotOurCustomer(customerId)) {
      this.logger.warn(`Customer Id didn't match: ${fileName}`);
      return;
    }

    const doNotProcessOldFile = await this.fileIsCreatedLongAgo(fullPath);

    if (doNotProcessOldFile) {
      this.logger.debug(`Do not process old files: ${fileName}`);
      return;
    }

    await this.cacheService.setLastFileCreatedDate(moment().toISOString());
  }

  private async fileIsCreatedLongAgo(fullPath: string) {
    const stats = await fs.stat(fullPath);
    const fileCreatedTime = moment(stats.birthtime).valueOf();
    const beforeMinuteTime = moment().subtract(1, 'minute').valueOf();
    return beforeMinuteTime > fileCreatedTime;
  }

  /*
    * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | months
    | | | day of month
    | | hours
    | minutes
    seconds (optional)
     */
  @Cron('0 * * * * *') // To trigger it most accurately Linux cron might be used (If needed!)
  async handleCron() {
    const lastDate: string = await this.cacheService.getLastFileCreatedDate();
    const lastFileDate = moment(lastDate || this.lastValidFeedTime).valueOf();

    if (this.noNewFileCreated(lastFileDate)) {
      return;
    }

    if (this.noFileCreatedLastMinute(lastFileDate)) {
      this.processedDate = lastFileDate;
      return this.logger.warn('Didn’t receive any valid feed');
    }

    this.logger.log('Back to normal');
  }

  private isNotOurCustomer(customerId: string) {
    return !this.customerIds.includes(customerId);
  }

  fileNameNotCorrect(name) {
    return !/^([\d]*)\.batch$/.test(name);
  }

  private noNewFileCreated(lastFileDate: number) {
    return this.processedDate === lastFileDate;
  }

  private noFileCreatedLastMinute(lastFileDate: number) {
    const minBeforeDate = moment()
      .subtract(1, 'minute')
      .startOf('minute') // Round to a Minute to avoid uncertainties of cron lib
      .valueOf();
    return minBeforeDate > lastFileDate;
  }
}
