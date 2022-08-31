import {useState, useEffect} from 'react'
import api from './api'
import { Pokemon } from './types';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [pokemonName, setPokemonName] = useState('')
  const [imgClassName, setImgClassName] = useState('noadivino')
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(()=>{
    getPokemon()
  }, [])

  async function getPokemon(){
    const newpokemon = await api.random()
    setPokemon(newpokemon)
  } 
  const handleAnswer = () =>{
    if(pokemonName.toLowerCase().replace(/\s/g, "").replace(/\./g, "").trim() === pokemon.name){
      setImgClassName('adivino')
      setOpenDialog(true)
    }
  }
  const handleNameChange = (event) =>{
    setPokemonName(event.target.value)
  }
  const handlePlayAgain = () =>{
    window.location.reload()
  }

  return (
    <main>
      <span id="titulo" className="nes-text is-primary">Quién es este Pokemon?</span>
      <img className={imgClassName} alt="" src={pokemon?.image}></img>
      <div className="nes-field" id="answer">
        <input value={pokemonName} onChange={handleNameChange} type="text" id="name_field" className="nes-input border" />
        <button onClick={handleAnswer} type="button" className={`nes-btn is-primary border${imgClassName === 'adivino' ? ' is-disabled': ''}`}>Adivinar</button>
        {imgClassName === 'adivino' ? <button onClick={handlePlayAgain} type="button" className="nes-btn is-success">Play again</button> : null}
      </div>
      <dialog open={openDialog} className="nes-dialog" id="dialog-default">
        <form method="dialog">
          <p className="title">Congratulations!</p>
          <p>You answered correctly</p>
          <menu className="dialog-menu">
            <button className="nes-btn">Cancel</button>
            <button onClick={handlePlayAgain} className="nes-btn is-primary">Play again</button>
          </menu>
        </form>
      </dialog>
    </main>
  )
}

export default App;
