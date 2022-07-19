import { UserId } from '@/users/dto/user.dto';
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { PropertyOwnerDto, PropertyIdDto } from './dto';
import { LandLordService } from './landlord.service';

@Controller('owners')
export class LandLordController {
  constructor(private landlordService: LandLordService) {}

  @Patch('registration')
  registerAsPropertyOwner(@Body() dto: PropertyOwnerDto) {
    return this.landlordService.registerAsPropertyOwner(dto);
  }

  @Post('view_properties')
  viewProperties(@Body() dto: UserId) {
    return this.landlordService.viewProperties(dto);
  }

  @Get('vacant_properties')
  viewVacantProperties() {
    return this.landlordService.viewVacantProperties();
  }

  // @Post('accept_tenaant')
  // bookProperty(@Body() dto: TenantDto) {
  //   return this.propertiesService.bookProperty(dto);
  // }

  @Post('declare_vacant')
  declareVacant(@Body() dto: PropertyIdDto) {
    return this.landlordService.declareVacant(dto);
  }
}
