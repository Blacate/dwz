import { Injectable } from '@nestjs/common';

const data = [{
  tiny_url: 'baidu',
  full_url: 'https://www.baidu.com',
  description: 'baidu page',
}];

@Injectable()
export class TinyUrlService {
  constructor() {}

}
