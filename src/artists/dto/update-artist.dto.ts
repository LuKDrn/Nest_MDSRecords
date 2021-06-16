import { IsNotEmpty, IsUrl } from "class-validator";

export class UpdateArtistPhotoDto {
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsUrl()
    photo : string;

}