
const mongoose = require('mongoose')

const breedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country:{
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

module.exports = mongoose.model('Breed', breedSchema)
