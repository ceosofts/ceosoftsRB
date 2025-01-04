require('module-alias/register');
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 20) {
  console.log('Please upgrade your node.js version at least 20 or greater. 👌\n ');
  process.exit();
}

// import environmental variables from our variables.env file
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// นำเข้าและลงทะเบียน schema
require('./models/Ceosofts');
require('./models/CeosoftsPassword');

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Use authRoutes for /api/auth
app.use('/api/auth', authRoutes);

// เส้นทางพื้นฐาน (root route)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Express running → On PORT : ${PORT}`);
});
