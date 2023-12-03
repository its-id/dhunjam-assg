import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Toaster, toast } from 'react-hot-toast';
import eyeOpenIcon from '../../../public/icons/eye-open.svg';
import eyeCloseIcon from '../../../public/icons/eye-close.svg';
import AppContext from '../../context/AppContext';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const { login, getUserId }: any = useContext(AppContext);
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const res: any = getUserId();
    if (res) {
      router.push('/dashboard');
    }
  }, []);

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading('Logging in...', {
      style: {
        background: 'rgba(255, 255, 255,0.3)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
      },
    });
    const res = await login(credentials);
    if (res && res.status === 200) {
      toast.success('Logged in successfully!', {
        style: {
          background: 'rgba(255, 255, 255,0.3)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
      });
      router.push('/dashboard');
    } else {
      if (res && res.username && res.password.length) toast.error(`Username: ${res.username[0]}`, {
        style: {
          background: 'rgba(255, 255, 255,0.3)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
      });
      if (res && res.password && res.password.length) toast.error(`Password: ${res.password[0]}`, {
        style: {
          background: 'rgba(255, 255, 255,0.3)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
      });
    }
    toast.dismiss(toastId);
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='Username'
          onChange={handleChange}
          className='border bg-transparent text-white border-gray-300 rounded-md p-2 focus:border-white active:border-white'
        />
      </div>
      <div className='relative flex flex-col gap-2'>
        <input
          type={showPassword ? 'text' : 'password'}
          name='password'
          id='password'
          placeholder='Password'
          onChange={handleChange}
          className='border bg-transparent text-white border-gray-300 rounded-md p-2 focus:border-white active:border-white'
        />
        {/* add an eye icon */}
        {showPassword ? (
          <Image
            className='absolute w-5 h-5 cursor-pointer right-2 top-3'
            src={eyeCloseIcon}
            alt='eye-icon'
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <Image
            className='absolute w-5 h-5 cursor-pointer right-2 top-3'
            src={eyeOpenIcon}
            alt='eye-icon'
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      <button
        onClick={handleSubmit}
        className='bg-[#6741D9] mt-6 text-white rounded-md p-2'
      >
        Sign in
      </button>
      <a href='#' className='text-white self-center'>
        New Registration?
      </a>
      <Toaster />
    </div>
  );
};

export default LoginForm;
