var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        //Note to self, from Mozilla
        /* Represents specific instances of a model in the database.
        For example, a book might use this to represent its author
        object. This will actually contain the unique ID (_id) for
        the specified object. We can use the populate() method to
        pull in the associated information when needed. */
        author: {type: Schema.Types.ObjectId, ref: 'Author', required: true },

        title: {type: String, required: true, max:100},
        summary: {type: String, required: true},
        isbn: {type: String, required: true},

        //Array of Genres
        genre: [{type: Schema.Types.ObjectId,ref:'Genre'}]
    }
);

BookSchema.virtual('url').get(
    function()
    {
        return '/catalog/book/'+this._id;
    }
);

module.exports = mongoose.model('Book',BookSchema);