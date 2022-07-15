import { Body, Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('property_owners')
  getPropertyOwners() {
    return this.adminService.getPropertyOwners();
  }

  @Get('pending_verification')
  getPendingVerifications() {
    return this.adminService.getPendingVerifications();
  }
}
