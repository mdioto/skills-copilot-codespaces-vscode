// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comments = require('../models/comments');

// Create router
const commentRouter = express.Router();

// Use body parser
commentRouter.use(bodyParser.json());

// Configure router
commentRouter.route('/')
    .get((req, res, next) => {
        Comments.find({})
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        Comments.create(req.body)
            .then((comment) => {
                console.log('Comment created', comment);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })

    .delete((req, res, next) => {
        Comments.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    });