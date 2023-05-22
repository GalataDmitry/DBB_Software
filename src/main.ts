import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { MainModule } from './main.module';

const starter = async () => {
  const app = await NestFactory.create(MainModule);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Server has run on port ${PORT}`));
}

starter();