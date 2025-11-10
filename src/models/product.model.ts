import { Schema, model } from "mongoose";
import { required } from "zod/v4/core/util.cjs";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const Product = model("Product", productSchema);
