const express = require('express'); // requires the express
const routes = require('./routes'); // sets the routes for the server

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
