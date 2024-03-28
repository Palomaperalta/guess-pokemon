import { useState, useEffect } from "react";

import api from "./api";
import { Pokemon } from "./types";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonName, setPokemonName] = useState("");
  const [imgClassName, setImgClassName] = useState("noadivino");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getPokemon();
  }, []);

  async function getPokemon() {
    const newpokemon = await api.random();

    setPokemon(newpokemon);
  }
  const handleAnswer = () => {
    if (
      pokemonName.toLowerCase().replace(/\s/g, "").replace(/\./g, "").trim() ===
      pokemon?.name
    ) {
      setImgClassName("adivino");
      setOpenDialog(true);
    }
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value);
  };
  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <main>
      <span className="nes-text is-primary" id="titulo">
        Quién es este Pokemon?
      </span>
      <img alt="" className={imgClassName} src={pokemon?.image} />
      <div className="nes-field" id="answer">
        <input
          className="nes-input border"
          id="name_field"
          type="text"
          value={pokemonName}
          onChange={handleNameChange}
        />
        <button
          className={`nes-btn is-primary border${
            imgClassName === "adivino" ? "is-disabled" : ""
          }`}
          type="button"
          onClick={handleAnswer}
        >
          Adivinar
        </button>
        {imgClassName === "adivino" ? (
          <button
            className="nes-btn is-success"
            type="button"
            onClick={handlePlayAgain}
          >
            Play again
          </button>
        ) : null}
      </div>
      <dialog className="nes-dialog" id="dialog-default" open={openDialog}>
        <form method="dialog">
          <p className="title">Congratulations!</p>
          <p>You answered correctly</p>
          <menu className="dialog-menu">
            <button className="nes-btn">Cancel</button>
            <button className="nes-btn is-primary" onClick={handlePlayAgain}>
              Play again
            </button>
          </menu>
        </form>
      </dialog>
    </main>
  );
}

export default App;
