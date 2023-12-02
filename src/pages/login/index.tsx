import Head from 'next/head';
import Image from 'next/image';
import LoginForm from '../../components/common/LoginForm';

const Login = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Head>
        <title>Dhun Jam Entertainment | Login</title>
      </Head>
      <div className='flex shrink-0 flex-col gap-12 justify-center items-center flex-1'>
        <Image src={'/icons/logo.svg'} alt='logo' width={40} height={40} />
        <div className='w-full'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
