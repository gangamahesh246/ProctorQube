const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors')
const connectDB = require("./config/database")
connectDB();
const exam = require('./routers/ExamRouter');
const question = require('./routers/questionRoute');
const student = require('./routers/studentsRoute');
const profile = require('./routers/profileRouter');
const login = require('./routers/LoginRouter');

const app = express()
const server = createServer(app)

app.use(cors())
app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));


app.use('/', exam);
app.use('/', question);
app.use('/', student);
app.use('/', profile);
app.use('/', login);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  })
})

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
