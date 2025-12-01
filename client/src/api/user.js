import api from "./axios";

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
