import { Properties, PropertiesDocument } from '@/models';
import { UserId } from '@/users/dto/user.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePropertyDto, TenantDto, PropertyTypeDto } from './dto';
import { PropertyIdDto } from './dto/property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Properties.name) private Property: Model<PropertiesDocument>,
  ) {}

  //@InjectModel(Payments.name) private Payment: Model<PaymentDocument>,

  async getPropertiesByType(dto: PropertyTypeDto) {
    return await this.Property.aggregate([
      { $match: { type: dto.type } },
      {
        $lookup: {
          from: 'users',
          localField: 'ownerId',
          foreignField: 'ID',
          as: 'owner_info',
        },
      },
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
          'owner_info.role': 1,
        },
      },
    ]).catch(() => new InternalServerErrorException('Server Error'));
  }

  async getProperties() {
    return await this.Property.aggregate([
      { $match: { status: { $ne: 'pending' || 'booked' } } },
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
          'owner_info.role': 1,
        },
      },
    ]);
  }

  async getPropertyById(dto: PropertyIdDto) {
    return await this.Property.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(dto._id) } },
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
        },
      },
    ])
      .then((data) => data)
      .catch(() => new InternalServerErrorException('Server Error'));
  }

  async getPropertyBookings(dto: UserId) {
    return await this.Property.aggregate([
      {
        $match: {
          ownerId: dto.ID,
          status: 'pending',
          'tenants.status': 'pending',
        },
      },
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

  async getBooking(dto: UserId) {
    return await this.Property.aggregate([
      {
        $match: {
          'tenants.status': 'pending',
          'tenants.id': dto.ID,
        },
      },
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

  async createPropertyListing(dto: CreatePropertyDto) {
    const newListing = new this.Property({
      type: dto.type,
      property_name: dto.property_name,
      description: dto.description,
      location: dto.location,
      price: dto.price,
      ownerId: dto.ownerId,
      additional_information: dto.additional_information,
      contact_information: dto.contact_information,
      images: dto.images,
      amenities: dto.amenities,
    });

    return await newListing
      .save()
      .then((data) => ({
        _id: data._id,
      }))
      .catch((err) => console.log(err));
  }

  async bookProperty(dto: TenantDto) {
    return await this.Property.updateOne(
      { _id: dto._id },
      {
        $push: {
          tenants: {
            name: dto.name,
            id: dto.id,
            email: dto.email,
            status: 'pending',
          },
        },
        $set: { status: 'pending' },
      },
    ).catch(() => new InternalServerErrorException('Server Error'));
  }

  async updatePropertyInfo() {
    return null;
  }

  async getTenantInfo(dto: PropertyIdDto) {
    return await this.Property.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(dto._id),
          'tenants.current': true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'tenants.id',
          foreignField: 'ID',
          as: 'tenant_info',
        },
      },
      { $unwind: '$tenant_info' },
      {
        $project: {
          _id: 1,
          'tenants.current': 1,
          name: 1,
          location: 1,
          'tenant_info.name': 1,
          'tenant_info.ID': 1,
          'tenant_info.mobile': 1,
          'tenant_info.email': 1,
        },
      },
    ]);
  }

  // async getPaymentInfo(dto: PropertyIdDto) {
  //   return await this.Payment.aggregate([
  //     { $match: { property_id: dto.id } },
  //     {
  //       $project: {
  //         property_id: 1,
  //         tenantId: 1,
  //         duration: 1,
  //         payment: 1,
  //         paymentFor: 1,
  //         paymentMode: 1,
  //       },
  //     },
  //   ]);
  // }

  // async makePayments(dto: PaymentDto) {
  //   const Payment = new this.Payment({
  //     property_id: dto.property_Id,
  //     tenantId: dto.tenantId,
  //     duration: dto.duration,
  //     payment: dto.payment,
  //     paymentFor: dto.paymentFor,
  //     paymentMode: dto.paymentMode,
  //   });

  //   return await Payment.save()
  //     .then((data) => ({ _id: data._id }))
  //     .catch((err) => console.log(err));
  // }

  async viewPropertyVisits(dto: PropertyIdDto) {
    return await this.Property.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(dto._id) } },
      { $project: { name: 1, location: 1, visits: 1 } },
    ]);
  }
}
