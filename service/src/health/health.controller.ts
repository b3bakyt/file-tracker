import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MicroserviceHealthIndicator,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { DbConfig } from '../config/database.config';
import { ConfigService } from '@nestjs/config';

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
    return this.health.check([
      () => this.http.pingCheck('Basic Check', 'http://localhost:3000'),
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
