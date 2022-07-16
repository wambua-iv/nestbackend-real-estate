import { Injectable } from '@nestjs/common';
import { Users, UserDocument, Properties, PropertiesDocument } from '@/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserId } from './dto/user.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Users.name) private User: Model<UserDocument>,
    @InjectModel(Properties.name) private Property: Model<PropertiesDocument>,
  ) {}

  async getPropertyOwners() {
    return await this.User.aggregate([
      { $match: { role: 'property owner ' } },
      { $project: { _id: 1, name: 1 } },
    ]);
  }

  async getPendingVerifications() {
    return await this.User.aggregate([
      { $match: { role: 'pending' } },
      { $project: { _id: 1, name: 1, ID: 1, email: 1, properties: 1 } },
    ]);
  }

  async verifyPropertyOwner(dto: UserId) {
    return await this.User.updateOne(
      { $match: { ID: dto.ID, role: 'pending' } },
      { $set: { role: 'property owner' } },
    );
  }
}
