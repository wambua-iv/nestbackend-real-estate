import { Public } from '@/custom-decorators/setMetaData';
import { UserId } from '@/users/dto/user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreatePropertyDto,
  TenantDto,
  PropertyTypeDto,
  PropertyIdDto,
} from './dto';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Public()
  @Get('listings')
  getProperties() {
    return this.propertiesService.getProperties();
  }

  @Get('type')
  getPropertiesByType(@Body() dto: PropertyTypeDto) {
    return this.propertiesService.getPropertiesByType(dto);
  }

  @Public()
  @Post('id')
  getPropertyById(@Body() dto) {
    return this.propertiesService.getPropertyById(dto);
  }

  @Post('book')
  bookProperty(@Body() dto: TenantDto) {
    return this.propertiesService.bookProperty(dto);
  }

  @Post('bookings')
  getPropertyBookings(@Body() dto: UserId) {
    return this.propertiesService.getPropertyBookings(dto);
  }

  @Post('create_listing')
  createPropertyListing(@Body() dto: CreatePropertyDto) {
    return this.propertiesService.createPropertyListing(dto);
  }

  @Get('tenant_info')
  getTenantInfo(@Body() dto: PropertyIdDto) {
    return this.propertiesService.getTenantInfo(dto);
  }

  // @Post('payment')
  // makePayments(@Body() dto: PaymentDto) {
  //   return this.propertiesService.makePayments(dto);
  // }

  // @Get('view_payments')
  // getPaymentInfo(@Body() dto: PropertyIdDto) {
  //   return this.propertiesService.getPaymentInfo(dto);
  // }

  @Get('visitations')
  viewPropertyVisits(@Body() dto: PropertyIdDto) {
    return this.propertiesService.viewPropertyVisits(dto);
  }
}
