module.exports = (req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
};
