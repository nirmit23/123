'use client';

import { useState, useEffect, useRef } from 'react';

export default function SlidingPuzzle() {
  const [puzzleState, setPuzzleState] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    initPuzzle();
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const initPuzzle = () => {
    const state = [];
    for (let i = 1; i <= 15; i++) {
      state.push(i);
    }
    state.push(null);
    setPuzzleState(state);
    setMoves(0);
    setTime(0);
    setIsRunning(false);
  };

  const getValidMoves = (emptyIdx) => {
    const validMoves = [];
    const row = Math.floor(emptyIdx / 4);
    const col = emptyIdx % 4;
    
    if (row > 0) validMoves.push(emptyIdx - 4);
    if (row < 3) validMoves.push(emptyIdx + 4);
    if (col > 0) validMoves.push(emptyIdx - 1);
    if (col < 3) validMoves.push(emptyIdx + 1);
    
    return validMoves;
  };

  const moveTile = (index) => {
    const emptyIdx = puzzleState.indexOf(null);
    const validMoves = getValidMoves(emptyIdx);
    
    if (validMoves.includes(index)) {
      const newState = [...puzzleState];
      [newState[index], newState[emptyIdx]] = [newState[emptyIdx], newState[index]];
      setPuzzleState(newState);
      setMoves(m => m + 1);
      
      if (!isRunning) {
        setIsRunning(true);
      }
      
      if (checkWin(newState)) {
        setIsRunning(false);
        setTimeout(() => alert('🎉 Congratulations! You solved the puzzle!'), 100);
      }
    }
  };

  const checkWin = (state) => {
    for (let i = 0; i < 15; i++) {
      if (state[i] !== i + 1) return false;
    }
    return state[15] === null;
  };

  const shufflePuzzle = () => {
    let state = [...puzzleState];
    
    for (let i = 0; i < 150; i++) {
      const emptyIdx = state.indexOf(null);
      const validMoves = getValidMoves(emptyIdx);
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      [state[randomMove], state[emptyIdx]] = [state[emptyIdx], state[randomMove]];
    }
    
    setPuzzleState(state);
    setMoves(0);
    setTime(0);
    setIsRunning(true);
  };

  const showHint = () => {
    const emptyIdx = puzzleState.indexOf(null);
    const validMoves = getValidMoves(emptyIdx);
    
    if (validMoves.length > 0) {
      const tiles = document.querySelectorAll('.puzzle-tile');
      if (tiles[validMoves[0]]) {
        tiles[validMoves[0]].style.background = '#fbbf24';
        setTimeout(() => {
          tiles[validMoves[0]].style.background = '';
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="puzzle-wrapper">
      <div className="puzzle-grid">
        {puzzleState.map((value, index) => (
          <div
            key={index}
            className={`puzzle-tile ${value === null ? 'empty' : ''}`}
            onClick={() => moveTile(index)}
          >
            {value}
          </div>
        ))}
      </div>
      
      <div className="puzzle-controls">
        <button className="puzzle-btn" onClick={shufflePuzzle}>🔀 Shuffle</button>
        <button className="puzzle-btn" onClick={initPuzzle}>🔄 Reset</button>
        <button className="puzzle-btn" onClick={showHint}>💡 Hint</button>
      </div>

      <div className="puzzle-stats">
        <div className="puzzle-stat">
          <span className="puzzle-stat-label">Moves:</span>
          <span className="puzzle-stat-value">{moves}</span>
        </div>
        <div className="puzzle-stat">
          <span className="puzzle-stat-label">Time:</span>
          <span className="puzzle-stat-value">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
}