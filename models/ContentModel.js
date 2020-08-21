const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref : "user"
    },
    name:{
        type:String,
    },
    image:{
        type:String,
    },

    title:{
        type:String,
        requiredt:true,
    },
    // subHeading: {
    //     type: String,
    //     required: true,
    //   },
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Public",
      },
      commentAllowance: {
        type: Boolean,
        default: true,
      },
      comments:[{
        commentBody:{
          type:String,
        },
        commentingUser:{
          type: Schema.Types.ObjectId,
          ref:'user'    
        },
        commentDate:{
          type:Date,
          default:Date.now(),
        }
      }],
      date: {
        type: Date,
        default: Date.now(),
      },
});

module.exports = Content = mongoose.model("Content", ContentSchema);