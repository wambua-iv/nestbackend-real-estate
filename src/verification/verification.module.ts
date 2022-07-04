import { Properties, PropertiesSchema } from '@/models';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationController } from './verification.controller';
import { VerifictionService } from './verification.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Properties.name, schema: PropertiesSchema }])],
  controllers: [VerificationController],
  providers: [VerifictionService],
})
export class VerificationModule {}
