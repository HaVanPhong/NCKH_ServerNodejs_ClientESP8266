const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const areaRouter = require("./area.router");
const equimentRouter= require("./equipment.router");
const errorHandle = require("../middlewares/errorHandle");
const historyRouter= require("./history.router");

module.exports = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/areas", areaRouter);
  app.use("/api/equipments", equimentRouter);
  app.use("/api/histories", historyRouter);
  app.use(errorHandle);
};
