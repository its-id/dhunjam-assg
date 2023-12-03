import Head from 'next/head';
import LoginForm from '../../components/common/LoginForm';

const LoginPage = () => {

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Head>
        <title>Dhun Jam Entertainment | Login</title>
      </Head>
      <div className='w-[600px] flex-shrink-0 mx-auto flex flex-col gap-12 justify-center items-center'>
        <p className='text-[32px] font-semibold'>Venue Admin Login</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
