import { TinyUrlController } from './tiny_url.controller';
import { Module } from '@nestjs/common';
import { TinyUrlService } from './tiny_url.service';

@Module({
  providers: [TinyUrlService],
  controllers: [TinyUrlController],
})
export class TinyUrlModule {}
