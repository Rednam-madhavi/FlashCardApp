import React from 'react';

const CardNavigator = ({ onPrev, onNext }) => (
    <div className="flex justify-between w-full mt-6 space-x-4">
        <button
            onClick={onPrev}
            className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-800"
        >
            Previous
        </button>
        <button
            onClick={onNext}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
            Next
        </button>
    </div>
);

export default CardNavigator;
