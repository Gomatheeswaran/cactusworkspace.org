import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from 'react-redux';

const UserManagement = ({token}) => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Adjust the URL
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to add a new user
  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, userData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
      // Clear the form fields after adding a user
      setUserData({
        username: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Handle user edit
  const handleEditUser = async (userId) => {
    // Implement edit logic here
  };

  // Handle user delete
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Adjust the URL
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={userData.role}
          onChange={handleInputChange}
        />
        <button type="submit">Add User</button>
      </form>
      {/* Render the list of users */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.email}
            <button onClick={() => handleEditUser(user._id)}>Edit</button>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// export default UserManagement;
const mapStateToProps = (state) => ({
  user: state.user.user,
  token: state.token.token
});

export default connect(mapStateToProps)(UserManagement);
