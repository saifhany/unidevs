// Import necessary modules and types
import { IsString, IsNotEmpty, ArrayNotEmpty, ArrayMinSize, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from 'src/shared/types/orders';
import { PartialType } from '@nestjs/mapped-types';

// Define a DTO for creating a new Delivery Order
export class CreateDeliveryOrderDto {
  @IsString()
  customerName: string;

  @IsArray()
  @ArrayMinSize(1)
  items: string[];

  @IsArray()
  @ArrayMinSize(2)
  @IsNotEmpty()
  pickupLocation: [number, number];

  // @IsArray()
  // @ArrayMinSize(2)
  // @IsNotEmpty()
  // deliveryLocation?: [number, number];

  @IsNotEmpty()
  status: Status = Status.created;

  assignedTo?: string;

  createdAt?: Date;
}

// Define a DTO for updating a Delivery Order
export class UpdateDeliveryOrderDto extends PartialType(CreateDeliveryOrderDto) {
  @IsString()
  id: string;
}

// Define a DTO for deleting a Delivery Order
export class DeleteDeliveryOrderDto {
  @IsString()
  id: string
}

export class AssignDeliveryOrderDto {
  @IsString()
  driverName: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;
}