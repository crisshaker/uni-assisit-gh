module.exports = (app) => {
  require('./auth')(app);
  require('./query')(app);
  require('./user')(app);
  require('./programme')(app);
};
