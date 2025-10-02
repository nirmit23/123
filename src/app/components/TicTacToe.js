'use client';

import { useState, useEffect } from 'react';
import { X, Circle, RotateCcw, Trophy, ChevronDown } from 'lucide-react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [gameMode, setGameMode] = useState('computer');
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (currentBoard) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: pattern };
      }
    }
    if (currentBoard.every(cell => cell !== null)) {
      return { winner: 'draw', line: [] };
    }
    return null;
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = checkWinner(currentBoard);
    
    if (result) {
      if (result.winner === 'O') return 10 - depth;
      if (result.winner === 'X') return depth - 10;
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O';
          let score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'X';
          let score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  useEffect(() => {
    if (gameMode === 'computer' && !isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove([...board]);
        if (bestMove !== null) {
          handleMove(bestMove, 'O');
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameOver, gameMode]);

  const handleMove = (index, player) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setGameOver(true);
      
      if (result.winner === 'X') {
        setScores(prev => ({ ...prev, player1: prev.player1 + 1 }));
      } else if (result.winner === 'O') {
        setScores(prev => ({ ...prev, player2: prev.player2 + 1 }));
      } else {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      }
    } else {
      if (gameMode === 'player') {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
      setIsPlayerTurn(!isPlayerTurn);
    }
  };

  const handlePlayerMove = (index) => {
    if (gameMode === 'computer') {
      if (isPlayerTurn && !gameOver) {
        handleMove(index, 'X');
      }
    } else if (gameMode === 'player') {
      if (!gameOver) {
        handleMove(index, currentPlayer);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine([]);
    setGameOver(false);
  };

  const resetScores = () => {
    setScores({ player1: 0, player2: 0, draws: 0 });
    resetGame();
  };

  const changeGameMode = (mode) => {
    setGameMode(mode);
    setScores({ player1: 0, player2: 0, draws: 0 });
    resetGame();
    setIsDropdownOpen(false);
  };

  return (
    <div className="tictactoe-wrapper" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      {/* Game Mode Dropdown */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative' }}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: 'var(--text-primary)'
          }}
        >
          <span>{gameMode === 'computer' ? '🤖 vs Computer' : '👥 2 Players'}</span>
          <ChevronDown 
            size={16} 
            style={{ 
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s'
            }} 
          />
        </button>

        {isDropdownOpen && (
          <>
            <div 
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10
              }}
              onClick={() => setIsDropdownOpen(false)}
            />
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '0.5rem',
                width: '200px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                zIndex: 20
              }}
            >
              <button
                onClick={() => changeGameMode('computer')}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: gameMode === 'computer' ? '#f0f9ff' : 'var(--card-bg)',
                  color: gameMode === 'computer' ? 'var(--primary-blue)' : 'var(--text-primary)',
                  border: 'none',
                  borderBottom: '1px solid var(--border-color)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                🤖 vs Computer
              </button>
              <button
                onClick={() => changeGameMode('player')}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: gameMode === 'player' ? '#f0f9ff' : 'var(--card-bg)',
                  color: gameMode === 'player' ? 'var(--primary-blue)' : 'var(--text-primary)',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                👥 2 Players
              </button>
            </div>
          </>
        )}
      </div>

      {/* Scores */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '0.75rem', 
        marginBottom: '1.5rem' 
      }}>
        <div style={{ 
          background: 'var(--card-bg)', 
          padding: '1rem', 
          borderRadius: '12px', 
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', marginBottom: '0.25rem' }}>
            {gameMode === 'computer' ? 'You' : 'Player 1'}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{scores.player1}</div>
        </div>
        <div style={{ 
          background: 'var(--card-bg)', 
          padding: '1rem', 
          borderRadius: '12px', 
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            Draws
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{scores.draws}</div>
        </div>
        <div style={{ 
          background: 'var(--card-bg)', 
          padding: '1rem', 
          borderRadius: '12px', 
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#e74c3c', marginBottom: '0.25rem' }}>
            {gameMode === 'computer' ? 'Computer' : 'Player 2'}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{scores.player2}</div>
        </div>
      </div>

      {/* Status */}
      <div style={{
        background: 'var(--card-bg)',
        padding: '1rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        textAlign: 'center',
        marginBottom: '1.5rem'
      }}>
        {!gameOver ? (
          <p style={{ fontWeight: '500', margin: 0 }}>
            {gameMode === 'computer' 
              ? (isPlayerTurn ? "Your turn (X)" : "Computer thinking...")
              : `${currentPlayer === 'X' ? 'Player 1' : 'Player 2'}'s turn (${currentPlayer})`
            }
          </p>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {winner === 'draw' ? (
              <p style={{ margin: 0 }}>It's a draw!</p>
            ) : (
              <>
                <Trophy size={20} style={{ color: winner === 'X' ? 'var(--primary-blue)' : '#e74c3c' }} />
                <p style={{ margin: 0 }}>
                  {gameMode === 'computer' 
                    ? (winner === 'X' ? 'You win!' : 'Computer wins!')
                    : `${winner === 'X' ? 'Player 1' : 'Player 2'} wins!`
                  }
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        background: 'var(--card-bg)',
        padding: '1rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handlePlayerMove(index)}
            disabled={
              (gameMode === 'computer' && (!isPlayerTurn || gameOver || cell !== null)) ||
              (gameMode === 'player' && (gameOver || cell !== null))
            }
            style={{
              aspectRatio: '1',
              background: winningLine.includes(index) ? 'rgba(16, 185, 129, 0.1)' : (cell ? 'var(--bg-light)' : 'var(--bg-white)'),
              border: `2px solid ${winningLine.includes(index) ? '#10b981' : (cell ? 'rgba(91, 155, 213, 0.3)' : 'var(--border-color)')}`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: (gameMode === 'computer' && (!isPlayerTurn || gameOver)) || (gameOver) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              fontSize: 0
            }}
          >
            {cell === 'X' && <X size={40} style={{ color: 'var(--primary-blue)' }} strokeWidth={3} />}
            {cell === 'O' && <Circle size={40} style={{ color: '#e74c3c' }} strokeWidth={3} />}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={resetGame}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: 'var(--primary-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontWeight: '500'
          }}
        >
          <RotateCcw size={18} />
          New Game
        </button>
        <button
          onClick={resetScores}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'var(--card-bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}