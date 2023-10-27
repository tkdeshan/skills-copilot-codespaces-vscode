// Create web server
var express = require('express');
var router = express.Router();

// Import mongoose
var mongoose = require('mongoose');

// Import model
var Comment = require('../models/Comment.js');

// GET /comments
// GET /comments?post=post_id
router.get('/', function(req, res, next) {
  if (req.query.post) {
    Comment.find({post: req.query.post}, function(err, comments) {
      if (err) return next(err);
      res.json(comments);
    });
  } else {
    Comment.find(function(err, comments) {
      if (err) return next(err);
      res.json(comments);
    });
  }
});

// POST /comments
router.post('/', function(req, res, next) {
  Comment.create(req.body, function(err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

// GET /comments/:id
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

// PUT /comments/:id
router.put('/:id', function(req, res, next) {
  Comment.findByIdAndUpdate(req.params.id, req.body, function(err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

// DELETE /comments/:id
router.delete('/:id', function(req, res, next) {
  Comment.findByIdAndRemove(req.params.id, req.body, function(err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

module.exports = router;
