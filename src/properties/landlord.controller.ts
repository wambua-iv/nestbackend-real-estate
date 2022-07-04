import { UserId } from '@/users/dto/user.dto';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { LandLordService } from './landlord.service';

@Controller('owners')
export class LandLordController {
  constructor(private landlordService: LandLordService) {}

  @Patch('registration')
  registerAsPropertyOwner(@Body() dto: UserId) {
    return this.landlordService.registerAsPropertyOwner(dto);
  }

  @Get('view_properties')
  viewProperties(@Body() dto: UserId) {
    return this.landlordService.viewProperties(dto);
  }

  @Get('vacant_properties')
  viewVacantProperties() {
    return this.landlordService.viewVacantProperties();
  }
}
