import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { MovieService } from 'src/movie/movie.service';

@Module({
  providers: [FavoriteService, MovieService],
  controllers: [FavoriteController]
})
export class FavoriteModule {}
