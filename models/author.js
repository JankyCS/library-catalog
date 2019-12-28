var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment =require('moment');
var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max:100},
        last_name: {type:String, required: true, max:100},
        date_of_birth: {type:Date},
        date_of_death:{type:Date},
    }
);

//Virtual variable for name

AuthorSchema.virtual('name').get(
    function()
    {
        var fullname='';
        if(this.first_name && this.last_name)
        {
            fullname=this.last_name+', '+this.first_name;
        }
        return fullname;
    }
);

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {

    if(this.date_of_death===null && null===this.dater_of_birth)
    {
        return "Date of birth unknown - Date of Death Unknown";
    }
    else if(this.date_of_death===null)
    {
        return this.birthDateFormatted+" - Date of Death Unknown";
    }
    else if(this.date_of_birth===null)
    {
        return "Date of birth unknown - "+this.deathDateFormatted;
    }
    else
    {
        return this.birthDateFormatted +"-"+ this.deathDateFormatted
    }
 // return null===this.date_of_death && null===this.dater_of_birth ? : "Date of birth unkown - Date of Death Unknown";
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for author's URL
AuthorSchema
.virtual('birthDateFormatted')
.get(function () {

    //ternary function, if date of brith doesnt exist do not format. Instead return empty string
    return this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '';
});

AuthorSchema
.virtual('deathDateFormatted')
.get(function () {
    //ternary function, if date of brith doesnt exist do not format. Instead return empty string
    return this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : '';
});

module.exports = mongoose.model('Author', AuthorSchema);