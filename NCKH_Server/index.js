const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routers");
const connecDB = require("./Database/database");
const configuration = require("./configs/configuration");

const http = require("http");
const WebSocket = require("ws");
const { WebSocketServer } = require("ws");
const server = http.createServer(app);

const wss = new WebSocketServer({ port:8080 });

const EquipmentModel = require("./models/equipment.model");

app.use(cors());
app.use(express.json());
app.use(helmet.xssFilter());

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

wss.on("connection", function connection(ws) {
  console.log("co ng ket noi");
  ws.on("message", function message(data, isBinary) {
    console.log("Server nhận được: " + data);
    let equip = JSON.parse(data);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
        (async () => {
          await EquipmentModel.findOneAndUpdate({ _id: equip._id }, equip);
        })();
      }
    });
  });
});

app.get("/ok", (req, res) => {
  res.render("index");
});

connecDB();
router(app);

app.listen(process.env.PORT || 8082, () => {
  console.log("server is running at port: " + (process.env.PORT || 8082));
});
