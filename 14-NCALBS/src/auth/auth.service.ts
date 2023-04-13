import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { LoginAuthDto } from './dto/login-auth-dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async login(userLoginBody: LoginAuthDto) {
    const { email, password } = userLoginBody;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, user.password);
    if (!isCheck)
      throw new HttpException('PASSWORD INVALID', HttpStatus.NOT_FOUND);

    const userFlat = user.toObject();
    Reflect.deleteProperty(userFlat, 'password');

    const payload = { id: userFlat._id };

    const token = this.jwtService.sign(payload);

    return {
      token,
      user: userFlat,
    };
  }

  async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;
    const userParse = {
      ...user,
      password: await generateHash(password),
    };
    return this.userModel.create(userParse);
  }
}
