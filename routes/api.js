/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

//Andrew - add required
const mongoose = require('mongoose');
const BookModel = require('../models').Book;

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      BookModel.find(function(err, data) {
        if(err || !data) {
          console.log({error: err});
          return res.json({error: err});
        }
        else {
          return res.json(data);
        }
      });
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title

      if(!title) {
        // console.log('missing required field title');
        return res.json('missing required field title');
      }

      //Create a new issue
      const newBook = new BookModel({
        title: title || "",
        commentcount: 0,
        comments: []
      });

      newBook.save(function(err, data) {
        if(err || !data) {
          // console.log({error: err});
          return res.json({error: err})
        }
        else {
          // console.log({_id: data._id, title: data.title});
          return res.json({_id: data._id, title: data.title});
        }
      });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'

      BookModel.deleteMany(function(err, data) {
        if(err) {
          console.log({error: err});
          return res.json({error: err});
        }
        else {
          console.log('complete delete successful');
          return res.json('complete delete successful');
        }
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      BookModel.findById(bookid, function(err, data) {
        if(err || !data) {
          console.log('no book exists');
          return res.json('no book exists');
        }
        else {
          return res.json(data);
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if(!comment) {
        // console.log('missing required field comment');
        return res.json('missing required field comment');
      }

      BookModel.findById(bookid, function(err, data) {
        if(err || !data) {
          // console.log('no book exists');
          return res.json('no book exists');
        }
        else {
          //Save comment
          data.commentcount = data.commentcount + 1;
          data.comments.push(comment);

          data.save(function(err, data) {
            if(err || !data) {
              // console.log({error: err});
              return res.json({error: err});
            }
            else {
              // console.log(data);
              return res.json(data);
            }
          });
        }
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'

      BookModel.findByIdAndRemove(bookid, function(err, data) {
        if(err || !data) {
          console.log('no book exists');
          return res.json('no book exists');
        }
        else {
          console.log('delete successful');
          return res.json('delete successful');
        }
      })
    });
  
};
