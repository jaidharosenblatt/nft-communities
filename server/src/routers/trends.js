const express = require("express");
const { updateAllProjectTrends } = require("../trends");

const router = new express.Router();

router.post("/trends/update", async (req, res) => {
  try {
    const status = await updateAllProjectTrends();
    res.send(status);
  } catch (e) {
    if (process.env.DEBUG === "TRUE") {
      console.error(e);
    }
    res.status(e.code);
    res.send(e.data);
  }
});

module.exports = router;
