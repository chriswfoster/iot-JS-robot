var socket = io("/")

function keyDownHandler(e) {
  console.log(e.key)
  console.log(io)
  switch (e.key) {
    case "w":
      document.getElementById("display").innerHTML = "Forward!"
      socket.emit("move", e.key)
      break
    case "a":
      document.getElementById("display").innerHTML = "Turn Left!"
      socket.emit("move", e.key)
      break
    case "d":
      document.getElementById("display").innerHTML = "Turn Right!"
      socket.emit("move", e.key)
      break
    case "s":
      document.getElementById("display").innerHTML = "Reverse!"
      socket.emit("move", e.key)
      break
    default:
      document.getElementById("display").innerHTML = ""
  }
}

function keyUpHandler() {
  document.getElementById("display").innerHTML = ""
}
