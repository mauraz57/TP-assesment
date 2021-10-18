import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const Basket = ({gamesArr, setGamesArr, favsArr, setFavsArr }) => {

  const [newGames, newSetGames] = useState(gamesArr)

  useEffect( () => {
    const fetchGames = async () => {
      const result = await fetch('https://api.twitch.tv/helix/games/top',{
        method:"GET",
        headers: {
          "Authorization":'Bearer 4sitk5yf4x1yni3x5bjwuvdigzmnt6',
          "Client-Id":'42py23jerxxw1q117hxbqajyfu8bzt'}
      }).then(response => response.json())
      .catch(error => console.log(error.message))

      result.data.forEach(game => {
        let realUrl = game.box_art_url.replace('{width}','300').replace('{height}','300')
        game.box_art_url = realUrl
      })
      newSetGames(result.data)
      setGamesArr(newGames)
    }
    fetchGames()
  },[])
  
  const addToFav = (e) => {
    let gameName = e.target.parentElement.childNodes[1].innerHTML
    let filtered = newGames.filter(item => item.name == gameName)
    let favorito = {...filtered[0]}
    favorito.id = Math.floor((Math.random()*999999999)+99)
    setFavsArr(favsArr.concat(favorito))
    Axios.post("http://localhost:3001/insert",
    {
      imgLink: favorito.box_art_url,
      gameId: favorito.id,
      gameName: favorito.name
    })

  }

  return(
    <section className="basket">
      <h1>selecciona tus favoritos</h1>
      <div className="gridArea1">
        {newGames.map(({_id, name, box_art_url}) => {
          return (
            <div className="card" key={_id}>
              <img src={box_art_url} alt={`image for the game ${name}`} />
              <h3>{name}</h3>
              {<button onClick={addToFav}>Me encanta!</button>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Basket