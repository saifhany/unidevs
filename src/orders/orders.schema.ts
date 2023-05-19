import * as mongoose from 'mongoose';
import { Status } from 'src/shared/types/orders';
export const OrderSchema = new mongoose.Schema({
    // _id: { type: String, required: true },
    customerName: { type: String, required: true },
    items: [{ type: String }],
    pickupLocation: {
      type: { 
          type: String, 
          enum: ['Point'] ,
          default: 'Point'
      },
      coordinates: { 
          type: [Number] 
      }
  },
    deliveryLocation: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
    status: {
      type: String,
      default: 'pending',
      enum: Object.values(Status)
    },
    assignedTo: { type: String },
    createdAt: { type: Date }
  });

  OrderSchema.index({ pickupLocation: '2dsphere' });