require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Content = require('./models/content.model.js');
const contentRoute = require('./routes/content.route.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/contents', contentRoute);

app.get('/', (req, res) => {
  res.send('Hello from Node API: Server');
});

app.get('/signup', (req, res) => {
  res.render('signup')
})
app.get('/', (req, res) => {
  res.render('login')
})


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/contents', contentRoute);


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/contents', contentRoute);

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/api/content', contentRoute);



mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });
