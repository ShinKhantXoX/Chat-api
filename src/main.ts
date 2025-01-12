import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for API and WebSocket
  app.enableCors({
    origin: '*', // Replace '*' with the actual origin (e.g., http://localhost:3000) for better security
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(3000); // Listen on port 3500 for WebSocket server
}

bootstrap();
