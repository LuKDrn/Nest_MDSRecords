import { isNotEmpty, IsNotEmpty } from "class-validator";
import { Artist } from "src/artists/artist.entity";

export class CreateUpdateAlbumDto {
    id: string;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    year : number;
    @IsNotEmpty()
    cover : string;
    @IsNotEmpty()
    artistName: string;
}