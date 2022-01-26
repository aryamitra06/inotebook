const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')


connectToMongo();
const app = express();
app.use(cors())
// Middleware to use req.body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(5000, () => {
  console.log('Localhost running at port 5000')
})