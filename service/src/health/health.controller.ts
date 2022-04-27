import { RedisOptions, Transport } from '@nestjs/microservices';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

import { DbConfig } from '../config/database.config';
import { AppConfig } from '../config/app-config';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const MS_PORT: number = this.configService.get<AppConfig>('app').PORT;

    return this.health.check([
      () => this.http.pingCheck('Basic Check', `http://localhost:${MS_PORT}`),
      () =>
        this.microservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            host: this.configService.get<DbConfig>('database').REDIS_HOST,
            port: this.configService.get<DbConfig>('database').REDIS_PORT,
            password:
              this.configService.get<DbConfig>('database').REDIS_PASSWORD,
          },
        }),
    ]);
  }
}
