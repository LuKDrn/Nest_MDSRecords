import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumModule } from "src/albums/album.module";
import { ArtistController } from "./artist.controller";
import { ArtistRepository } from "./artist.repository";
import { ArtistService } from "./artist.service";

@Module({
    imports: [TypeOrmModule.forFeature([ArtistRepository])],
    controllers: [ArtistController],
    providers: [ArtistService],
    exports : [ArtistService]
})
export class ArtistModule {}