import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Album } from "./album.entity";
import { AlbumService } from "./album.service";
import { CreateUpdateAlbumDto } from "./dto/createUpdate-album.dto";

@Controller('albums')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Get()
    async getAlbums(): Promise<Album[]> {
        return await this.albumService.getAlbums()
    }

    @Get('byTitle')
    async getAlbum(@Query('title') title : string) : Promise<Album> {
        return this.albumService.getAlbumByTitle(title);
    }

    @Post('createAlbum')
    @UsePipes(new ValidationPipe({ disableErrorMessages: true}))
    async createAlbum(@Body() createAlbumDto : CreateUpdateAlbumDto) : Promise<Album> {
            return await this.albumService.createAlbum(createAlbumDto);
    }

    @Put('updateAlbum')
    async updateAlbum(@Body() updateAlbumDto : CreateUpdateAlbumDto){
        return this.albumService.updateAlbum(updateAlbumDto);
    }

    @Delete('deleteAlbum')
    async deleteAlbum(@Body() deleteAlbumDto : CreateUpdateAlbumDto) {
        return await this.albumService.deleteAlbum(deleteAlbumDto);
    }
}