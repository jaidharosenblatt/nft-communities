const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { verifyKey } = require("./api/auth");

const { runCron } = require("./cron");

if (process.env.MONGO_URL) {
  require("./db/mongoose");
} else {
  console.error(
    "Missing connection string. Please create a .env file following the README and use `npm run dev`"
  );
}
const projectsRouter = require("./routers/projects");
const trendsRouter = require("./routers/trends");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.all("*", verifyKey);

app.use(express.json());
app.use(projectsRouter, trendsRouter);
// twice a day
cron.schedule("0 9,21 * * *", runCron);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
