import { ConflictException, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "src/artists/artist.entity";
import { ArtistRepository } from "src/artists/artist.repository";
import { EntityRepository, Repository } from "typeorm";
import { Album } from "./album.entity";
import { CreateUpdateAlbumDto } from "./dto/createUpdate-album.dto";

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {
    constructor(
        @InjectRepository(ArtistRepository)
        private readonly artistRepository : ArtistRepository,
    ){
        super();
    } 
    
    async getAlbum(title: string) : Promise<Album> {        
        const album = await this.findOne({ title: title });
        if (album) {
            return album;
        }
        throw new HttpException('Album does not exist', HttpStatus.NOT_FOUND);
    }

    async createAlbum(createAlbumDto : CreateUpdateAlbumDto, artist : Artist) : Promise<Album> {
        const {title, year, artistName, cover} = createAlbumDto;
        
        let album = new Album();
        album.title = title;      
        album.year = year;
        album.cover = cover;
        
        (await artist).albums = [album];
        const albumInDbb = await this.findOne({title : title});
        if(!albumInDbb){
            return await this.save(album);
        }
        else {
            throw new ConflictException("This album is already saved in database.")
        }
    }

    async updateAlbum(updateAlbumDto: CreateUpdateAlbumDto, artist : Artist): Promise<any> {
        const {title, year, artistName, cover} = updateAlbumDto;

        let album = await this.getAlbum(title);
        await this.deleteAlbum(album.title, artist);
        await this.createAlbum(updateAlbumDto, artist);
        return null;
    }

    async deleteAlbum(title: string, artist : Artist) : Promise<string> {
        const album = await this.getAlbum(title);
        var index = artist.albums.indexOf(album);
        artist.albums.splice(index, 1);
        await this.delete(album);
        return `${title} has been deleted from the database.`
    }
}