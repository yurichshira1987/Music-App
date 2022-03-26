import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";


@WebSocketGateway()
export class SocketGateway { 

    @WebSocketServer()
    io


    handleConnection(socket) { 
        store.push(socket.id)
        console.log('socket connected ')
        // this.io.emit('test', 'lallalalalalalala')
    }

    handleDisconnect(socket) {
        console.log('socket disconected ' + socket.id)
       
    }

    @SubscribeMessage('message')
    message(@MessageBody() data: string, @ConnectedSocket() socket) {
        socket.emit('test', 'тестим блять')
    }

}


export const store = []



export class Test {
    constructor(){
        this.test()
    }
    test(){
        console.log('всё работает и зыко аще')
    }
}