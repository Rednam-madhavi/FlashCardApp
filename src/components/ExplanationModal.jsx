import React from 'react';

const ExplanationModal = ({ explanation, onClose }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl max-w-lg w-full relative">
            <h3 className="text-2xl font-bold mb-4">Explanation</h3>
            <p className="text-gray-700 mb-6 max-h-60 overflow-y-auto">{explanation}</p>
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                aria-label="Close"
            >
                &times;
            </button>
        </div>
    </div>
);

export default ExplanationModal;
