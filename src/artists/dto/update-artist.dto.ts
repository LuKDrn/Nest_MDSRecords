import { IsNotEmpty, IsUrl } from "class-validator";
import { ArtistGenre } from "../artist-genre.enum";
import { ArtistNationality } from "../artist-nationality.enum";

export class UpdateArtistDto {
    @IsNotEmpty()
    id: string;
    name: string;
    nationality : ArtistNationality;
    genre: ArtistGenre;
    @IsUrl()
    photo : string;

}