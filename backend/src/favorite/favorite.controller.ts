import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';

import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { FavoriteService } from './favorite.service';

import {
    MakeFavoritDto,
    EditDescDto
} from './dto';

@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoriteController {
    constructor(
        private favoriteService: FavoriteService,
    ) { }

    @Get()
    getFavorits(@GetUser() userId: number) {
        return this.favoriteService.getFavorits(
            userId,
        );
    }


    @Post()
    addtoFavorits(
        @GetUser() userId: number,
        @Body() dto: MakeFavoritDto,
    ) {
        return this.favoriteService.addtoFavorits(
            userId,
            dto,
        );
    }

    @Patch(':movieID')
    UpdatefavDescription(
        @GetUser() userID: number,
        @Param('movieID' ,ParseIntPipe) movieID: number,
        @Body() dto: EditDescDto,
    ) {
        return this.favoriteService.UpdatefavDescription(
            userID,
            movieID,
            dto,
        );
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':movieid')
    deleteFavoriteById(
        @GetUser() userId: number,
        @Param('movieid') movieId: string,
    ) {
        return this.favoriteService.deleteFavById(
            userId,
            movieId,
        );
    }
}
