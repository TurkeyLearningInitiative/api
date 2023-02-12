import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("App")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('healthcheck')
  healthcheck(): string {
    return 'OK';
  }
}
