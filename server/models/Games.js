const mongoose = require('mongoose')


const GamesSchema = new mongoose.Schema({
  box_art_url:{
    type: String,
    required: true
  },
  id:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  }
})

const Games = mongoose.model("Games", GamesSchema)
module.exports = Games