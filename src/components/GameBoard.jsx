import { useState } from "react";


export default function GameBoard({onSelectSq,board}){
    // const[gameBoard,setGameBoard]=useState(initialGameBoard);

    // function handeSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedBoard=[...prevGameBoard.map(innerArray=>[...innerArray])]
    //         updatedBoard[rowIndex][colIndex]=ActiveSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectSq();
    // }

    

    return(
        <ol id="game-board">
        {board.map((row,rowIndex)=>(
            <li key={rowIndex}>
                <ol>
                    {
                        row.map((col,colIndex)=>(
                             <li key={colIndex}>
                                <button
                                onClick={()=>onSelectSq(rowIndex,colIndex)} 
                                disabled={col!==null}>{col}</button>
                             </li>
                        ))
                    }
                </ol>
            </li>
        ))}
        </ol>
    );
}