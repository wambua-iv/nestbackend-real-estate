import { Properties, PropertiesDocument } from '@/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VerifictionService {
  constructor(@InjectModel(Properties.name) private Property: Model<PropertiesDocument>) {}

  async getPropertyOwners() {
    return null;
  }

  async verifyNewPropertyOwnerRegistration() {
    return null;
  }

  async confirmPropertyAvailability() {
    return null;
  }
}
