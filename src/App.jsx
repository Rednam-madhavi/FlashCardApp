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
    setIsFlipped((prev) => !prev);
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
      setTimeout(() => setGeneratedCard(fakeCard), 1000);
    } catch (err) {
      setError('Failed to generate card.');
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const onAddCard = () => {
    if (generatedCard) {
      const updated = [...cards, generatedCard];
      setCards(updated);
      setCurrentCardIndex(updated.length - 1);
      setGeneratedCard(null);
      setTopic('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onCancel = () => {
    setGeneratedCard(null);
  };

  const explainAnswer = () => {
    setIsLoading(true);
    setShowExplanationModal(true);
    setTimeout(() => {
      setExplanation(`"${currentCard.answer}" is a fundamental concept in this topic.`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col-reverse lg:flex-row gap-10">

        {/* Left Panel: Flashcard */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">✨ AI Flashcards</h1>
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

        {/* Right Panel: Generator */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
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
