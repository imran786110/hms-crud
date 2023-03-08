const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Room = require('./models/room');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('Your-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log('Failed to connect to database');
});

app.get('/', (req, res) => {
  res.send('Welcome to the hotel rooms API');
});

app.get('/rooms', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

app.post('/rooms', async (req, res) => {
  const room = new Room({
    roomNumber: req.body.roomNumber,
    roomType: req.body.roomType,
    price: req.body.price,
    status: req.body.status
  });
  const result = await room.save();
  res.json(result);
});

app.post('/rooms/new', async (req, res) => {
    const { roomNumber, roomType, price, status } = req.body;
  
    const room = new Room({
      roomNumber,
      roomType,
      price,
      status
    });
  
    try {
      const result = await room.save();
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });

app.delete('/rooms/:id', (req, res) => {
// Delete the room with the given ID
    Room.findByIdAndDelete(req.params.id, (err, room) => {
        if (err) {
        console.error(err);
        return res.status(500).send(err);
        }
        if (!room) {
        return res.status(404).send('Room not found');
        }
        res.send('Room deleted successfully');
    });
});
  
app.put('/rooms/:id', (req, res) => {
    Room.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, room) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      if (!room) {
        return res.status(404).send('Room not found');
      }
      res.send(room);
    });
  });

app.get('/rooms/:roomNumber', (req, res) => {
// Get the room with the given roomNumber
    Room.findOne({ roomNumber: req.params.roomNumber }, (err, room) => {
        if (err) {
        console.error(err);
        return res.status(500).send(err);
        }
        if (!room) {
        return res.status(404).send('Room not found');
        }
        res.send(room);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
