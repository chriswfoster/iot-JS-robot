const http = require("http")
var Gpio = require("onoff").Gpio
var LEFTR = new Gpio(4, "out") // use GPIO pin 4, change the 4 to respecify the pin number
var LEFTF = new Gpio(17, "out")
var RIGHTF = new Gpio(27, "out")
var RIGHTR = new Gpio(22, "out")
//let blinkInterval = setInterval(blinkLED, 250); // this sets the blink interval to 250ms
const express = require("express")
const cors = require("cors")
const { json } = require("body-parser")
const oi = require("socket.io-client")
const socketIo = require("socket.io")
LEFTR.writeSync(1)
LEFTF.writeSync(1)
RIGHTR.writeSync(1)
RIGHTF.writeSync(1)

const port =80 

const app = express()
app.use(json())
app.use(cors())

const server = http.createServer(app)
const io = socketIo(server)
app.use(express.static(`${__dirname}/../build`))  ///////// I may host from this server someday.

io.on("connection", socket => {
  console.log("A user has connected to the system.")

  socket.on("stop", halt => {
 LEFTR.writeSync(1) & LEFTF.writeSync(1) & RIGHTR.writeSync(1) & RIGHTF.writeSync(1)    
io.sockets.emit("stop", "STOPPED!")
  })
  socket.on("move", command => {
    io.sockets.emit("move", "moving...")
    console.log(command)
     switch(command){
     case 'w':
     LEFTF.writeSync(0) & RIGHTF.writeSync(0)
     break;
     case 'd':
     LEFTF.writeSync(0) & RIGHTR.writeSync(0)
     break;
     case 'a':
     LEFTR.writeSync(0) & RIGHTF.writeSync(0)
     break;
     case 's':
     LEFTR.writeSync(0) & RIGHTR.writeSync(0)
     break;
     default:
     LEFTR.writeSync(1) & LEFTF.writeSync(1) & RIGHTR.writeSync(1) & RIGHTF.writeSync(1)
     }
  })
})



console.log("Logging after socket fired off.")


server.listen(port, () => console.log(`Listening on port ${port}`))

