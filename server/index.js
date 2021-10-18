const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const GamesModel = require('./models/Games')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://user-admin:O987654321@cluster0.lnxsq.mongodb.net/tp-assesment?retryWrites=true&w=majority', {
  useNewUrlParser: true
})

app.post('/insert', async (req, res) => {

  const name1 = req.body.gameName
  const id1 = req.body.gameId
  const link = req.body.imgLink

  const game = new GamesModel({
    box_art_url: link,
    id: id1,
    name: name1
  })

  try{
    await game.save()
    res.send('data saved')
  } catch(err){
    console.log(err)
  }
})

app.get('/read', async (req, res) => {
  GamesModel.find({}, (err, result) =>{
    if (err){
      res.send(err)
    }
    res.send(result)
  })
})

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  await GamesModel.findByIdAndRemove(id).exec()
  res.send('deleted')
})

app.put('/update', async (req, res) =>{
  const newName = req.body.newGameName
  const id = req.body.id

  try{
    await GamesModel.findById(id, (err, updatedGame) => {
      updatedGame.name = newName
      updatedGame.save()
      res.send('updated')
    }).clone()
  }catch(err){
    console.log(err)
  }
})

app.listen(3001, () =>{
  console.log('server working on port 3001')
})