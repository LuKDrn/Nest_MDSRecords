import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumRepository } from "./album.repository";

@Injectable()
export class AlbumService{
    constructor(
        @InjectRepository(AlbumRepository)
        private albumRepository : AlbumRepository,
    ) {}
    
}