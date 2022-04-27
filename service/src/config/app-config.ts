import { registerAs } from '@nestjs/config';
import { config } from './config';

export default registerAs('app', () => {
  return {
    PORT: parseInt(config.PORT, 10) ?? 3000,
    IS_PRODUCTION: config.NODE_ENV === 'production',
    FILES_DIR: config.FILES_DIR,
    CUSTOMER_IDS: config.CUSTOMER_IDS.split(',').map((id: string) => id.trim()),
  };
});

export interface AppConfig {
  PORT: number;
  IS_PRODUCTION: boolean;
  FILES_DIR: string;
  CUSTOMER_IDS: string;
}
