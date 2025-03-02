const express = require('express')
//Hotel
const { listAllHotels } = require('./hotel/list')
const { createHotel } = require('./hotel/create')
const { updateHotel } = require('./hotel/update');
const { removeHotel } = require('./hotel/remove');

//Room
const { listRooms } = require('./room/list');
const { createRoom } = require('./room/create');
const { updateRoom } = require('./room/update');
const { removeRoom } = require('./room/remove');

//Customer
const { listAllCustomers } = require('./customer/list');
const { createCustomer } = require('./customer/create');
const { updateCustomer } = require('./customer/update');
const { removeCustomer } = require('./customer/remove');
//Staff
const { listStaff } = require('./staff/list');
const { createStaff } = require("./staff/create")
const { removeStaff } = require('./staff/remove');
const { updateStaff } = require('./staff/update');
//Booking
const { createBooking } = require('./booking/create');
const { listAllBookings } = require('./booking/list');
const { removeBooking } = require('./booking/remove');
const { updateBooking } = require('./booking/update');

const app = express()
const port = 3000

app.use(express.json())
//HOTEL
app.get('/hotel/list', listAllHotels)
app.post('/hotel', createHotel)
app.put('/hotel/:hotelId', updateHotel);
app.delete('/hotel/:hotelId', removeHotel);  //remove hotel also remove all room and staff
//ROOM
app.get('/hotel/:hotelId/room/', listRooms);
app.post('/hotel/:hotelId/room', createRoom);
app.put('/hotel/:hotelId/:roomId', updateRoom);
app.delete('/hotel/:hotelId/:roomId', removeRoom);
//Customer
app.get('/customer/list', listAllCustomers);
app.post('/customer', createCustomer);
app.put('/customer/:customerId', updateCustomer);
app.delete('/customer/:customerId', removeCustomer);
//Staff
app.get('/staff/list', listStaff); //(staff/list?hotelId=*hotelid*) for filtering staff by id
app.post('/staff', createStaff);
app.put('/staff/:staffId', updateStaff);
app.delete('/staff/:staffId', removeStaff);
//Booking
app.post('/booking', createBooking);
app.get('/booking/list', listAllBookings);
app.put('/booking/:bookingId', updateBooking)
app.delete('/booking/:bookingId', removeBooking);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})