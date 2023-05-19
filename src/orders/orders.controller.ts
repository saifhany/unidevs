import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DeliveryOrdersService } from './orders.service';
import { DeliveryOrder } from 'src/shared/types/orders';
import { AssignDeliveryOrderDto, CreateDeliveryOrderDto ,DeleteDeliveryOrderDto,UpdateDeliveryOrderDto } from './dto/create-order.dto';

@Controller('delivery-orders')
export class DeliveryOrdersController {
  constructor(private readonly deliveryOrdersService: DeliveryOrdersService) {}

  @Post('create')
  async createOrder(@Body() order: CreateDeliveryOrderDto): Promise<DeliveryOrder> {
    return this.deliveryOrdersService.createOrder(order);
  }


  @Get('all/')
  async getAllOrdersByStatus(@Query('status') status: string): Promise<any> {
    return this.deliveryOrdersService.getAllOrdersByStatus(status);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<DeliveryOrder | null> {
    return this.deliveryOrdersService.getOrderById(id);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() order: UpdateDeliveryOrderDto,
  ): Promise<DeliveryOrder | null> {
    return this.deliveryOrdersService.updateOrder(id, order);
  }

  @Delete(':id')
  async deleteOrder(@Body() deletedOrder:DeleteDeliveryOrderDto): Promise<boolean> {
    return this.deliveryOrdersService.deleteOrder(deletedOrder);
  }

  @Post('/youDeliverThis')
  async getBestOrderToDriver(
    @Body() order: AssignDeliveryOrderDto,
  ): Promise<void> {
    console.log(order.latitude, order.longitude, order.driverName);
     this.deliveryOrdersService.getBestOrderForDriver(order.latitude, order.longitude,order.driverName);
  }
}