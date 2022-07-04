import { Payments, Properties, Users, UserSchema } from '@/models';
import { PaymentSchema } from '@/models/payments.models';
import { PropertiesSchema } from '@/models/properties.models';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LandLordController } from './landlord.controller';
import { LandLordService } from './landlord.service';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Properties.name, schema: PropertiesSchema }]),
    MongooseModule.forFeature([{ name: Payments.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
  controllers: [PropertiesController, LandLordController],
  providers: [PropertiesService, LandLordService],
})
export class PropertiesModule {}
