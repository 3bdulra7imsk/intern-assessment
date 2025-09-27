import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  Request,
  HttpCode,
  HttpStatus,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
@UseGuards(AuthGuard('jwt'))
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getAllItems(@Request() req) {
    return this.itemsService.findAllByUser(req.user.email);
  }

  @Get(':id')
  async getItem(@Param('id') id: string, @Request() req) {
    return this.itemsService.findById(id, req.user.email);
  }

  @Post()
  async createItem(
    @Body(ValidationPipe) createItemDto: CreateItemDto,
    @Request() req
  ) {
    return this.itemsService.create(createItemDto, req.user.email);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: string,
    @Body(ValidationPipe) updateItemDto: UpdateItemDto,
    @Request() req
  ) {
    return this.itemsService.update(id, updateItemDto, req.user.email);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItem(@Param('id') id: string, @Request() req) {
    await this.itemsService.delete(id, req.user.email);
  }

  @Put(':id/toggle')
  async toggleComplete(@Param('id') id: string, @Request() req) {
    return this.itemsService.toggleComplete(id, req.user.email);
  }
}
