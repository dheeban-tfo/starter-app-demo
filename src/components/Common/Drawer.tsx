import React, { Fragment } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed inset-0 overflow-hidden z-50 ${!isOpen && 'pointer-events-none'}`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 sm:px-6">
              <h2
                className="text-xl font-semibold text-gray-900 dark:text-white"
                id="slide-over-title"
              >
                {title}
              </h2>
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={onClose}
              >
                <span className="sr-only">Close panel</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="relative flex-1 px-4 sm:px-6 pb-6">
              <div className="absolute inset-0 px-4 sm:px-6 overflow-y-auto py-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};