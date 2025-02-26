// utils.js
export const generateEmojis = (count) => {
    const emojis = ['🍎', '🍌', '🍒', '🍕', '🥑', '🥦', '🍇', '🍊', '🥥', '🍓'];
    return shuffleArray(emojis).slice(0, count);
  };
  
  export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };