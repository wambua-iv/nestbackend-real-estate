import { Users, UserSchema } from '@/models/users.models';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthStrategy, JwtRefreshStrategy, JwtStrategy } from './strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]), JwtModule.register({}), Users],
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshStrategy, JwtStrategy],
})
export class AuthModule {}
