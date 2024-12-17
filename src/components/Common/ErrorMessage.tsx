import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-red-700 dark:text-red-200">{message}</p>
        </div>
      </div>
    </div>
  );
};