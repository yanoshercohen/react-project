import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

const values = ["🐶", "🐱", "🐼", "🦊", "🐵", "🐸", "🐷", "🐥"];
const totalPairs = values.length;

function App() {
  const [cards, setCards] = useState(shuffleCards());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [steps, setSteps] = useState(0);
  const [isVictory, setIsVictory] = useState(false);

  function shuffleCards() {
    return [...values, ...values].sort(() => Math.random() - 0.5);
  }

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setSteps((prev) => prev + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setIsVictory(true);
    }
  }, [matched, cards]);

  const restartGame = () => {
    setCards(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setSteps(0);
    setIsVictory(false);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <p>Attempts: {steps}</p>

      <div className="card-grid">
        {cards.map((value, index) => (
          <Card
            key={index}
            value={value}
            isFlipped={flipped.includes(index) || matched.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {isVictory && (
        <div className="victory">
          <h2>Victory! 🎉</h2>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
