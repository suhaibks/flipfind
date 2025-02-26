// WinModal.js
// WinModal.js
const WinModal = ({ time, moves, onRestart, onMenu }) => {
    return (
      <div className="win-modal">
        <div className="modal-content">
          <h2>Congratulations! 🎉</h2>
          <p>Time: {time} seconds</p><br></br>
          <p>Moves: {moves}</p>
          <div className="modal-buttons">
            <button onClick={onRestart}>Play Again</button>
            <button onClick={onMenu}>Main Menu</button>
          </div>
        </div>
      </div>
    );
  };

  export default WinModal;
