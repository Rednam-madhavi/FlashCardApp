import React, { useState, useEffect } from 'react';
import { initialFlashcards } from './constants/flashcards';
import Flashcard from './components/Flashcard';
import CardNavigator from './components/CardNavigator';
import CardGenerator from './components/CardGenerator';
import ExplanationModal from './components/ExplanationModal';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';

const App = () => {
  const [cards, setCards] = useState(initialFlashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [error, setError] = useState('');
  const [generatedCard, setGeneratedCard] = useState(null);

  const currentCard = cards[currentCardIndex];

  useEffect(() => {
    setIsFlipped(false);
    setExplanation('');
    setShowExplanationModal(false);
    setError('');
  }, [currentCardIndex]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (isFlipped) {
      setExplanation('');
      setShowExplanationModal(false);
    }
  };

  const nextCard = () => {
    setCurrentCardIndex((i) => (i + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((i) => (i - 1 + cards.length) % cards.length);
  };

  const generateFlashcard = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    setIsLoading(true);
    setError('');
    setGeneratedCard(null);

    try {
      const fakeCard = {
        question: `What is ${topic}?`,
        answer: `${topic} is an important subject in modern learning.`,
      };
      setGeneratedCard(fakeCard);
    } catch (err) {
      setError('Failed to generate card.');
    } finally {
      setIsLoading(false);
    }
  };

  const onAddCard = () => {
    if (generatedCard) {
      setCards((prev) => [...prev, generatedCard]);
      setCurrentCardIndex(cards.length);
      setGeneratedCard(null);
      setTopic('');
    }
  };

  const onCancel = () => {
    setGeneratedCard(null);
  };

  const explainAnswer = () => {
    setIsLoading(true);
    setShowExplanationModal(true);
    setTimeout(() => {
      setExplanation(`"${currentCard.answer}" is a fundamental concept in relation to this topic.`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-6xl w-full flex flex-col sm:flex-row gap-6">
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">AI Flashcards</h1>
          <Flashcard
            question={currentCard.question}
            answer={currentCard.answer}
            isFlipped={isFlipped}
            onFlip={flipCard}
            onExplain={explainAnswer}
          />
          <CardNavigator onPrev={prevCard} onNext={nextCard} />
          <p className="text-gray-600 text-lg mt-4">
            Card {currentCardIndex + 1} of {cards.length}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-start">
          {showExplanationModal && explanation && (
            <ExplanationModal
              explanation={explanation}
              onClose={() => setShowExplanationModal(false)}
            />
          )}
          <CardGenerator
            topic={topic}
            setTopic={setTopic}
            onGenerate={generateFlashcard}
            isLoading={isLoading}
            generatedCard={generatedCard}
            onAddCard={onAddCard}
            onCancel={onCancel}
          />
          {isLoading && <Loader />}
          <ErrorMessage error={error} />
        </div>
      </div>
    </div>
  );
};

export default App;
