import { model, Schema } from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "shipped", "delivered"], default: "pending" },
}, { timestamps: true });

export const Order = model("Order", orderSchema);
