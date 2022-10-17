import React from 'react'
import './MainBody.css'
import Header from './MainBodyHeader/Header'
import Divider from '@mui/material/Divider';
import ChatSection from './MainBodySection/ChatSection';
import Footer from './MainBodyFooter/Footer';


const MainBody = () => {
  return (
    <div className='mainbody'>
      <Header />
      <Divider variant='inset' />
      <ChatSection />
      <Divider variant='middle' />

      <Footer />

    </div>
  )
}

export default MainBody