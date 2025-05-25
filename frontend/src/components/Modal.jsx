import React, { useEffect } from 'react';

/**
 * Accessible modal component
 * Props:
 *  - isOpen: boolean to control visibility
 *  - onClose: function to handle close action
 *  - title: string for header title
 *  - children: modal body content
 */
const Modal = ({ children, isOpen, onClose, title }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto pt-10 pb-10"
      onClick={onClose} // close when clicking overlay
    >
      <div
        className="relative w-full max-w-2xl p-4 mx-2 bg-white rounded-lg shadow-lg dark:bg-white-700 mt-10 mb-10"
        onClick={e => e.stopPropagation()} // prevent click inside modal from closing
      >
        {/* Header */}
        <header className="flex items-center justify-between pb-2 mb-4 border-b dark:border-gray-100">
          <h3 id="modal-title" className="text-lg font-medium text-gray-900 ">
            {title}
          </h3>
          <button
            type="button"
            aria-label="Close modal"
            className="p-1 text-gray-400 rounded hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white focus:outline-none"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>
        {/* Body */}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
