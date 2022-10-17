import React from 'react'
import './MainBody.css'
import Header from './MainBodyHeader/Header'
import Divider from '@mui/material/Divider';


const MainBody = () => {
  return (
    <div className='mainbody'>
      <Header />
      <Divider variant='inset' />

    </div>
  )
}

export default MainBody