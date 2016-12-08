var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var  ObjectId = Schema.ObjectId;

 var Video  = new Schema({
         ObjectId: ObjectId,
         type: {type: String},
        userid: { type :String},
        url: { type :String}
});

module.exports = mongoose.model('Video',Video);