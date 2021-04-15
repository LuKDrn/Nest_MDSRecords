import { IsEnum, IsNotEmpty, IsUrl } from "class-validator";
import { ArtistGenre } from "../artist-genre.enum";
import { ArtistNationality } from "../artist-nationality.enum";

export class AddArtistDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEnum(ArtistNationality)
    nationality : ArtistNationality;
    @IsNotEmpty()
    @IsUrl()
    photo: string;
    @IsNotEmpty()
    @IsEnum(ArtistGenre)
    genre: ArtistGenre;

}