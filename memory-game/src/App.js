import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

const values = ["🐶", "🐱", "🐼", "🦊", "🐵", "🐸", "🐷", "🐥"];
const shuffled = [...values, ...values].sort(() => Math.random() - 0.5);

function App() {
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (shuffled[first] === shuffled[second]) {
        setMatched((prev) => [...prev, first, second]);
      }

      // Flip back if not matched after short delay
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="App">
      <div className="card-grid">
        {shuffled.map((value, index) => (
          <Card
            key={index}
            value={value}
            isFlipped={flipped.includes(index) || matched.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
