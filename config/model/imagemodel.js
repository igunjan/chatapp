var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var  ObjectId = Schema.ObjectId;

 var Image  = new Schema({
         ObjectId: ObjectId,
        userid: { type :String},
        url: { type :String}
});

module.exports = mongoose.model('Image',Image);