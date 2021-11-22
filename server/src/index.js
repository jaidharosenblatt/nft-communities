const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { everyThirtyMins, everyDay } = require("./cron");

if (process.env.MONGO_URL) {
  require("./db/mongoose");
} else {
  console.error(
    "Missing connection string. Please create a .env file following the README and use `npm run dev`"
  );
}
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
