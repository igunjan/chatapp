var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var  ObjectId = Schema.ObjectId;


 var User  = new Schema({
    ObjectId: ObjectId,
    username: { type: String},
    description: { type: String},
    age: { type: String },
    address: { type: String }, 
    profileimg :{type: String},
    status : {type:Boolean}  
    },
     { timestamps: { createdAt: 'created_at' } 
    });
    
module.exports = mongoose.model('User',User);