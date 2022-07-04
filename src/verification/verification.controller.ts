import { Controller, Get, Post, Patch } from '@nestjs/common';
import { VerifictionService } from './verification.service';

@Controller('verify')
export class VerificationController {
  constructor(private verificationService: VerifictionService) {}

  @Get('property_owners')
  getPropertyOwners() {
    return this.verificationService.getPropertyOwners();
  }

  @Patch('new_registration')
  verifyNewPropertyOwnerRegistration() {
    return this.verificationService.verifyNewPropertyOwnerRegistration();
  }

  @Patch('confirm_availability')
  confirmPropertyAvailability() {
    return this.verificationService.confirmPropertyAvailability();
  }
}
