import { Module } from "@nestjs/common";
import { CommentSchema, Comment } from "./schemas/comment.schema";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { Track, TrackSchema } from "./schemas/track.schema";
import { FileService } from "src/file/file.service";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }],)
    ],
    controllers: [TrackController],
    providers: [TrackService, FileService]
})

export class TrackModule { }