import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { SignupDto, LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationsService) { }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authenticationService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto);
  }
}