const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Localhost running at port 3000')
})