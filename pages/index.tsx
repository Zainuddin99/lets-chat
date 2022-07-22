import type { NextPageWithLayout } from './_app'
import Head from 'next/head'
import Login from '../Components/Login/Login'
import styles from '../Components/Home/Home.module.scss'
import { ReactElement } from 'react'

const LoginPage: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lets chat</title>
        <meta name="Lets chat" content="Lets chat is the group chat app for free" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </div>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
    </>
  )
}

export default LoginPage
