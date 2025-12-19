// Mock authentication database stored in memory
// This allows the app to work without MongoDB
const bcrypt = require('bcryptjs');

let users = [];

// Initialize with demo users
const initializeMockUsers = async () => {
  const hashedPassword1 = await bcrypt.hash('password', 10);
  const hashedPassword2 = await bcrypt.hash('password', 10);

  users = [
    {
      _id: '1',
      name: 'Admin User',
      email: 'admin@admin.com',
      password: hashedPassword1,
      isAdmin: true,
      createdAt: new Date(),
    },
    {
      _id: '2',
      name: 'Regular User',
      email: 'user@user.com',
      password: hashedPassword2,
      isAdmin: false,
      createdAt: new Date(),
    },
  ];

  console.log('✓ Mock auth database initialized with demo users');
};

// Find user by email
const findUserByEmail = (email) => {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

// Find user by ID
const findUserById = (id) => {
  return users.find(u => u._id === id);
};

// Create new user
const createUser = (userData) => {
  const newUser = {
    _id: String(Date.now()),
    ...userData,
    createdAt: new Date(),
  };
  users.push(newUser);
  return newUser;
};

// Update user
const updateUser = (id, updateData) => {
  const userIndex = users.findIndex(u => u._id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updateData };
    return users[userIndex];
  }
  return null;
};

// Get all users (for admin)
const getAllUsers = () => {
  return users.map(u => ({
    _id: u._id,
    name: u.name,
    email: u.email,
    isAdmin: u.isAdmin,
    createdAt: u.createdAt,
  }));
};

// Delete user by email
const deleteUserByEmail = (email) => {
  const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  initializeMockUsers,
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  getAllUsers,
  deleteUserByEmail,
};
