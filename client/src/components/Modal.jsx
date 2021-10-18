import React from 'react'
import Axios from 'axios'

const Modal = ({modalBool,setModalBool,identifier,setIdentifier,favsArr}) => {
  let text = ''
  const editFav = e => {
    text = e.target.value
    favsArr.find(item =>item._id == identifier).name = text
  }
  const change = (e) => {
    Axios.put('http://localhost:3001/update', {id:identifier, newGameName:text})
    e.preventDefault()
    setModalBool(false)
    setIdentifier(undefined)
  }
  return(
    modalBool &&
    <form>
      <div className="formContent">
        <h1>Cambia el nombre de tu juego favorito</h1>
        <input type="text" onChange={editFav} />
        <button type="submit" onClick={change}>Cambiar</button>
      </div>
    </form>
  )
}

export default Modal