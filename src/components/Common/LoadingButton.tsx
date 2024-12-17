import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  isLoading: boolean;
  text: string;
  loadingText: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  text,
  loadingText,
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
};