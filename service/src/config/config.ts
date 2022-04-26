import 'dotenv-safe/config';

export interface Config {
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_PASSWORD: string;
  PORT: string;
  COMPONENT: string;
  TRACING_DEBUG_ENABLED: boolean;
  NODE_ENV: string;
}

export const config: Config = Object.freeze({
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  PORT: process.env.PORT,
  COMPONENT: process.env.COMPONENT,
  TRACING_DEBUG_ENABLED: process.env.TRACING_DEBUG_ENABLED === 'true',
  NODE_ENV: process.env.NODE_ENV,
});
