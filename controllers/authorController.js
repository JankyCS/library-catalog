var Author =require('../models/author');

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

//Display detail page for specific author

module.exports.author_detail = function(req,res)
{
    res.send(": Author detail: "+req.params.id);
}

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