import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async findAllByUser(userEmail: string): Promise<Item[]> {
    return this.itemModel.find({ owner: userEmail }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string, userEmail: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    if (item.owner !== userEmail) {
      throw new ForbiddenException('You can only access your own items');
    }
    return item;
  }

  async create(createItemDto: CreateItemDto, userEmail: string): Promise<Item> {
    const newItem = new this.itemModel({
      ...createItemDto,
      owner: userEmail,
      completed: createItemDto.completed || false,
    });
    return newItem.save();
  }

  async update(id: string, updateItemDto: UpdateItemDto, userEmail: string): Promise<Item> {
    await this.findById(id, userEmail); // This checks ownership
    
    const updatedItem = await this.itemModel.findByIdAndUpdate(
      id,
      updateItemDto,
      { new: true }
    ).exec();
    
    if (!updatedItem) {
      throw new NotFoundException('Item not found');
    }
    return updatedItem;
  }

  async delete(id: string, userEmail: string): Promise<void> {
    await this.findById(id, userEmail); // This checks ownership
    await this.itemModel.findByIdAndDelete(id).exec();
  }

  async toggleComplete(id: string, userEmail: string): Promise<Item> {
    const item = await this.findById(id, userEmail);
    const updatedItem = await this.itemModel.findByIdAndUpdate(
      id,
      { completed: !item.completed },
      { new: true }
    ).exec();
    
    if (!updatedItem) {
      throw new NotFoundException('Item not found');
    }
    return updatedItem;
  }
}
