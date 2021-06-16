import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistModule } from "src/artists/artist.module";
import { AlbumController } from "./album.controller";
import { AlbumRepository } from "./album.repository";
import { AlbumService } from "./album.service";

@Module({
    imports: [TypeOrmModule.forFeature([AlbumRepository]), ArtistModule],
    controllers: [AlbumController],
    providers: [AlbumService],
    exports : [AlbumService]
})
export class AlbumModule {}