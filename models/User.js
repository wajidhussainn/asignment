const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please add a name']
    },
    cell:{
        type: String,
        required:[true, 'Please add a cell#']
    },
    age:{
        type: Number,
        required:[true, 'Please add age']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
      },
      isDeleted:{
        type:Boolean,
        default: false
      },
      createdAt:{
        type: Date,
        default: Date.now()
      }
});
module.exports = mongoose.model('User', UserSchema);