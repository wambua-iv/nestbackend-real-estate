import {
  Properties,
  PropertiesSchema,
  PropertyBookings,
  PropertyBookingsSchema,
  Users,
  UserSchema,
} from '@/models';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LandLordController } from './landlord.controller';
import { LandLordService } from './landlord.service';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Properties.name, schema: PropertiesSchema },
    ]),
    MongooseModule.forFeature([
      { name: PropertyBookings.name, schema: PropertyBookingsSchema },
    ]),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
  controllers: [PropertiesController, LandLordController],
  providers: [PropertiesService, LandLordService],
})
export class PropertiesModule {}
