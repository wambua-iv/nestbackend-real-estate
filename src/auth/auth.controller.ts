import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '@/custom-decorators/setMetaData';
import { AuthService } from './auth.service';
import { RefreshAuthDto, SignInAuthDto, SignUpAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() dto: SignUpAuthDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInAuthDto) {
    return this.authService.signIn(dto);
  }

  // @Public()
  // @Get('google/signin')
  // @HttpCode(HttpStatus.OK)
  // async signInWithGoogle() {}

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Body() dto: RefreshAuthDto) {
    return this.authService.refreshToken(dto);
  }
}
