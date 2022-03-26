import { Injectable } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SocketGateway } from './socket.io';


@Injectable()
@WebSocketGateway()
export class AppService {
  constructor(private socketGateway: SocketGateway) { }

  @SubscribeMessage('message')
    message(@MessageBody() data: string):void {
        // console.log(data)
    }

  getHello(): string {
    // const test = new Test()
    // test.test()
    // console.log('asdasd123123123')
    // this.socketGateway.io.emit('test', 'lallalalalala')
   return 'adzxczxczxcxzczc1111'
  }

  getUsers(): string {
    return 'get Users'
  }
}
