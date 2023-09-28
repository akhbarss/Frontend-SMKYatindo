import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer, Header, HeaderFix } from '..';

const RootYayasan = () => {

  return (
    <>
      <ScrollRestoration />
      <Header />
      <HeaderFix />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootYayasan