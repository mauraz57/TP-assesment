import { useState, useEffect } from 'react'
import './App.css'
import Modal from './components/Modal'
import Basket from './components/Basket'
import Favs from './components/Favs'



// ############## this is the modal section #####################


function App() {
  const [games, setGames] = useState([])
  const [favs, SetFavs] = useState([])
  const [edit, setEdit] = useState(false)
  const [idForChange, setIdForChange] = useState()

  return(

    <div className="App">
      <Modal
      modalBool={edit}
      setModalBool={setEdit}
      identifier={idForChange}
      setIdentifier={setIdForChange}
      favsArr={favs}
      />
      <header>
        <h1>LOS MEJORES 20 JUEGOS DE TWITCH.TV</h1>
      </header>
      <div className="content">
        <Basket
          gamesArr={games}
          setGamesArr={setGames}
          favsArr={favs}
          setFavsArr={SetFavs}
          />
        <Favs
          favsArray={favs}
          setFavsArray={SetFavs}
          setModalBool={setEdit}
          setIdentifier={setIdForChange}
        />
      </div>
    </div>

  )
}

export default App

