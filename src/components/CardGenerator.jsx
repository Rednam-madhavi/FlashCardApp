import React from 'react';

const CardGenerator = ({
    topic,
    setTopic,
    onGenerate,
    isLoading,
    generatedCard,
    onAddCard,
    onCancel,
}) => {
    return (
        <div className="w-full flex flex-col gap-6">
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800">Generate New Flashcard</h2>

            {/* Input Form */}
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic (e.g., Artificial Intelligence)"
                    className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-sm"
                />
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="px-6 py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 disabled:opacity-50"
                >
                    {isLoading ? 'Generating...' : 'Generate Flashcard ✨'}
                </button>
            </div>

            {/* Generated Card Preview */}
            {generatedCard && (
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{generatedCard.question}</h3>
                    <p className="text-gray-700 text-lg">{generatedCard.answer}</p>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={onAddCard}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                            Add to Deck
                        </button>
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardGenerator;
