function getParamVariable(req, paramName, defaultParam, acceptedParams) {
  const param = req.query[paramName];
  if (!param) {
    return defaultParam;
  }

  if (acceptedParams.findIndex((p) => p === param) === -1) {
    const e = new Error();
    e.data = `${param} not a valid value`;
    e.code = 400;
    throw e;
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

module.exports = { getParamVariable, sendError };
