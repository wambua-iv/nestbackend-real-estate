import { Properties, PropertiesDocument, UserDocument, Users } from '@/models';
import { UserId } from '@/users/dto/user.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropertyOwnerDto } from './dto';

@Injectable()
export class LandLordService {
  constructor(
    @InjectModel(Properties.name) private Property: Model<PropertiesDocument>,
    @InjectModel(Users.name) private User: Model<UserDocument>,
  ) {}

  async registerAsPropertyOwner(dto: PropertyOwnerDto) {
    return await this.User.updateOne(
      { ID: dto.ID },
      {
        $push: {
          properties: dto.property_registration,
        },
        $set: {
          role: 'pending',
        },
      },
    ).catch((err) => new InternalServerErrorException(err));
  }

  async viewProperties(dto: UserId) {
    return await this.Property.find({ ownerId: dto.ID }).then((data) => data);
  }

  async viewVacantProperties() {
    return null;
  }

  async setPropertyVacant() {
    return this.Property.aggregate([
      { $match: { status: 'vacant', approved: 'verified' } },
    ]);
  }
}
