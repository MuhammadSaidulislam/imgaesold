const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    name: String,
    price: Number,
    count: Number,
  },
  { timestamps: true }
);

let CartItem;
if (mongoose.models.CartItem) {
  CartItem = mongoose.model("CartItem");
} else {
  CartItem = mongoose.model("CartItem", CartItemSchema);
}

const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ], // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//const Order = mongoose.model("Order", OrderSchema);

let Order;
if (mongoose.models.Order) {
  Order = mongoose.model("Order");
} else {
  Order = mongoose.model("Order", OrderSchema);
}

module.exports = { Order, CartItem };
