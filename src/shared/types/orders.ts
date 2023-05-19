import { Document } from 'mongoose';

export enum Status {
    pending = 'pending',
    assigned = 'assigned',
    created = 'created',
    delivered = 'delivered',
}

export interface DeliveryOrder extends Document {
  // _id: string;
  customerName: string;
  items: string[];
  pickupLocation: [number, number];
  deliveryLocation: [number, number];
  status: Status;
  assignedTo?: string;
  createdAt?: Date;
}