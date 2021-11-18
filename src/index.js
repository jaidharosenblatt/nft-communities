const express = require("express");
const cors = require("cors");

require("./db/mongoose");

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
