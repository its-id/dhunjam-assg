import Head from 'next/head';
import Dashboard from '../../components/common/Dashboard';

const DashboardPage = () => {

  return (
    <div className='w-full h-full flex justify-center my-10'>
      <Head>
        <title>Dhun Jam Entertainment | Dashboard</title>
      </Head>
      <div className='w-[600px] flex-shrink-0 mx-auto flex flex-col gap-6 items-center'>
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
