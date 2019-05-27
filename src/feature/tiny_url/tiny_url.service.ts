import { UpdateTinyUrl } from './interfaces/update_tiny_url.interface';
import { AddTinyUrl } from './interfaces/add_tiny_url.interface';
import { TinyUrl } from './interfaces/tiny_url.interface';
import { Injectable, Get } from '@nestjs/common';

const data: TinyUrl[] = [{
  id: 1,
  name: 'baidu',
  full_url: 'https://www.baidu.com',
  description: 'baidu page',
}];

@Injectable()
export class TinyUrlService {
  constructor() {}

  async getByName(name: string) {
    return data.find(tinyUrl => tinyUrl.name === name);
  }

  async getById(id: number) {
    return data.find(tinyUrl => tinyUrl.id === id)
  }

  async fetch() {
    return data;
  }

  async add(tinyUrl: AddTinyUrl) {
    const id = data[data.length - 1].id + 1;
    data.push({
      id,
      ...tinyUrl,
    });
    return true;
  }

  async deleteById(id: number) {
    const index = data.findIndex(tinyUrl => tinyUrl.id === id)
    if (index !== -1) {
      data.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  async updateById(id: number, updateTinyUrl: UpdateTinyUrl) {
    const tinyUrl = await this.getById(id);
    if (tinyUrl) {
      Object.assign(tinyUrl, updateTinyUrl);
      return true;
    }
    return false;
  }
  
}
