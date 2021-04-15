import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumController } from "./album.controller";
import { AlbumRepository } from "./album.repository";
import { AlbumService } from "./album.service";

@Module({
    imports: [TypeOrmModule.forFeature([AlbumRepository])],
    controllers: [AlbumController],
    providers: [AlbumService]
})
export class AlbumModule {}