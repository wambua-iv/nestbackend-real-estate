import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserId } from './dto/user.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('property_owners')
  getPropertyOwners() {
    return this.adminService.getPropertyOwners();
  }

  @Get('pending_verifications')
  getPendingVerifications() {
    return this.adminService.getPendingVerifications();
  }

  @Post('verify_property_owner')
  verifyPropertyOwner(@Body() dto: UserId) {
    return this.adminService.verifyPropertyOwner(dto);
  }
}
