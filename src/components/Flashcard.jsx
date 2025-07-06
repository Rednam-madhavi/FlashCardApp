import React from 'react';
import { FaMagic } from 'react-icons/fa';

const Flashcard = ({ question, answer, isFlipped, onFlip, onExplain }) => {
    return (
        <div
            className="relative w-full h-72 sm:h-80 perspective cursor-pointer"
            onClick={onFlip}
            aria-label="Flip card"
            role="button"
            tabIndex="0"
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${isFlipped ? 'rotate-y-180' : ''
                    }`}
            >
                <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-2xl flex items-center justify-center p-6 text-xl sm:text-2xl font-semibold shadow-lg">
                    {question}
                </div>
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center p-6 text-xl sm:text-2xl font-semibold shadow-lg">
                    {answer}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onExplain();
                        }}
                        className="absolute bottom-4 right-4 px-4 py-2 bg-yellow-400 text-gray-800 rounded-full hover:bg-yellow-500"
                    >
                        Explain <FaMagic />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
