const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true
  },
  roomType: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'maintenance'],
    default: 'available'
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
