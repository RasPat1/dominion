import React from "react";
import Hand from "./Hand";
import Log from "./Log";
import Misc from "./Misc";
import Supply from "./Supply";
import PropTypes from "prop-types";
import "./styles.css";

const Game = ({ game, socket, playerId }) => {
  const playerIndex = game.players.findIndex(player => player.id === playerId);
  return (
    <div className="game">
      <div className="topRow">
        <Supply supply={game.supply} socket={socket} />
        <Log log={game.log} />
      </div>
      <div className="bottomRow">
        <Hand hand={game.players[playerIndex].cards.hand} socket={socket} />
        <Misc currentPlayer={game.currentPlayer} socket={socket} />
      </div>
    </div>
  );
};

Game.propTypes = {
  game: PropTypes.shape({
    supply: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
      })
    ),
    trash: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    players: PropTypes.arrayOf(PropTypes.object),
    currentPlayer: PropTypes.shape({
      id: PropTypes.string,
      actions: PropTypes.number.isRequired,
      buys: PropTypes.number.isRequired,
      gold: PropTypes.number.isRequired
    }),
    log: PropTypes.arrayOf(PropTypes.string.isRequired)
  }).isRequired,
  playerId: PropTypes.string.isRequired,
  socket: PropTypes.object
};

export default Game;
