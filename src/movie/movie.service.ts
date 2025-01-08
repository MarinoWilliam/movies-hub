import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SearchByTitleDto } from './dto';
import axios from 'axios';


@Injectable()
export class MovieService {

    constructor(private config: ConfigService) {}
    async searchByTitle(
        dto: SearchByTitleDto,
        ) {
            try {
                const myAPIKey = this.config.get('OMDb_API');
                const url = `http://www.omdbapi.com/`
                const response = await axios.get(url, {
                    params: {
                      s: dto.title,
                      apikey: myAPIKey,
                    },
                  });

                  return response.data.Search;  
            } catch (error) {
                throw new Error('Error fetching data from OMDB API');
            }
         
      }
}
