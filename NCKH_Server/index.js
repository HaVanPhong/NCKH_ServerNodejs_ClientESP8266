const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routers");
const connecDB = require("./Database/database");
const configuration = require("./configs/configuration");
 
const WebSocket = require("ws");
const { WebSocketServer } = require("ws");

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
  ws.on("message", function message(data) {
    console.log("Server nhận được: " + data);
    try {
      wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
        let str= data.toString().split(";");
        let idEquip= str[0];
        let led= str[1];
        let status= str[2];
        if (idEquip.length>=10 && (status==="1"||status==="0") )
        (async () => {
          await EquipmentModel.findOneAndUpdate({ _id: idEquip }, {status: Number(status)});
        })();
      }
    });
    } catch (error) {
      console.log("err: "+ error.message)
    }
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

 