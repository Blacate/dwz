import { TinyUrlModule } from './feature/tiny_url/tiny_url.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TinyUrlModule],
})
export class AppModule {}
