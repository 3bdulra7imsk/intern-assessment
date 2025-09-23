import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async create(name: string, description: string): Promise<Item> {
    const newItem = new this.itemModel({ name, description });
    return newItem.save();
  }
}
