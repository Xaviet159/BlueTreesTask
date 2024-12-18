import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks';

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/allTasks`);
  return response.data;
};

export const createTask = async (title, endDate) => {
  const response = await axios.post(`${API_URL}/create`, { title, endDate });
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTask = async (id, updates) => {
  const response = await axios.put(`${API_URL}/${id}`, updates);
  return response.data;
};