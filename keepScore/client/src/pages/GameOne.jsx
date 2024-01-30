import '../styles/gameone/gameone.scss';

import { Link } from 'react-router-dom';
import { useState } from 'react'


const GameOne = () => {
  // const [users, setUsers] = useState([]);

  const [toAddPlayer, setToAddPlayer] = useState(false);
  const [numberofPlayers, setNumberOfPlayers] = useState(0);
  const [error, setError] = useState(false);
  
  const AddPlayer = (e) => {

    if(numberofPlayers < 2 || numberofPlayers > 5) {
      setError(true);
      setToAddPlayer(false);
    }else {
      setToAddPlayer(true);
      setError(false);

      // setUsers([...users, {name: "Tulsi", Score: '0'}])
    }


  };

  // Generate input fields based on player number
  const generateInputFields = () => {
    const inputFields = [];
    for (let i = 1; i <= numberofPlayers; i++) {
      inputFields.push(
        <div className='playername input-wrapper'>
          <input className = "name-input" key={i} name={`player${i}`} type="text" placeholder="Name" />
        </div>
      );
    }
    return inputFields;
  };

  
  return (
    <div className='score-wrapper'>
      <Link to='/'>
        <p className='go-home'>Home</p>
      </Link>
      <h3>Hazari Score</h3>
      <div className="score-content">
        <p>2 - 5 Players needed!</p>
        <div className="addplayer-wrapper">
          <input type="number" min='2' max='5' value={numberofPlayers} onChange={(e) => setNumberOfPlayers(e.target.value)}/>
          <button className='add-player' onClick={AddPlayer}>Add Player</button>
          <button className='add-point add-player' >Add Points</button>
        </div>
        {error && (<p className='error-msg'>You need 2 - 5 players for this game</p>)}

        {toAddPlayer && (
          <div className="playername">
            {generateInputFields()}
          </div>
        )}
      </div>
    </div> 
  )
}

export default GameOne;