import storage from './storage';

export const setAuthToken = async (token: string) => {
  await storage.setItem('userToken', token);
};

export const getAuthToken = async () => {
  return await storage.getItem('userToken');
};

export const removeAuthToken = async () => {
  await storage.removeItem('userToken');
};

export const setUserData = async (userData: any) => {
  await storage.setItem('userData', JSON.stringify(userData));
};

export const getUserData = async () => {
  const data = await storage.getItem('userData');
  return data ? JSON.parse(data) : null;
};