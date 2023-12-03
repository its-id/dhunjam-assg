import { createContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getUser, updateUser, userLogin } from '../services/userService';

const AppContext: any = createContext(null);

export const AppProvider = ({ children }: any) => {
  const [userId, setUserId]: any = useState(null);
  const [user, setUser]: any = useState(null);
  const [graphData, setGraphData]: any = useState(null);
  const [isAuthenticated, setIsAuthenticated]: any = useState(false);

  const login = async (payload: any) => {
    const res: any = await userLogin(payload);
    if (res.data && res.data.status === 200) {
      localStorage.setItem('userId', res.data.data.id);
      return res.data;
    } else return res.err;
  };

  const logout = async () => {
    return await new Promise((resolve) => {
      localStorage.removeItem('userId');
      setUserId(null);
      setIsAuthenticated(false);
      resolve(true);
    });
  };

  const getUserData = async (userId: any) => {
    try {
      const { data: res }: any = await getUser(userId);
      if (res.status === 200) {
        setUser(res.data);
        await createGraphData(res.data.amount);
        return res.data;
      } else {
        return null;
      }
    } catch (err) {
      return { err: { message: 'Network Fail' } };
    }
  };

  const updateUserData = async (userId: any, payload: any) => {
    const res: any = await updateUser(userId, payload);
    if (res && res.data && res.data.status === 200) {
      const data = await getUserData(userId);
      return {
        status: 200,
        data: data
      };
    }
    else return res.err;
  };

  const createGraphData = async (data: any) => {
    return await new Promise((resolve) => {
      let graphData: any = [];
      Object.entries(data).forEach(([key, value]) => {
        graphData.push({
          name: key,
          value: value,
        });
      });
      setGraphData(graphData);
      resolve(graphData);
    });
  };

  const getUserId = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
      setIsAuthenticated(true);
      return userId;
    } else {
      return null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        graphData,
        setGraphData,
        login,
        logout,
        getUserId,
        getUserData,
        updateUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
