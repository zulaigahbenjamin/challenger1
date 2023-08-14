const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./api/config/index');


app.use(bodyParser.json());
app.use(express.static('static'));

let users = [];
let books = [];
let bookAuthors = [];
let orders = [];
// Home Page
app.get('/', (req, res) => {
  const routes = [
    { path: '/index.html', description: 'This is the home page' },
    { path: '/users', description: 'Display a list of users' },
    { path: '/user/:id', description: 'Display a single user by ID' },
    { path: '/user/:id', description: 'Update user\'s record' },
    { path: '/user/:id', description: 'Modify a user\'s record partially' },
    { path: '/register', description: 'Register a new user' },
    { path: '/user/:id', description: 'Delete a user by ID' },
    { path: '/book', description: 'Add a new book' },
    { path: '/books', description: 'Get all books' },
    { path: '/bookAuthor', description: 'Add a new book author' },
    { path: '/bookAuthors', description: 'Get all book authors' },
    { path: '/order', description: 'Place a new order' },
    { path: '/orders', description: 'Get all orders' },
  ];
  res.json(routes);
});


app.get('/users', (req, res) => {
  res.json(users); // Sending the users array as JSON response
});


// Retrieve a single user by ID
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.json(user);
  }
});
db.query('SELECT * FROM Users', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
  } else {
    console.log('Fetched users:', results);
  }
});



// Update user's record
app.put('/user/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body; // New user data to update

  // Update the user's record in the database
  db.query('UPDATE Users SET ? WHERE id = ?' [2], [updatedUserData, userId], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User record updated successfully' });
      }
    }
  });
});
app.patch('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: ' modified successfully' });
});


// Register a new user
app.post('/register', (req, res) => {
  const newUser = req.body; // New user data from the request body

  // Insert the new user into the database
  db.query('INSERT INTO Users SET ?', newUser, (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'An error occurred while registering the user.' });
    } else {
      res.json({ message: 'User registered successfully' });
    }
  });
});




// Delete a user
app.delete('/user/:id', (req, res) => {
  const userId = req.params.id; // Get the user ID from the request parameters

  // Delete the user from the database
  db.query('DELETE FROM Users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    }
  });
});


// Add a new book
app.post('/book', (req, res) => {
  const newBook = req.body; // Get the new book data from the request body

  // Insert the new book into the database
  db.query('INSERT INTO Books SET ?', newBook, (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      res.status(500).json({ error: 'An error occurred while adding the book.' });
    } else {
      res.json({ message: 'Book added successfully' });
    }
  });
});


// Get all books
app.get('/books', (req, res) => {
  // Fetch all books from the database
  db.query('SELECT * FROM Books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ error: 'An error occurred while fetching books.' });
    } else {
      res.json(results); // Send the fetched books as a JSON response
    }
  });
});




// Add a new book author
app.post('/bookAuthor', (req, res) => {
  const newAuthor = req.body;

  // Insert the new author into the database
  db.query('INSERT INTO BookAuthors SET ?', newAuthor, (err, result) => {
    if (err) {
      console.error('Error adding book author:', err);
      res.status(500).json({ error: 'An error occurred while adding the book author.' });
    } else {
      res.json({ message: 'Book author added successfully' });
    }
  });
});




// Get all book authors
app.get('/bookAuthors', (req, res) => {
  // Retrieve all book authors from the database
  db.query('SELECT * FROM BookAuthors', (err, results) => {
    if (err) {
      console.error('Error fetching book authors:', err);
      res.status(500).json({ error: 'An error occurred while fetching book authors.' });
    } else {
      res.json(results); // Send the fetched book authors as a JSON response
    }
  });
});




// Place a new order
app.post('/order', (req, res) => {
  const newOrder = req.body; // Assuming the request body contains order information
  // Insert the new order into the database
  db.query('INSERT INTO Orders SET ?', newOrder, (err, result) => {
    if (err) {
      console.error('Error placing order:', err);
      res.status(500).json({ error: 'An error occurred while placing the order.' });
    } else {
      res.json({ message: 'Order placed successfully' });
    }
  });
});



// Get all books
app.get('/books', (req, res) => {
  // Fetch all books from the database
  db.query('SELECT * FROM Books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ error: 'An error occurred while fetching books.' });
    } else {
      res.json(results); // Send the fetched books as a JSON response
    }
  });
});





db.query('SELECT * FROM Users', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
  } else {
    users = results;
    startServer();
  }
});

function startServer() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

}