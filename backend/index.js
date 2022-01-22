const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express();

// Middleware to use req.body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(3000, () => {
  console.log('Localhost running at port 3000')
})