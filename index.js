// index.js
// the backbone of the backend
// =============================================================================
const app = require('./app.js');

app.set('port', process.env.PORT || 61338);

const server = app.listen(app.get('port'), () => {
  console.log(`server listening on port ${server.address().port} `);
});
