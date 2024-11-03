const apiKey = import.meta.env.VITE_API_KEY;
import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/header/header';
import cardsData from './data';
import CardWrapper from './components/card-wrapper/card-wrapper';
import {backupImages} from './data';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  const shuffleCards = () => {
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
  };


  const handleScore = (cardId) => {
    if (clickedCards.includes(cardId)) {
      handleBestScore();
      setScore(0);
      setClickedCards([]);
    } else {
      setClickedCards([...clickedCards, cardId]);
      setScore(score + 1);
      shuffleCards();
    }
    
  }

  const handleBestScore = () => {
    if (score === 9) {
      alert('You won!');
    }
    if (score > bestScore) {
      setBestScore(score);      
    }
  }

  function filterBackupImages(name) {
    return backupImages.filter((image) => image.name === name);
  }


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const updatedCards = await Promise.all(
          cardsData.map(async (card) => {
            const response = await fetch(
              `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${card.name}&limit=1`
            );
            const data = await response.json();
            return {
              ...card,
              image: data.data[0]?.images?.fixed_height?.url || filterBackupImages(card.name)[0].image, // Ensure there's a fallback in case no image is found
            };
          })
        );
        setCards(updatedCards);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <Header score={score} bestScore={bestScore}/>

      <CardWrapper cards={cards} handleScore={handleScore}/>
    </> 
  )
}

export default App
