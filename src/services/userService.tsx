import axios from 'axios';

export const login = async (payload: any) => {
  try {
    const data = await axios.post(
      `https://stg.dhunjam.in/account/admin/login`,
      payload
    );
    return data;
  } catch (err) {
    return { err: { message: 'Network Fail' } };
  }
};
