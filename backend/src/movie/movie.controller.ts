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

import { MovieService } from './movie.service';
@Controller('movies')
export class MovieController {
    constructor(
        private movieService: MovieService,
    ) { }

    
    @Get(':title')
    searchByTitle(
      @Param('title') title: string,
    ) {
      return this.movieService.searchByTitle(
        title
      );
    }

}
