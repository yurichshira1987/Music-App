import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { SocketGateway } from './socket.io';
import { TrackModule } from './track/track.module';
import * as path from 'path'
import { MongooseModule} from '@nestjs/mongoose'


@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://test:rhjibkjdf1987@cluster0.hkaio.mongodb.net/gaming-app?retryWrites=true&w=majority`),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static')}),
    TrackModule, 
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule { }
