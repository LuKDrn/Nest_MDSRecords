import { IsNotEmpty } from "class-validator";

export class CreateUpdateSongDto {
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    duration : number;
    @IsNotEmpty()
    albumId: string;
}