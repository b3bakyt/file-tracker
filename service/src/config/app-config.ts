import { registerAs } from '@nestjs/config';
import { config } from './config';

export default registerAs('app', () => {
  return {
    PORT: parseInt(config.PORT, 10) ?? 3000,
    IS_PRODUCTION: config.NODE_ENV === 'production',
  };
});

export interface AppConfig {
  PORT: number;
  IS_PRODUCTION: boolean;
}
