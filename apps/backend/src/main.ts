import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security headers
  app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  }));

  // Enable CORS with strict configuration
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000'];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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

  // Swagger documentation (only in non-production)
  if (process.env.NODE_ENV !== 'production') {
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
  }

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
