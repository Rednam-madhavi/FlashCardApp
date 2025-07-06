import React from 'react';

const ErrorMessage = ({ error }) =>
    error ? (
        <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-xl w-full">
            {error}
        </div>
    ) : null;

export default ErrorMessage;
