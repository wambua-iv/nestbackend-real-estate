import { Properties, PropertiesDocument, UserDocument, Users } from '@/models';
import { UserId } from '@/users/dto/user.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PropertyIdDto, PropertyOwnerDto } from './dto';

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
    return await this.Property.aggregate([
      { $match: { ownerId: dto.ID } },
      {
        $project: {
          type: 1,
          property_name: 1,
          location: 1,
          price: 1,
          description: 1,
          additional_information: 1,
          ownerId: 1,
          contact_information: 1,
          images: 1,
          amenities: 1,
          _id: 1,
          tenants: 1,
        },
      },
    ]);
  }

  async viewVacantProperties() {
    return null;
  }

  async declareVacant(dto: PropertyIdDto) {
    return this.Property.updateOne(
      { _id: new mongoose.Types.ObjectId(dto._id) },
      { $set: { status: 'vacant' } },
    );
  }
  // 'tenants.status': 'vacated'
  // async setPropertyVacant() {
  //   return this.Property.aggregate([
  //     { $match: { status: 'vacant', approved: 'verified' } },
  //   ]);
  // }
}
