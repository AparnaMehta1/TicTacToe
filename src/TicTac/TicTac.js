import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './TicTac.css';
const TicTac = () => {

    const [turn, setTurn] = useState("X")
    const [cells, setCells] = useState(Array(9).fill(""))
    const [winner , setWinner] = useState ("");
    const checkForWinner = (squares ) =>{
        let combos = {
            accros:[
                [0,1,2],
                [3,4,5],
                [6,7,8],
            ],
            down : [
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ],
            diagnol : [
                [0,4,8],
                [2,4,6],
            ],
        }
        for(let combo in combos){
            combos[combo].forEach((pattern) =>{
                if(squares[pattern[0]] === '' ||
                squares[pattern[1]] === '' ||
                squares[pattern[2]] === ''){
                    //do nothing
            } else if (
                squares[pattern[0]] === squares[pattern[1]] &&
                squares[pattern[1]] === squares[pattern[2]] 
            )
            {
                setWinner(squares[pattern[0]]);
            };
        })
        }
    }
        const handleRestart = () => {
setWinner(null)
setCells(Array(9).fill(''));
        }
        
        //we will create a pattern in xxx & ooo for checking winnner
    
 //this handleClick function will decide the turn of candidate
    const handleClick = (num) => {
        //condition for not allowing someone to take chance twice
        if(cells[num] !== '')
        {
            alert("Already Clicked");
            return;
        }
       let squares = [...cells];
        if(turn === "X"){
            squares[num] = 'X'
            setTurn("O");
        }else{
            squares[num] = 'O';
            setTurn("X");
        }
        checkForWinner(squares);
        //setCells will set the order of all  clicked values either o or x
        setCells(squares);
    }
    const Cell = ( {num} ) =>{
        //cell[num] will show the clicked value on screen 
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>
    }
  return (
    <div className='container bg-dark fw-100'>
        <table >
        <th className='bg-light d-flex justify-content-center text-dark  fw-bold fs-3'> Turn : {turn}</th>
            <tbody>
                <tr>
                    <Cell num={0} />
                    <Cell num={1} />
                    <Cell num={2} />
                </tr>
                <tr>
                    <Cell num={3} />
                    <Cell num={4} />
                    <Cell num={5} />
                </tr>
                <tr>
                    <Cell num={6} />
                    <Cell num={7} />
                    <Cell num={8} />
                </tr>
            </tbody>
        </table>
        <button className='bg-success text-warning fw-bold fs-5 rounded-2 m-4' onClick={() => handleRestart()}>Restart Game!!</button>
        {winner && (
            <>
            <p className='text-light fw-bold fs-3'>{winner} is the winner!! </p>
            <button className='bg-danger text-dark fw-bold rounded-3 fs-5 m-2' onClick={() => handleRestart()}>Play Again!!</button>
            </>
        )}

    </div>
  )
}


export default TicTac;