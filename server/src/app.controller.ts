import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SocketGateway, Test } from './socket.io';

@Controller()
export class AppController {
  constructor(
    private appService: AppService) { }


  @Get()
  getHello():string {
    new Test()
    return 'ОБНОВИЛОСЬ БЛЯТЬ'
    // return this.appService.getHello();
  }


}
