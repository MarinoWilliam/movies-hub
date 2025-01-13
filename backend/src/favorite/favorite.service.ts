import {
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovieService } from 'src/movie/movie.service';

import {
    MakeFavoritDto,
    EditDescDto
} from './dto';

@Injectable()
export class FavoriteService {
    constructor(
        private prisma: PrismaService,
        private movieService: MovieService
    ) { }

    async getFavorits(userId: number) {
        const favorites = await this.prisma.favorite.findMany({
            where: {
                userId,
            },
            select: {
                movieId: true,
            },
        });

        const movieIds = favorites.map(favorite => favorite.movieId);

        const movies = await this.prisma.movie.findMany({
            where: {
                id: {
                    in: movieIds,
                },
            },
        });
        return movies;
    }


    async addtoFavorits(
        userId: number,
        dto: MakeFavoritDto,
    ) {
        let movie = await this.prisma.movie.findUnique({
            where: {
                imdbID: dto.movieimdbID,
            },
        });
        if (!movie) {
            let rawMovie = await this.movieService.searchByImdbID(dto.movieimdbID);

            movie = await this.prisma.movie.create({
                data: {
                    imdbID: dto.movieimdbID,
                    title: rawMovie.Title,
                    year: rawMovie.Year,
                    posterUrl: rawMovie.Poster,
                },
            });
        }
        console.log(movie)

        const existingFavorite = await this.prisma.favorite.findUnique({
            where: {
                userId_movieId: {
                    userId: userId,
                    movieId: movie.id,
                },
            },
        });

        if (existingFavorite) {
            return existingFavorite;
        }


        const favorite = await this.prisma.favorite.create({
            data: {
                userId,
                movieId: movie.id,
                description: dto.description,
            },
        });

        return favorite;
    }

    async UpdatefavDescription(
        userID: number,
        movieID: number,
        dto: EditDescDto,
    ) {

        const favorite =
            await this.prisma.favorite.findUnique({
                where: {
                    id: movieID
                },
            });

        if (!favorite || favorite.userId !== userID)
            throw new ForbiddenException(
                'Access to resources denied',
            );

        return this.prisma.favorite.update({
            where: {
                id: movieID,
            },
            data: {
                description: dto.description,
            },
        });
    }

    async deleteFavById(
        userId: number,
        movieId: string,
    ) {
        let movie = await this.prisma.movie.findUnique({
            where: {
                imdbID: movieId,
            },
        });

        await this.prisma.favorite.delete({
            where: {
                userId_movieId: {
                    userId,
                    movieId:movie.id,
                },
            },
        });

    }
}

