const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  state: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  archived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Agency", agencySchema);
