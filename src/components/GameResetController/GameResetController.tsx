import * as React from 'react';
import Game from '../Game/Game';

function GameResetController() {
  const [resetKey, setResetKey] = React.useState(crypto.randomUUID());

  function resetGame() {
    setResetKey(crypto.randomUUID())
  }

  return <Game key={resetKey} onReset={resetGame}></Game>;
}

export default GameResetController;
