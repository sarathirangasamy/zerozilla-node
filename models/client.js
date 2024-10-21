const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  totalBill: { type: Number, required: true },
  archived: { type: Boolean, default: false,},
  createdAt: {type: Date,default: Date.now,},
});

module.exports = mongoose.model("Client", clientSchema);
