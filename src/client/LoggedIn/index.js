import React, { useEffect, useState } from "react";
import Game from "../Game";
import Waiting from "../Waiting";

const socket = {};

const LoggedIn = ({ username }) => {
  const [gameState, setGameState] = useState({
    status: "NOT_IN_PROGRESS",
    connections: [],
    game: {
      supply: [],
      trash: [],
      players: [],
      currentPlayer: {
        id: null,
        actions: 0,
        buys: 0,
        gold: 0
      },
      log: []
    },
    id: null
  });
  useEffect(() => {
    socket.ws = new WebSocket(
      `ws://localhost:8080/dominion?username=${encodeURIComponent(username)}`
    );

    socket.ws.onmessage = function(event) {
      console.log(JSON.parse(event.data));
      setGameState(JSON.parse(event.data));
    };
  }, []);

  if (gameState.status === "NOT_IN_PROGRESS") {
    return <Waiting connections={gameState.connections} ws={socket.ws} />;
  } else if (gameState.status === "IN_PROGRESS") {
    return (
      <Game
        status={gameState.status}
        connections={gameState.connections}
        game={gameState.game}
        playerId={gameState.id}
        ws={socket.ws}
      />
    );
  }
};

export default LoggedIn;