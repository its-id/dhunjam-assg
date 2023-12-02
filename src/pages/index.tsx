import type { NextPage } from 'next'
import Head from 'next/head'
import Login from './login'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dhun Jam Entertainment</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Dhun Jam enables guests at hospitality venues to request songs to DJs, live performers and artists'
        />
      </Head>
      <Login />
    </>
  );
}

export default Home
