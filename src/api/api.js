import api from './axios';

// User Authentication
export const registerUser = async (userData) => {
  const { data } = await api.post('/users/register', userData);
  if (data.success && data.data) {
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  }
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post('/users/login', credentials);
  if (data.success && data.data) {
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  }
  return data;
};

export const getUserProfile = async () => {
  const { data } = await api.get('/users/profile');
  return data;
};

export const updateUserProfile = async (userData) => {
  const { data } = await api.put('/users/profile', userData);
  if (data.success && data.data) {
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  }
  return data;
};

// Products
export const getProducts = async (queryParams = {}) => {
  const params = new URLSearchParams(queryParams).toString();
  const { data } = await api.get(`/products${params ? `?${params}` : ''}`);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProductReview = async (productId, review) => {
  const { data } = await api.post(`/products/${productId}/reviews`, review);
  return data;
};

// Cart
export const getCart = async () => {
  const { data } = await api.get('/cart');
  return data;
};

export const addToCart = async (productId, quantity) => {
  const { data } = await api.post('/cart', { productId, quantity });
  return data;
};

export const updateCartItem = async (itemId, quantity) => {
  const { data } = await api.put(`/cart/${itemId}`, { quantity });
  return data;
};

export const removeFromCart = async (itemId) => {
  const { data } = await api.delete(`/cart/${itemId}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await api.delete('/cart');
  return data;
};

// Orders
export const createOrder = async (orderData) => {
  const { data } = await api.post('/orders', orderData);
  return data;
};

export const getUserOrders = async () => {
  const { data } = await api.get('/orders/myorders');
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const updateOrderToPaid = async (id, paymentResult) => {
  const { data } = await api.put(`/orders/${id}/pay`, paymentResult);
  return data;
};

// Admin - Users
export const getUsers = async () => {
  const { data } = await api.get('/admin/users');
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/admin/users/${id}`);
  return data;
};

export const updateUser = async (id, userData) => {
  const { data } = await api.put(`/admin/users/${id}`, userData);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/admin/users/${id}`);
  return data;
};

// Admin - Products
export const createProduct = async (productData) => {
  const { data } = await api.post('/admin/products', productData);
  return data;
};

export const updateProduct = async (id, productData) => {
  const { data } = await api.put(`/admin/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/admin/products/${id}`);
  return data;
};

// Admin - Orders
export const getAllOrders = async () => {
  const { data } = await api.get('/admin/orders');
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/admin/orders/${id}`, { status });
  return data;
};

// Admin - Analytics
export const getAnalytics = async () => {
  const { data } = await api.get('/admin/analytics');
  return data;
};
