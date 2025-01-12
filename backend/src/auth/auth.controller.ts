import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
import { GetUser } from './decorator';
  import { SignInAuthDto, SignUpAuthDto } from './dto';
import { JwtGuard } from './guard';
  
  @Controller('auth')
  
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Get()
    @UseGuards(JwtGuard)
    getFavorits(@GetUser() userId: number) {
        return this.authService.checkUser(
            userId,
        );
    }

    @Post('signup')
    signup(@Body() dto: SignUpAuthDto) {
      return this.authService.signup(dto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: SignInAuthDto) {
      return this.authService.signin(dto);
    }
  }
  