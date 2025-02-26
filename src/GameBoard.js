import { useState, useEffect, useRef } from 'react';
import Card from './Card';
import Timer from './Timer';
import WinModal from './WinModal';
import { shuffleArray, generateEmojis } from './utils';
import './App.css';

const GameBoard = ({ difficulty, setGameStarted }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [bestTime, setBestTime] = useState(() => 
    localStorage.getItem(`bestTime-${difficulty}`) || Infinity
  );
  const timerActive = useRef(false);
  const isProcessing = useRef(false);

  const getGridSize = () => {
    switch(difficulty) {
      case 'easy': return { rows: 4, cols: 4 };
      case 'medium': return { rows: 4, cols: 6 };
      case 'hard': return { rows: 6, cols: 6 };
      default: return { rows: 4, cols: 4 };
    }
  };

  const initializeGame = () => {
    const { rows, cols } = getGridSize();
    const emojis = generateEmojis((rows * cols) / 2);
    const newCards = shuffleArray([...emojis, ...emojis]).map((emoji, i) => ({
      id: i,
      emoji,
      flipped: false,
      matched: false
    }));
    
    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    setGameOver(false);
    setIsPaused(false);
    timerActive.current = false;
  };

  useEffect(initializeGame, [difficulty]);

  useEffect(() => {
    if (matched.length === cards.length / 2 && cards.length > 0) {
      timerActive.current = false;
      setGameOver(true);
      if (time < bestTime) {
        setBestTime(time);
        localStorage.setItem(`bestTime-${difficulty}`, time);
      }
    }
  }, [matched]);

  useEffect(() => {
    let interval;
    if (timerActive.current && !isPaused) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive.current, isPaused]);

  const handlePause = () => {
    setIsPaused((prev) => !prev);
    timerActive.current = !isPaused;
  };

  const handleMenu = () => {
    setGameStarted(false);
    initializeGame();
  };

  const handleCardClick = (id) => {
    if (!timerActive.current) timerActive.current = true;
    if (isProcessing.current || flipped.length === 2 || cards[id].matched || isPaused) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    setFlipped([...flipped, id]);

    if (flipped.length === 1) {
      isProcessing.current = true;
      setMoves(m => m + 1);
      const [firstId] = flipped;
      if (cards[firstId].emoji === cards[id].emoji) {
        setMatched([...matched, cards[firstId].emoji]);
        setFlipped([]);
        isProcessing.current = false;
      } else {
        setTimeout(() => {
          newCards[firstId].flipped = false;
          newCards[id].flipped = false;
          setCards(newCards);
          setFlipped([]);
          isProcessing.current = false;
        }, 700);
      }
    }
  };

  return (
    <div className="game-board">
      <div className="game-info">
        <Timer time={time} />
        <div className="moves">Moves: {moves}</div>
        <div className="game-controls">
          <button className="pause-btn" onClick={handlePause}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button className="restart-btn" onClick={initializeGame}>
            Restart
          </button>
          <button className="menu-btn" onClick={handleMenu}>
            Menu
          </button>
        </div>
      </div>

      <div className={`grid ${difficulty}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      {gameOver && (
        <WinModal
          time={time}
          moves={moves}
          bestTime={bestTime}
          onRestart={initializeGame}
          onMenu={() => setGameStarted(false)}
        />
      )}
    </div>
  );
};

export default GameBoard;
