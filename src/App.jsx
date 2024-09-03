import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from './winning-combinations';
import GameOver from "./components/GameOver";

const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];


function App() {
  // const [activePlayer,setActivePlayer]=useState("X");
  const[gameTurn,setGameTurns]=useState([]);
  const[players,setPlayers]=useState({
    'X':'Player 1',
    'O':'Player 2',
  });

  const activePlayer=getActivePlayer(gameTurn);
  let winner=null;
   let gameBoard=[...initialGameBoard.map(array=>[...array])];

    for(const turn of gameTurn){
        const {square,player}=turn;
        const{row,col}=square;
        gameBoard[row][col]=player;
    }


  for(const combination of WINNING_COMBINATIONS){
    const firstSq=gameBoard[combination[0].row][combination[0].column];
    const secondSq=gameBoard[combination[1].row][combination[1].column];
    const thirdSq=gameBoard[combination[2].row][combination[2].column];
    if(firstSq && firstSq===secondSq && secondSq===thirdSq){
      winner=players[firstSq];
    }
  }


  const draw = gameTurn.length ===9 && !winner;

  function handleSelectSq(rowIndex,colIndex){
    // setActivePlayer((currentPlayer)=> currentPlayer==="X"? "O" : "X");
    setGameTurns((prevTurn)=>{
      let currentPlayer=getActivePlayer(prevTurn);
      const updatedTurn=[{square:{row:rowIndex,col:colIndex},player:currentPlayer} ,...prevTurn];
      return updatedTurn;
    });
  }


  function getActivePlayer(gameTurns){
    let currentPlayer="X";
      if(gameTurn.length>0 && gameTurn[0].player==='X'){
        currentPlayer="O";
      }
    return currentPlayer;
  }

  function handleRematch(){
    setGameTurns([]);
  }

  function handleChangePlayer(symbol,newName){
    setPlayers(prevPlayers=>{
    return {
      ...prevPlayers,
      [symbol]:newName
    };
  });
    
  }

  return (

   <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player onChangeName={handleChangePlayer} name="Player 1" symbol="X" isActive={activePlayer==="X"}></Player>
        <Player onChangeName={handleChangePlayer} name="Player 2" symbol="O" isActive={activePlayer==="O"}></Player>
      </ol>
      {(winner || draw) && <GameOver winner={winner} onRematch={handleRematch}/> }
      <GameBoard onSelectSq={handleSelectSq} ActiveSymbol={activePlayer}
      board={gameBoard}
      />
      </div>
      <Log turns={gameTurn}/>
   </main>
  );
}

export default App
