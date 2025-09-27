import { IsString, IsOptional, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @MinLength(1, { message: 'Name must not be empty' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}