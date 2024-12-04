import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation from react-router-dom

// Create the context
const Context = createContext();

// The ContextManager component that provides the context to its children
const ContextManager = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to store any error
  const location = useLocation(); // Get the current location object

  // Function to fetch user data by ID
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUser(data); // Update user state with the fetched data
    } catch (err) {
      console.error('Error fetching user:', err);
      setUser({ firstName: 'Default', lastName: 'User' }); // Set a default user if not found
      setError('Error fetching user');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Update context value when the URL changes
  useEffect(() => {
    const userId = location.pathname.split('/').pop(); // Get user ID from URL path
    if (userId) {
      fetchUserData(userId); // Fetch user data based on the ID in the URL
    }
  }, [location]);  // The effect runs every time the URL changes

  // Provide the context with user data, loading, and error states
  return (
    <Context.Provider value={{ user, loading, error }}>
      {children}
    </Context.Provider>
  );
};

export { ContextManager, Context };
