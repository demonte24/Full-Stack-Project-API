const mongoose = require('mongoose')

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
 },{
   timestamp: true
})

module.exports = mongoose.model('Dog', dogSchema)
