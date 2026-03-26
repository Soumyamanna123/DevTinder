const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
    status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    
    default: "pending",
  },
});

module.exports = mongoose.model(
  "ConnectionRequestModel",
  connectionRequestSchema,
);
