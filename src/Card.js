// Card.js
import './App.css';

const Card = ({ card, onClick }) => {
  return (
    <div
      className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">{card.emoji}</div>
        <div className="card-back"></div>
      </div>
    </div>
  );
};

export default Card;