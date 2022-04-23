const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const { WebSocketServer } = require("ws");
const server = http.createServer(app);

const wss = new WebSocketServer({ port: 8080 });

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data, isBinary) {
    console.log("co ng ket noi");
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

// var ws = new WebSocket.Server({
//     server
// });
// ws.on('connection',  socket =>{
//     console.log("co thang at o nao do ket noi");
//     var m;
//     socket.on('message', function(message) {
//         console.log('received: %s', message);
//         m= message.toString("utf-8");
//         console.log("trong mess: ", m)
//         socket.send(m)
//     });

//     setInterval(() => {
//         socket.send("3 giay 1 lan")
//     }, 3000);

// });

app.get("/ok", (req, res) => {
  res.render("index");
});

server.listen(8082, () => {
  console.log("server is running");
});
