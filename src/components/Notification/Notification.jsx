import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, setMessage }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Update the message state to an empty string after 5 seconds
      setMessage('');
    }, 5000);

    // Clear the timeout when the component unmounts or when the message changes
    return () => clearTimeout(timeout);
  }, [message, setMessage]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
