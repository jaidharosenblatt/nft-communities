const crypto = require("crypto");

function verifyKey(req, res, next) {
  const hashBuffer = req.headers["hash"];
  const ivBuffer = req.headers["iv"];

  if (process.env.DISABLE_KEY === "true") {
    return next();
  }
  if (!hashBuffer || !ivBuffer) {
    res.sendStatus(400);
  } else {
    const hash = Buffer.from(hashBuffer, "hex");
    const iv = Buffer.from(ivBuffer, "hex");
    const algorithm = "aes-256-ctr";
    const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash, "hex")), decipher.final()]);

    const thirtySeconds = 30 * 1000;
    const date = new Date(decrypted.toString());
    const now = new Date();
    const isValid = now - date < thirtySeconds;
    if (isValid) {
      next();
    } else {
      res.status(403).send("Invalid API key");
    }
  }
}

module.exports = { verifyKey };
