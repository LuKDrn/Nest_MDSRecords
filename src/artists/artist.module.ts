import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistController } from "./artist.controller";
import { ArtistRepository } from "./artist.repository";
import { ArtistService } from "./artist.service";

@Module({
    imports: [TypeOrmModule.forFeature([ArtistRepository])],
    controllers: [ArtistController],
    providers: [ArtistService],
    exports: [ArtistService]
})
export class ArtistModule {}