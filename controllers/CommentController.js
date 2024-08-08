// controllers/commentController.js
const Comment = require('../models/Comment');
const User = require('../models/User');

// Add a comment
exports.addComment = async (req, res) => {
  const { userId, text } = req.body;

  try {
    const comment = new Comment({ userId, text });
    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment', details: error.message });
  }
};

// Get comments for a user
exports.getCommentsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const comments = await Comment.find({ userId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments', details: error.message });
  }
};
