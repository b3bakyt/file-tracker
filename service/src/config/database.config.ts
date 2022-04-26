import { registerAs } from '@nestjs/config';

import { config } from './config';

export default registerAs('database', () => ({
  REDIS_HOST: config.REDIS_HOST,
  REDIS_PORT: parseInt(config.REDIS_PORT, 10) ?? 6379,
  REDIS_PASSWORD: config.REDIS_PASSWORD,
}));

export interface DbConfig {
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
}
