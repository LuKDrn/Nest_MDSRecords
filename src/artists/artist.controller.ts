import { Body, Controller, Post, Get, UnprocessableEntityException, UsePipes, ValidationPipe, Query, Put, Delete, Param } from "@nestjs/common";
import { ArtistGenre } from "./artist-genre.enum";
import { ArtistNationality } from "./artist-nationality.enum";
import { Artist } from "./artist.entity";
import { ArtistService } from "./artist.service";
import { AddArtistDto } from "./dto/add-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";

@Controller('artists')
export class ArtistController {
    constructor(private artistService: ArtistService) {}
    
    @Get()
    async getArtists(): Promise<Artist[]> {
        return await this.artistService.getArtists()
    }

    @Get('byId')
    async getArtist(@Query('id') id : string) : Promise<Artist> {
        return this.artistService.getArtistById(id);
    }
    
    @Get("photo")
    async getArtistPhoto(@Query('id') id : string) : Promise<string> {
        var artist = await this.artistService.getArtistById(id);
        return artist.photo;
    }

    @Post('addArtist')
    @UsePipes(new ValidationPipe({ disableErrorMessages: true}))
    async addArtist(@Body() addArtistDto : AddArtistDto) : Promise<Artist> {
        if (Object.values(ArtistGenre).includes(addArtistDto.genre) && Object.values(ArtistNationality).includes(addArtistDto.nationality)) {
            return await this.artistService.addArtist(addArtistDto);
        }
        else {
            throw new UnprocessableEntityException('Model not valid, the nationality or genre does not exist.')
        }
    }

    @Put('updateArtist')
    async updateArtist(@Body() updateArtistDto : UpdateArtistDto){
        return this.artistService.updateArtist(updateArtistDto);
    }

    @Delete('removeArtist')
    async deleteArtist(@Param('id') id: string) {
        return await this.artistService.deleteArtist(id);
    }

}