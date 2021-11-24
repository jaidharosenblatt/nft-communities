function getParamVariable(req, paramName, defaultParam, acceptedParams) {
  const param = req.query[paramName];
  if (!param) {
    return defaultParam;
  }

  if (acceptedParams.findIndex((p) => p === param) === -1) {
    throw new ServerError(400, `${param} not a valid value`);
  }
  return param;
}

function sendError(e, res) {
  console.log(e);
  if (process.env.DEBUG === "TRUE") {
    console.error(e.code, e.data);
  }
  const code = e.code || 500;
  res.status(code);
  res.send(e.data);
}

class ServerError extends Error {
  constructor(code, data) {
    super();
    this.code = code;
    this.data = data;
  }
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

module.exports = { ServerError, getParamVariable, sendError, isValidDate };
