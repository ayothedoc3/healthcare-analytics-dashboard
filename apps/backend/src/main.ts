import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Medical Analytics Dashboard API')
    .setDescription(
      'RESTful API for healthcare analytics dashboard with real-time metrics and reporting',
    )
    .setVersion('1.0')
    .addTag('Analytics', 'Healthcare analytics and reporting endpoints')
    .setContact(
      'Ayokunle Ademola-John',
      'https://github.com/ayothedoc3',
      'ayothedoc3@gmail.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`
    🚀 Medical Analytics Dashboard API is running!

    📊 API Server: http://localhost:${port}/api
    📚 Swagger Docs: http://localhost:${port}/api/docs
    🏥 Health Check: http://localhost:${port}/api/health

    Environment: ${process.env.NODE_ENV || 'development'}
  `);
}

bootstrap();
