import { Properties, PropertiesDocument, UserDocument, Users } from '@/models';
import { UserId } from '@/users/dto/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LandLordService {
  constructor(
    @InjectModel(Properties.name) private Property: Model<PropertiesDocument>,
    @InjectModel(Users.name) private User: Model<UserDocument>,
  ) {}

  async registerAsPropertyOwner(dto: UserId) {
    return await this.User.aggregate([
      { $match: { ID: dto.ID } },
      { $set: { role: 'property owner' } },
      { $project: { name: 1, ID: 1, role: 1 } },
    ]);
  }

  async viewProperties(dto: UserId) {
    return await this.Property.find({ ownerId: dto.ID });
  }

  async viewVacantProperties() {
    return null;
  }

  async setPropertyVacant() {
    return this.Property.aggregate([{ $match: { status: 'vacant', approved: 'verified' } }]);
  }
}
