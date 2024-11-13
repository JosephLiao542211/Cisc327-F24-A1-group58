import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      setErrorMessage('Error fetching users');
    }
  };

  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      setSelectedUser(response.data);
    } catch (error) {
      setErrorMessage('Error fetching user');
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post('/api/users', { name: newUserName });
      setUsers([...users, response.data]); // Add new user to the list
      setNewUserName(''); // Clear input
    } catch (error) {
      setErrorMessage('Error creating user');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id)); // Remove deleted user
    } catch (error) {
      setErrorMessage('Error deleting user');
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      {/* Display Error */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* List of Users */}
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name}
            <button onClick={() => fetchUserById(user._id)}>View</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Create User */}
      <h2>Create User</h2>
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Enter user name"
      />
      <button onClick={createUser}>Add User</button>

      {/* Selected User Details */}
      {selectedUser && (
        <div>
          <h2>User Details</h2>
          <p>ID: {selectedUser._id}</p>
          <p>Name: {selectedUser.name}</p>
        </div>
      )}
    </div>
  );
};

export default Test;
