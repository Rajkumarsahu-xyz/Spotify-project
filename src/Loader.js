
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Loader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  // const location = useLocation();

  useEffect(() => {
    // Simulate a delay or asynchronous task (e.g., fetching data)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      {loading ? (
        <span className='loader'></span>
      ) : (
        children
      )}
    </div>
  );
};

export default Loader;
