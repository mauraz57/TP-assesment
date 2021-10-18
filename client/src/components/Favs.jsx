import React, { useEffect, useState } from 'react'
import fallingBox from './../assets/fallingBox.png'
import Axios from 'axios'

const Favs = ({favsArray, setFavsArray,setModalBool,setIdentifier}) => {

  const [favList, setFavList] = useState ([])

  useEffect(() => {
    Axios.get('http://localhost:3001/read')
    .then(response => setFavList(response.data))
  },[favList])
  
  const openModal = (e) => {
    setModalBool(true)
    setIdentifier(e.target.parentElement.firstChild.innerHTML)
  }

  const deleteFav = (e) => {
    let favId = e.target.parentElement.firstChild.innerHTML
    let newArr = []
    favList.forEach(item => {
      if(item._id != favId) newArr.push(item)
    })
    Axios.delete(`http://localhost:3001/delete/${favId}`)
    setFavsArray(newArr)
    setIdentifier(undefined)
    setModalBool(false)
  }
  return(
    <section className="favs">
      <h1>Favoritos</h1>
      {favList.length == 0 &&
        <div >
          <img src={fallingBox} alt='sin favoritos' className="fallingBox" />
          <h3>Aún no tienes favoritos</h3>
        </div>
      }
      <div className="gridArea2">
        {favList.map(({_id, name, box_art_url}) => {
          return (
            <div className="card" key={_id}>
              <p className="dontShow">{_id}</p>
              <img src={box_art_url} alt={`image for the game ${name}`} />
              <h3>{name}</h3>
              <button onClick={openModal}>Editar</button>
              <button onClick={deleteFav}>Borrar</button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Favs