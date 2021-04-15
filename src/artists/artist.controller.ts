import { Body, Controller, Post, UnprocessableEntityException, UsePipes, ValidationPipe } from "@nestjs/common";
import { ArtistGenre } from "./artist-genre.enum";
import { ArtistNationality } from "./artist-nationality.enum";
import { Artist } from "./artist.entity";
import { ArtistService } from "./artist.service";
import { AddArtistDto } from "./dto/add-artist.dto";

@Controller('artists')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

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
}