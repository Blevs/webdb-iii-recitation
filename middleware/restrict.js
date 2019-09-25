module.exports = (req, res, next) => {
  if (req.headers.authorization === "osdkjfh28i376490d81094768bn0c12") {
    next();
  } else {
    res.status(400).end();
  }
};
