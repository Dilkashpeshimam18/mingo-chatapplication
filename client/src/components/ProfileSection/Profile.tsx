import React from 'react'
import './Profile.css'
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VideocamIcon from '@mui/icons-material/Videocam';
import Divider from '@mui/material/Divider';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Facebook } from 'react-bootstrap-icons';

const Profile = () => {
  return (
    <div className='profile'>
        <div className='profile-search-bar'>
        <SearchIcon sx={{ width: 20, height: 18, color:'gray' }} className='search-icon'/>
        <input className='profile-search-input' placeholder='Search People' />
        
    </div>
      <div className='profile-image'>
      <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"   sx={{ width: 140, height: 140 }}/> 

      </div>
     <div className="profile-detail">
      <h2 className='profile-name'>Gran David</h2>
      <h5 className='profile-bio'>Senior Developer</h5>
     

     </div>

     <div className='profile-connect-options'>
      <div className='profile-connect-sub1'>
      <ChatBubbleIcon style={{fontSize:"25px", color:"#007FFF"}} />

      </div>
      <Divider className='profile-divider' orientation="vertical" flexItem />


      <div className='profile-connect-sub2'>
      <VideocamIcon style={{fontSize:"30px", color:"#007FFF"}} />

      </div>
     </div>
     {/* <div className="profile-social">
      <FacebookIcon style={{fontSize:"25px"}} />
      <InstagramIcon style={{fontSize:"25px"}} />
      <LinkedInIcon style={{fontSize:"25px"}} />
      <TwitterIcon style={{fontSize:"25px"}} />
     </div> */}
     </div>
  )
}

export default Profile