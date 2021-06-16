import { Controller, Post, Get, Delete, Put, UsePipes, ValidationPipe, Body, Query } from "@nestjs/common";
import { CreateUpdateSongDto } from "./dto/createUpdate-song.dto";
import { Song } from "./song.entity";
import { SongService } from "./song.service";

@Controller('songs')
export class SongController {
    constructor(private songService: SongService) {}

    @Get()
    async getSongs(): Promise<Song[]> {
        return await this.songService.getSongs()
    }

    @Get('get')
    async getSong(@Query('title') title : string) : Promise<Song> {
        return this.songService.getSongByTitle(title);
    }

    @Post('createSong')
    @UsePipes(new ValidationPipe({ disableErrorMessages: false}))
    async createSong(@Body() createSongDto : CreateUpdateSongDto) : Promise<Song> {
            return await this.songService.createSong(createSongDto);
    }

    @Put('updateSong')
    async updateSong(@Body() updateSongDto : CreateUpdateSongDto){
        return this.songService.updateSong(updateSongDto);
    }

    @Delete('deleteSong')
    async deleteSong(@Body() deleteSongDto : CreateUpdateSongDto) {
        return await this.songService.deleteSong(deleteSongDto);
    }
}
