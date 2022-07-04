import { ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { SignInAuthDto, SignUpAuthDto } from './dto';
import { UserDocument, Users } from '@/models';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private User: Model<UserDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(
    dto: SignUpAuthDto,
  ): Promise<void | { access_token: string; refresh_token: string } | ForbiddenException> {
    const hash = await argon.hash(dto.password);
    const user = new this.User({
      name: {
        firstname: dto.firstname,
        lastname: dto.lastname,
      },
      email: dto.email,
      hash: hash,
      mobile: dto['phone number'],
      ID: dto.ID,
    });

    return await user
      .save()
      .then(async (createdUser) => {
        const tokens = await this.signToken(createdUser.email, createdUser._id);

        await this.updateUserRefreshToken(tokens.refresh_token, createdUser.email);

        return tokens;
      })
      .catch((err) => (err.code === 11000 ? new ForbiddenException('Credentials alrady exist') : console.log(err)));
  }

  async signIn(
    dto: SignInAuthDto,
  ): Promise<void | { access_token: string; refresh_token: string } | ForbiddenException> {
    return await this.User.findOne({ email: dto.email })
      .then(async (exists) => {
        const verifyHash = await argon.verify(exists.hash, dto.password);
        if (!verifyHash) throw new ForbiddenException();

        const tokens = await this.signToken(exists.email, exists._id);
        await this.updateUserRefreshToken(tokens.refresh_token, exists.email);

        return tokens;
      })
      .catch((err) =>
        err instanceof ForbiddenException
          ? new ForbiddenException('Invalid Email or Password')
          : new InternalServerErrorException('Server Error'),
      );
  }

  //async signInWithGoogle() {}

  async refreshToken(email: string, refresh_token: string) {
    const user = await this.User.findOne({ email: email }).exec();
    if (!user) throw new ForbiddenException('Access Denied');

    const tokenMatch = await argon.verify(user.TokenHash, refresh_token);
    if (!tokenMatch) throw new ForbiddenException('Access Denied');

    const newTokens = await this.signToken(user.email, user._id);
    await this.updateUserRefreshToken(newTokens.refresh_token, user.email);

    return newTokens;
  }

  async updateUserRefreshToken(refresh_token, email: SignInAuthDto['email']) {
    if (refresh_token) {
      const tokenHash = await argon.hash(refresh_token);

      await this.User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            TokenHash: tokenHash,
          },
        },
      );
    } else {
      throw new UnauthorizedException();
    }
  }

  async signToken(email: string, userId: string): Promise<{ access_token: string; refresh_token: string }> {
    const accessSecret = this.config.get('JWT_SECRET');
    const refreshSecret = this.config.get('JWT_REFRESH_SECRET');
    const payload = {
      sub: userId,
      email,
    };
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: accessSecret,
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: 60 * 60 * 24 * 3,
      secret: refreshSecret,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
