import { Controller } from "@nestjs/common";
import { SongService } from "./song.service";

@Controller('songs')
export class SongController {
    constructor(private songService: SongService) {}
}