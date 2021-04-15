import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './albums/album.module';
import { ArtistModule } from './artists/artist.module';
import { typeormConfig } from './config/typeorm.config';
import { SongModule } from './songs/song.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [ArtistModule, SongModule, AlbumModule, UserModule,TypeOrmModule.forRoot(typeormConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
