const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    text:{
        type:String,
        default:''
    },

    image:{
        type:String,
        default:''
    },

   likes:[{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    username:{
        type:String
    }
}],

    comments:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        username:{
            type:String
        },
        text:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now
        }
    }],

    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);