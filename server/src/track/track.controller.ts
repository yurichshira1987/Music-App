import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, UploadedFiles, Query } from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { ObjectId } from 'mongoose'
import { CreateCommentkDto } from "./dto/create-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";


@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const { picture, audio } = files
        return this.trackService.create(dto, picture[0], audio[0])
    }

    @Get()
    getAll(@Query('count') count:number, @Query('offset') offset:number) {
        return this.trackService.getAll(count, offset)
    }

    @Get('search')
    search(@Query('songname') songName:string) {
        return this.trackService.search(songName)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id)
    }

    @Post('/comment') 
    addComment(@Body() dto: CreateCommentkDto) {
        return this.trackService.addComment(dto)
    }

    @Post('/addlisten/:id')
    addListen(@Param('id') id: ObjectId) {
        return this.trackService.addListen(id)
    }
}

// private appService: AppService