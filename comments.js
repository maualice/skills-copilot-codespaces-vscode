// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();

// Add body parser middleware
app.use(bodyParser.json());

// Add CORS middleware
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create endpoint to get comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create endpoint to add comments
app.post('/posts/:id/comments', (req, res) => {
  // Generate random id
  const commentId = randomBytes(4).toString('hex');

  // Get comment content from request body
  const { content } = req.body;

  // Get comments from commentsByPostId object
  const comments = commentsByPostId[req.params.id] || [];

  // Add new comment to comments object
  comments.push({ id: commentId, content });

  // Store comments in commentsByPostId object
  commentsByPostId[req.params.id] = comments;

  // Send back the comments
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});





