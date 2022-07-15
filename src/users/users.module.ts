import { Properties, PropertiesSchema, Users, UserSchema } from '@/models';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Properties.name, schema: PropertiesSchema },
    ]),
  ],
  controllers: [UserController, AdminController],
  providers: [UsersService, AdminService],
})
export class UserModule {}
