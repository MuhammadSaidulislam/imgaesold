const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlenght: 32,
    },
    description: {
      type: String,
      required: true,
      maxlenght: 2000,
    },
    extra_small_price: {
      type: Number,
      trim: true,
      required: true,
    },
    small_price: {
      type: Number,
      trim: true,
      required: true,
    },
    medium_price: {
      type: Number,
      trim: true,
      required: true,
    },
    large_price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      require: false,
      type: Boolean,
    },
    bids: {
      type: [Object],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
