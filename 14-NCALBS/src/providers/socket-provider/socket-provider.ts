import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketProvider
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  afterInit(server: any) {
    console.log('Method not implemented.');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('Method not implemented.');
  }
  handleDisconnect(client: any) {
    console.log('Method not implemented.');
  }
}
