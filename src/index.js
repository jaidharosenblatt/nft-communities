const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { everyThirtyMins, everyDay } = require("./cron");

require("./db/mongoose");
const projectsRouter = require("./routers/projects");
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(projectsRouter);
cron.schedule("*/30 * * * *", everyThirtyMins);
cron.schedule("0 8 * * *", everyDay);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
