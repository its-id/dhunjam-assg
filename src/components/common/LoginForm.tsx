import React, { useState } from 'react';
import Image from 'next/image';
import eyeOpenIcon from '../../../public/icons/eye-open.svg';
import eyeCloseIcon from '../../../public/icons/eye-close.svg';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [showPassowrd, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    // <div className='w-full flex justify-center items-center text-base'>
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
          type={showPassowrd ? 'text' : 'password'}
          name='password'
          id='password'
          placeholder='Password'
          onChange={handleChange}
          className='border bg-transparent text-white border-gray-300 rounded-md p-2 focus:border-white active:border-white'
        />
        {/* add an eye icon */}
        {showPassowrd ? (
          <Image
            className='absolute w-5 h-5 cursor-pointer right-2 top-3'
            src={eyeCloseIcon}
            alt='eye-icon'
            onClick={() => setShowPassword(!showPassowrd)}
          />
        ) : (
          <Image
            className='absolute w-5 h-5 cursor-pointer right-2 top-3'
            src={eyeOpenIcon}
            alt='eye-icon'
            onClick={() => setShowPassword(!showPassowrd)}
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
    </div>
    // </div>
  );
};

export default LoginForm;
