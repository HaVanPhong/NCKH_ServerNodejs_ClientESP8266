const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routers");
const connecDB = require("./Database/database");
const configuration = require("./configs/configuration");

const WebSocket = require("ws");
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

const EquipmentModel = require("./models/equipment.model");
const HistoryModel = require("./models/history.model");
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
          let str = data.toString().split(";");
          let idEquip = str[0];
          let led = str[1];
          let status = str[2];
          let idArea = str[3];
          console.log("id area: " + idArea);
          if (led?.length < 2) {
            led = "0" + led;
          }
          data = idArea + ";" + led + ";" + status;
          client.send(data);
          if (idEquip.length >= 10 && (status === "1" || status === "0"))
            (async () => {
              let equip = await EquipmentModel.findById(idEquip);
              let equipUpdate={
                status: Number(status),
              };
              if (status==="0" && equip.status===1){
                let t_on= equip.time_on + (Math.round(new Date().getTime()- new Date(equip.updatedAt).getTime())/(1000*60*60)).toFixed(2);
                equipUpdate.time_on= t_on;
              }
              await EquipmentModel.findOneAndUpdate(
                { _id: idEquip },
                equipUpdate
              );
              
              
              let his = {
                status: status,
                equipment: equip._id,
              };
              await HistoryModel.create(his);
            })();
        }
      });
    } catch (error) {
      console.log("err: " + error.message);
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
