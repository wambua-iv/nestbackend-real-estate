import { Body, Controller, Get, Post } from '@nestjs/common';
import { VisitationDto } from './dto/visit.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  getUserProfile() {
    return this.usersService.getUserProfile();
  }

  @Post('visitation')
  bookVisitation(@Body() dto: VisitationDto) {
    return this.usersService.bookVisitation(dto);
  }
}
