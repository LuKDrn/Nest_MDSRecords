import { IsNotEmpty, IsUrl } from "class-validator";

export class UpdateArtistPhotoDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsUrl()
    photo : string;

}