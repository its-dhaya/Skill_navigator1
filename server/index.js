// Required modules
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', // Ensure this matches your frontend URL
  credentials: true,
 // To handle cookies/authentication if needed
}));

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Signup route with password hashing
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, hashedPassword], (error, results) => {
      if (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'User created successfully' });
    });

  } catch (err) {
    console.error('Error hashing the password:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route with email and password validation
app.get('/api/login', async (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (error, results) => {
    if (error) {
      console.error('Database error during login:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error('Error during password comparison:', err);
      res.status(500).json({ error: 'Server error during password comparison' });
    }
  });
});




// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});