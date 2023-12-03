import React, { useState, PureComponent, useContext, useEffect } from 'react';

import { Toaster, toast } from 'react-hot-toast';
import AppContext from '../../context/AppContext';
import { useRouter } from 'next/router';
import BarChartComponent from './BarChartCompnent';

const Dashboard = () => {
  const {
    user,
    setUser,
    logout,
    userId,
    getUserId,
    getUserData,
    graphData,
    setGraphData,
    updateUserData,
  }: any = useContext(AppContext);
  const router = useRouter();

  const [valid, setValid] = useState(true);

  //checking if user exists, if not redirecting to login page
  useEffect(() => {
    const res: any = getUserId();
    if (res) getUserData(res);
    else router.push('/login');
  }, []);

  const checkValid = () => {
    if (
      !graphData[0].value ||
      graphData[0].value < 99 ||
      !graphData[1].value ||
      graphData[1].value < 79 ||
      !graphData[2].value ||
      graphData[2].value < 59 ||
      !graphData[3].value ||
      graphData[3].value < 39 ||
      !graphData[4].value ||
      graphData[4].value < 19
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (e: any) => {
    const newUser = { ...user };
    const newGraphData = [...graphData];

    if (e.target.value) {
      newUser['amount'][e.target.name] = parseInt(e.target.value);
      newGraphData[e.target.name.split('_')[1] - 6].value = parseInt(
        e.target.value
      );
    } else {
      newUser['amount'][e.target.name] = e.target.value;
      newGraphData[e.target.name.split('_')[1] - 6].value = e.target.value;
    }

    setUser(newUser);
    setGraphData(newGraphData);
    setValid(checkValid());
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    toast
      .promise(
        logout(),
        {
          loading: 'Logging out...',
          success: <b>Logged out successfully!</b>,
          error: <b>Could not able to logout please try again!!</b>,
        },
        {
          style: {
            background: 'rgba(255, 255, 255,0.3)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          },
        }
      )
      .then((res) => {
        if (res) {
          router.push('/login');
        }
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      amount: user?.amount,
    };

    const toastId = toast.loading('Updating...', {
      style: {
        background: 'rgba(255, 255, 255,0.3)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
      },
    });
    const res = await updateUserData(userId, payload);

    if (res && res.status === 200)
      toast.success('Updated successfully!', {
        style: {
          background: 'rgba(255, 255, 255,0.3)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
      });
    else
      toast.error('Something went wrong please try again!!', {
        style: {
          background: 'rgba(255, 255, 255,0.3)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
      });

    toast.dismiss(toastId);
  };

  return (
    <>
      <p className='text-[32px] font-semibold'>
        {user?.name}, {user?.location} on Dhun Jam
      </p>
      <div className='w-full flex flex-col items-center text-base gap-6'>
        <button
          className='absolute right-4 top-4 bg-[#6741D9] text-white rounded-md p-2 text-xs'
          onClick={handleLogout}
        >
          Logout
        </button>
        <div className='w-full max-w-[600px] flex items-center justify-between'>
          <div className='w-fit max-w-[300px]'>
            <p>Do you want to charge your customers for requesting songs?</p>
          </div>
          <div className='w-fit max-w-[300px] mx-auto flex items-center justify-center gap-4'>
            <div className='w-1/2 flex items-center gap-2'>
              <input
                type='radio'
                name='charge_customers'
                id='yes-charge'
                defaultChecked={user?.charge_customers}
                className='accent-[#6741D9]'
                onClick={() => {
                  setUser({ ...user, charge_customers: true });
                  setValid(checkValid());
                }}
              />
              <label htmlFor='yes-charge'>Yes</label>
            </div>
            <div className='w-1/2 flex items-center gap-2'>
              <input
                type='radio'
                name='charge_customers'
                id='no-charge'
                defaultChecked={!user?.charge_customers}
                className='accent-[#6741D9]'
                onClick={() => {
                  setUser({ ...user, charge_customers: false });
                  setValid(false);
                }}
              />
              <label htmlFor='no-charge'>No</label>
            </div>
          </div>
        </div>
        <div className='w-full max-w-[600px] flex items-center justify-between'>
          <div className='w-fit max-w-[300px]'>
            <p>Custom song request amount -</p>
          </div>
          <div className='w-[299px]'>
            <input
              type='number'
              disabled={!user?.charge_customers}
              name='category_6'
              id='category_6'
              value={user?.amount?.category_6 ? user?.amount?.category_6 : ''}
              onChange={handleChange}
              className={`w-full border text-center bg-transparent ${
                user?.charge_customers
                  ? 'text-white border-gray-300'
                  : 'text-[#C2C2C2] border-[#C2C2C2]'
              } rounded-md p-2`}
            />
          </div>
        </div>
        <div className='w-full max-w-[600px] flex items-center justify-between'>
          <div className='w-fit max-w-[290px]'>
            <p>Regular song request amounts, from high to low -</p>
          </div>
          <div className='w-[300px] flex items-center justify-between gap-4'>
            {user &&
              graphData?.length &&
              graphData.map(({ name, value }: any, idx: number) => (
                <input
                  key={`charge_amount_${idx}`}
                  type='number'
                  name={name}
                  id={name}
                  value={value ? value : ''}
                  onChange={handleChange}
                  disabled={!user?.charge_customers}
                  className={`w-full border bg-transparent ${
                    user?.charge_customers
                      ? 'text-white border-gray-300'
                      : 'text-[#C2C2C2] border-[#C2C2C2]'
                  } rounded-md p-2`}
                />
              ))}
          </div>
        </div>
        {user?.charge_customers && <BarChartComponent />}
        <button
          onClick={handleSubmit}
          disabled={!valid}
          className={`w-full ${
            valid ? 'bg-[#6741D9]' : 'bg-[#C2C2C2] cursor-not-allowed'
          } mt-6 text-white rounded-md p-2`}
        >
          Submit
        </button>
        <Toaster />
      </div>
    </>
  );
};

export default Dashboard;
