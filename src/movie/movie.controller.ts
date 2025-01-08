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
import { SearchByTitleDto } from './dto';
@Controller('movies')
export class MovieController {
    constructor(
        private movieService: MovieService,
    ) { }

    
    @Post()
    createBookmark(
      @Body() dto: SearchByTitleDto,
    ) {
      return this.movieService.searchByTitle(
        dto,
      );
    }

}
