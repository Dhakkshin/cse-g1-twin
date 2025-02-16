const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
// const formRoutes = require('./routes/formRoutes');
// const ex6Routes = require('./routes/ex6Routes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON requests
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(session({
  secret: 'mySuperSecretKey123',
  resave: false,
  saveUninitialized: true
}));

// Routes
// app.use('/form', formRoutes);
// app.use('/ex6', ex6Routes);
app.use('/quiz', quizRoutes);

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});