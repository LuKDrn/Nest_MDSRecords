import { IsNotEmpty } from "class-validator";

export class CreateUpdateSongDto {
    id: string;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    duration : number;
    @IsNotEmpty()
    albumTitle: string;
}