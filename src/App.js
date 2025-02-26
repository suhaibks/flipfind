// App.js
import { useState } from 'react';
import GameBoard from './GameBoard';
import logo from './logo.svg'
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(null);

  const startGame = (level) => {
    setDifficulty(level);
    setGameStarted(true);
  };

  return (
    <div className="app">
      <header className="game-header">
      <img src={logo} alt="Game Logo" className="logo" />
        <h1>FlipFind</h1>
      </header>
      {!gameStarted ? (
        <div className="difficulty-screen">
          <h2 className='body-header'>Choose Your Game!</h2>
          <div className="difficulty-buttons">
            <button onClick={() => startGame('easy')}><strong>Easy (4x4)</strong></button>
            <button onClick={() => startGame('medium')}><strong>Medium (6x4)</strong></button>
            <button onClick={() => startGame('hard')}><strong>Hard (6x6)</strong></button>
          </div>
        </div>
      ) : (
        <GameBoard difficulty={difficulty} setGameStarted={setGameStarted} />
      )}
      <footer className="site-footer"> 
      <div className="footer-content">
        <div className="social-links">
          <a href="https://x.com/suhaib_ks" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://www.linkedin.com/in/suhaib-k-s-2ba6a8250" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.facebook.com/share/15hmHygaD7/" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} FlipFind. All rights reserved.
        </p>
      </div>
    </footer>
    </div>
  );
}

export default App;