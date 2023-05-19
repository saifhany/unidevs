import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { DeliveryOrdersController } from './orders.controller';
import { DeliveryOrdersService } from './orders.service';
import { OrderSchema } from './orders.schema';

@Module({
  controllers: [DeliveryOrdersController],
  providers: [DeliveryOrdersService],
  imports: [
  MongooseModule.forFeature([{ name: 'DeliveryOrder', schema: OrderSchema }]),
  ]
})
export class OrdersModule {}
