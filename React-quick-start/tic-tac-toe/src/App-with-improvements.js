// REF: https://react.dev/learn/tutorial-tic-tac-toe
// TODO: Add coordinates to each move.

import React, { useState } from "react";

function Square({ value, onSquareClick, winning }) {
  if (winning) {
    return (
      <button className="square-winning" onClick={onSquareClick}>
        {value}
      </button>
    );
  }

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

let renderCount = 0;

function Board({ currentMove, xIsNext, squares, onPlay }) {
  renderCount += 1;
  console.log(renderCount);

  const winningSquares = calculateWinner(squares);
  const winner = winningSquares ? squares[winningSquares[0]] : null;

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (currentMove === 9) {
    status = "Draw - No winner";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(idx) {
    if (squares[idx] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[idx] = "X";
    } else {
      nextSquares[idx] = "O";
    }
    onPlay(nextSquares);
  }

  const boardSize = 3;

  let rows = [];
  for (let i = 0; i < boardSize; i++) {
    let squaresInRow = [];
    for (let j = 0; j < boardSize; j++) {
      let index = i * boardSize + j;
      squaresInRow.push(
        <Square
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          winning={winningSquares ? winningSquares.includes(index) : false}
        />
      );
    }
    rows.push(<div className="board-row">{squaresInRow}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // setHistory([...history, nextSquares]);
    setHistory(nextHistory);
    // setCurrentMove(nextHistory.length - 1);
    setCurrentMove((currentMove) => currentMove + 1);
  }

  function toggleSortOrder() {
    setSortAscending((sortAscending) => !sortAscending);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move === currentMove) {
      description = "You are at move #" + move;

      return (
        <li key={move}>
          <div>{description}</div>
        </li>
      );
    }

    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function getSortedMoves(moves, ascending) {
    if (ascending) {
      moves.sort((a, b) => a.key - b.key);
    } else {
      moves.sort((a, b) => b.key - a.key);
    }

    return moves;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          currentMove={currentMove}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        {/* <ol>{moves}</ol> */}
        <button onClick={toggleSortOrder}>
          {sortAscending ? "Sort Descending" : "Sort Ascending"}
        </button>

        <ol>{getSortedMoves(moves, sortAscending)}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}
