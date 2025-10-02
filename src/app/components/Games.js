'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SlidingPuzzle from './SlidingPuzzle';
import TicTacToe from './TicTacToe';

export default function Games() {
  const [currentGame, setCurrentGame] = useState(0);

  const games = [
    {
      id: 'sliding-puzzle',
      title: 'Sliding Number Puzzle',
      icon: '🎮',
      description: 'A classic 15-puzzle game. Arrange numbers 1-15 in order by sliding tiles into the empty space. How fast can you solve it?',
      difficulty: 60,
      techStack: ['React', 'JavaScript', 'CSS3'],
      component: <SlidingPuzzle />
    },
    {
      id: 'tic-tac-toe',
      title: 'Tic Tac Toe',
      icon: '⭕',
      description: 'Challenge yourself against an unbeatable AI or play with a friend locally. Choose your game mode and start playing!',
      difficulty: 80,
      techStack: ['React', 'Minimax AI', 'CSS3'],
      component: <TicTacToe />
    }
  ];

  const nextGame = () => {
    setCurrentGame((prev) => (prev + 1) % games.length);
  };

  const prevGame = () => {
    setCurrentGame((prev) => (prev - 1 + games.length) % games.length);
  };

  const game = games[currentGame];

  return (
    <section id="games" className="games">
      <div className="section-container">
        <h2>Interactive Games</h2>
        <p className="games-subtitle">
          Take a break and challenge yourself with these interactive games I've built. 
          Test your problem-solving skills!
        </p>

        {/* Carousel Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentGame(index)}
              style={{
                width: currentGame === index ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: currentGame === index ? 'var(--primary-blue)' : 'var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to game ${index + 1}`}
            />
          ))}
        </div>

        <div className="games-showcase" style={{ position: 'relative' }}>
          {/* Navigation Buttons */}
          <button
            onClick={prevGame}
            className="carousel-btn carousel-btn-prev"
            aria-label="Previous game"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextGame}
            className="carousel-btn carousel-btn-next"
            aria-label="Next game"
          >
            <ChevronRight size={24} />
          </button>

          {/* Game Card */}
          <div className="featured-game" style={{ 
            animation: 'fadeIn 0.5s ease-in-out'
          }}>
            <div className="game-info">
              <h3 className="game-title">
                <span style={{ color: 'var(--primary-blue)' }}>{game.icon}</span>
                {game.title}
              </h3>
              <p className="game-description">{game.description}</p>
              
              <div className="game-stats">
                <div className="stat-item">
                  <span className="stat-label">Difficulty:</span>
                  <div className="difficulty-bar">
                    <div className="difficulty-level" style={{ width: `${game.difficulty}%` }}></div>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Tech Stack:</span>
                  <div className="tech-tags">
                    {game.techStack.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="game-embed">
              {game.component}
            </div>
          </div>

          {/* Game Counter */}
          <div style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
          }}>
            Game {currentGame + 1} of {games.length}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          color: var(--text-primary);
        }

        .carousel-btn:hover {
          background: var(--primary-blue);
          color: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 4px 12px rgba(91, 155, 213, 0.3);
        }

        .carousel-btn-prev {
          left: -24px;
        }

        .carousel-btn-next {
          right: -24px;
        }

        @media (max-width: 768px) {
          .carousel-btn {
            width: 40px;
            height: 40px;
          }

          .carousel-btn-prev {
            left: -12px;
          }

          .carousel-btn-next {
            right: -12px;
          }
        }

        @media (max-width: 500px) {
          .carousel-btn {
            width: 36px;
            height: 36px;
            position: static;
            transform: none;
          }

          .carousel-btn:hover {
            transform: scale(1.1);
          }

          .carousel-btn-prev,
          .carousel-btn-next {
            left: auto;
            right: auto;
          }

          .games-showcase {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .games-showcase::before {
            content: '';
            display: flex;
            justify-content: center;
            gap: 1rem;
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}