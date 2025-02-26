// Timer.js
const Timer = ({ time }) => {
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
  
    return <div className="timer">Time: {formatTime(time)}</div>;
  };
  
  export default Timer;