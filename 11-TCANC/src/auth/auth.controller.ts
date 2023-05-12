import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    body.password = await bcrypt.hash(body.password, 12);

    return this.authService.create(body);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.findOneBy({ email });
    if (!user) throw new BadRequestException('Email does no exists');

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) throw new BadRequestException('Invalid Credentials');

    return { user };
  }
}
