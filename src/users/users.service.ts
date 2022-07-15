import { Users, UserDocument, Properties, PropertiesDocument } from '@/models';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { VisitationDto } from './dto/visit.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private User: Model<UserDocument>,
    @InjectModel(Properties.name) private Property: Model<PropertiesDocument>,
  ) {}

  async getUserProfile() {
    return await this.User.findOne();
  }

  async bookVisitation(dto: VisitationDto) {
    return await this.User.findOneAndUpdate(
      { ID: dto.ID },
      {
        $push: {
          visits: {
            propertyId: dto.property_Id,
            name: dto.name,
            ID: dto.ID,
            email: dto.email,
            time: dto.time,
          },
        },
      },
      { new: true },
    ).then(async (data) => {
      await this.Property.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(dto.property_Id) },
        { $push: { visits: data.visits } },
      ).catch((err) => new InternalServerErrorException(err));
      return data.visits;
    });
  }
}
