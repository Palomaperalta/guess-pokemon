import {useState, useEffect} from 'react'
import api from './api'
import { Pokemon } from './types';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [pokemonName, setPokemonName] = useState('')
  const [imgClassName, setImgClassName] = useState('noadivino')

  useEffect(()=>{
    getPokemon()
  }, [])

  async function getPokemon(){
    const newpokemon = await api.random()
    setPokemon(newpokemon)
  } 
  const handleAnswer = () =>{
    if(pokemonName.toLowerCase() === pokemon.name ){
      setImgClassName('adivino')
    }
  }
  const handleNameChange = (event) =>{
    setPokemonName(event.target.value)
  }
  return (
    <main>
      <span id="titulo" className="nes-text is-primary">Quién es este Pokemon?</span>
      <img className={imgClassName} alt="" src={pokemon?.image}></img>
      <div className="nes-field" id="answer">
        <input value={pokemonName} onChange={handleNameChange} type="text" id="name_field" className="nes-input border" />
        <button onClick={handleAnswer} type="button" className="nes-btn is-primary border">Adivinar</button>
      </div>
    </main>
  )
}

export default App;
