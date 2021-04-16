import { ConflictException, HttpException, HttpStatus } from "@nestjs/common";
import { Artist } from "src/artists/artist.entity";
import { EntityRepository, Repository } from "typeorm";
import { Album } from "./album.entity";
import { CreateUpdateAlbumDto } from "./dto/createUpdate-album.dto";

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {
    
    async getAlbum(title: string) : Promise<Album> {        
        const album = await this.createQueryBuilder('albums').where({ title : title }).leftJoinAndSelect("albums.artist", 'artist').getOne()
        if (album) {
            return album;
        }
        throw new HttpException('Album does not exist', HttpStatus.NOT_FOUND);
    }

    async createAlbum(createAlbumDto : CreateUpdateAlbumDto, artist : Artist) : Promise<Album> {

        const album = this.create({...createAlbumDto, artist});
        (await artist).albums = [album];
        const copy = await this.getAlbum(album.title);
        if(!copy){
            return await this.save(album);
        } else {
            throw new ConflictException("This album already exist.")
        }
    }

    async updateAlbum(updateAlbumDto: CreateUpdateAlbumDto, artist : Artist): Promise<any> {
        const {title} = updateAlbumDto;

        let album = await this.getAlbum(title);
        await this.deleteAlbum(album.title, artist);
        await this.createAlbum(updateAlbumDto, artist);
        return null;
    }

    async deleteAlbum(title: string, artist : Artist) : Promise<string> {
        const album = await this.getAlbum(title);
        var index = await artist.albums.indexOf(album);
        artist.albums.splice(index, 1);
        await this.delete(album);
        return `${title} has been deleted from the database.`
    }
}