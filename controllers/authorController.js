var Author =require('../models/author');
var async = require('async');
var Book = require('../models/book');

//display author list
// Display list of all Authors.
module.exports.author_list = function(req, res, next) {

  Author.find()
    .sort([['last_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });

};

// Display detail page for a specific Author.
exports.author_detail = function(req, res, next) {

    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
              .exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    });

};

module.exports.author_create_get = function(req,res)
{
    res.send("TBI: author create GET");
}

module.exports.author_create_post = function(req,res)
{
    res.send("TBI: author create POST");
}

module.exports.author_delete_get = function(req,res)
{
    res.send("TBI: author delete GET");
}

module.exports.author_delete_post = function(req,res)
{
    res.send("TBI: author delete POST");
}

module.exports.author_update_get = function(req, res)
{
    res.send("TBI: Author update GET");
}

module.exports.author_update_post = function(req, res)
{
    res.send("TBI: Author update POST");
}