import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Login from './login'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dhun Jam Entertainment</title>
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
