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

    getFavorits(userId: number) {
        return this.prisma.favorite.findMany({
            where: {
                userId,
            },
        });
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
        userID: number,
        movieID: number,
    ) {
        const movie =
            await this.prisma.favorite.findUnique({
                where: {
                    id: movieID,
                },
            });

        if (!movie || movie.userId !== userID)
            throw new ForbiddenException(
                'Access to resources denied',
            );

        await this.prisma.favorite.delete({
            where: {
                id: movieID,
            },
        });
    }
}

