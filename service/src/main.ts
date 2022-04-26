import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppConfig } from './config/app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<AppConfig>('app').PORT;
  const isProduction = configService.get<AppConfig>('app').IS_PRODUCTION;
  const logger = new Logger('Root');
  logger.log('# ---------------------------------------------- #');
  logger.log(
    `# -- Running in server mode: ${
      isProduction ? 'Production' : 'Non-Prod'
    } -- #`,
  );
  await app.listen(port, () => {
    logger.log(`🚀 Server ready at http://localhost:${port}`);
    logger.log(
      `Try your health check at: http://localhost:${port}/health`,
      'Root',
    );
  });
}
bootstrap();
