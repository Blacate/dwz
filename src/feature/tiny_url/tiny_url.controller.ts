import { Controller, Inject, forwardRef, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { TinyUrlService } from './tiny_url.service';

@Controller('api')
export class TinyUrlController {
  constructor(
    @Inject(forwardRef(() => TinyUrlService))
    private readonly tinyUrlService: TinyUrlService,
  ) {}

  @Get('tinyUrls')
  async getAll() {
    return await this.tinyUrlService.fetch();
  }

  @Get('tinyUrl/:id')
  async getByid(@Param('id') id: string) {
    return await this.tinyUrlService.getById(Number(id));
  }

  @Get('query/:name')
  async getByName(@Param('name') name: string) {
    const tinyUrl = await this.tinyUrlService.getByName(name);
    return tinyUrl ? tinyUrl.full_url : '';
  }

  @Get('check/:name')
  async checkUnique(@Param('name') name: string) {
    const tinyUrl = await this.tinyUrlService.getByName(name);
    return Boolean(tinyUrl);
  }

  @Post('update/:id')
  async updateById(@Param('id') id: string, @Body() body) {
    return await this.tinyUrlService.updateById(Number(id), body);
  }

  @Delete('delete/:id')
  async deleteById(@Param('id') id: string) {
    return await this.tinyUrlService.deleteById(Number(id));
  }

  @Post('add')
  async update(@Body() body) {
    return await this.tinyUrlService.add(body);
  }
}