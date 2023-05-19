import { CreateDeliveryOrderDto ,DeleteDeliveryOrderDto,UpdateDeliveryOrderDto } from './dto/create-order.dto';
import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeliveryOrder, Status } from 'src/shared/types/orders';
import { GeoJsonPoint } from 'mongoose-geojson-schemas';
@Injectable()
export class DeliveryOrdersService {
  constructor(
    @InjectModel('DeliveryOrder')
    private readonly deliveryOrderModel: Model<DeliveryOrder>,
  ) {
   
  }

  async createOrder(order: CreateDeliveryOrderDto): Promise<DeliveryOrder> {
    const createdOrder = new this.deliveryOrderModel(order);
    return createdOrder.save();
  }

  async getAllOrdersByStatus( status: string): Promise<any> {
      const filter = status === undefined  ? {} : {status:status as string}
    const orders = await this.deliveryOrderModel.find(filter).exec();
    return orders
  }

  async getOrderById(id: string): Promise<DeliveryOrder | null> {
    return this.deliveryOrderModel.findById(id).exec();
  }

  async getAllOrders(): Promise<DeliveryOrder[]> {
    return this.deliveryOrderModel.find().exec();
  }

  async updateOrder(
    id: string,
    order: UpdateDeliveryOrderDto,
  ): Promise<DeliveryOrder | null> {
    return this.deliveryOrderModel.findByIdAndUpdate(id, order, {
      new: true,
    });
  }

  async deleteOrder(deletedOrder: DeleteDeliveryOrderDto): Promise<boolean> {
    const result = await this.deliveryOrderModel.deleteOne({ _id: deletedOrder.id }).exec();
    return result.deletedCount === 1;
  }

  async getBestOrderForDriver(
     latitude: number,
     longitude: number,
     driverName: string,
  ): Promise<void> {
    console.log(latitude, longitude, driverName);
    const MAX_DISTANCE_IN_METERS = 100000;
    const DISTANCE_IN_KM = 1;    
    const orders = await this.deliveryOrderModel
      .findOne({
        status:Status.pending,
        pickupLocation: {
          $near: {
            $maxDistance: DISTANCE_IN_KM * MAX_DISTANCE_IN_METERS,
            $geometry: {
              type: 'Point',
              coordinates: [latitude, longitude],
            },
          },
        },
      }).exec();
      console.log(orders , 'order')
      if(orders){
        console.log(orders , 'order')         
        orders.status = Status.assigned; 
        orders.assignedTo = driverName;
        orders.deliveryLocation = { type: "Point", coordinates: [latitude, longitude] } as GeoJsonPoint;
        await  orders.save();
      }
    }
    }


