import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumModule } from "src/albums/album.module";
import { SongController } from "./song.controller";
import { SongRepository } from "./song.repository";
import { SongService } from "./song.service";

@Module({
    imports: [TypeOrmModule.forFeature([SongRepository]), AlbumModule],
    controllers: [SongController],
    providers: [SongService]
})
export class SongModule {}