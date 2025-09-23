import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import * as process from 'process';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/intern-assessment'),
    AuthModule,
    ItemsModule,
  ],
})
export class AppModule {}