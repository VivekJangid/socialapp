const express = require('express');
const connectDb = require('./config/db');

const app = express();

// Connect DB
connectDb();
app.use(express.json({ extended: true })); //MiddleWare to Parse Json data

app.get('/', (req, res) => {
  res.send('Hello WOrld!');
});

//Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Running App on localhost:${PORT}`));
