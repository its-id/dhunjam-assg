import axios from 'axios';

export const userLogin = async (payload: any) => {
  try {
    const data = await axios.post(
      `https://stg.dhunjam.in/account/admin/login`,
      payload
    );
    return data;
  } catch (err: any) {
    return { err: err.response.data };
  }
};

export const getUser = async (userId: any) => {
  try {
    const data = await axios.get(
      `https://stg.dhunjam.in/account/admin/${userId}`
    );
    return data;
  } catch (err) {
    return { err: { message: 'Network Fail' } };
  }
};

export const updateUser = async (userId: any, payload: any) => {
  try {
    const data = await axios.put(
      `https://stg.dhunjam.in/account/admin/${userId}`,
      payload
    );
    return data;
  } catch (err: any) {
    return { err: err.response.data };
  }
};
