import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('items')
export class ItemsController {
  // In a real app you'd fetch from DB; here return simple data
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getItems(@Request() req) {
    return [
      { id: 1, name: 'Item A', owner: req.user.email },
      { id: 2, name: 'Item B', owner: req.user.email },
    ];
  }
}
