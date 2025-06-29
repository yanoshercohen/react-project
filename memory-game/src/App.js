import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

const values = ["🐶", "🐱", "🐼", "🦊", "🐵", "🐸", "🐷", "🐥"];
const shuffled = [...values, ...values].sort(() => Math.random() - 0.5);

function App() {
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  const handleCardClick = (index) => {
    setFlippedIndexes((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  };

  return (
    <div className="App">
      <div className="card-grid">
        {shuffled.map((value, index) => (
          <Card
            key={index}
            value={value}
            isFlipped={flippedIndexes.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
