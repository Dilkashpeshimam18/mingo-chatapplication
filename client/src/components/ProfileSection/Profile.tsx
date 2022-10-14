import React from 'react'
import './Profile.css'
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VideocamIcon from '@mui/icons-material/Videocam';
import Divider from '@mui/material/Divider';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
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
     <div className='profile-sub'>
      <div className='profile-sub-inner'>
      <span className='profile-sub-icon'>
      <PersonOutlineOutlinedIcon style={{fontSize:'25px', color:'gray'}}/>   
        </span>
        <p className='profile-sub-text'>   View Friends</p>

     </div>
     <div className='profile-sub-inner'>
      <span className='profile-sub-icon'>
        <GroupAddOutlinedIcon style={{fontSize:'25px', color:'gray'}} />
      </span>
      <p className='profile-sub-text'>  Create Room</p>


     </div>
     <div className='profile-sub-inner'>
      <span className='profile-sub-icon'>
        <LogoutOutlinedIcon style={{fontSize:'25px', color:'gray'}} />
      </span>
      <p className='profile-sub-text'>   Logout</p>


     </div>
      </div>
      <div className="profile-media">
        <div className='profile-media-header'>
        <h3 className='profile-title'>
          Media
        </h3>
        </div>
        <div className='media-image-container'>
          <img className='media-image' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' />
          <img className='media-image' src='https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?b=1&k=20&m=517188688&s=612x612&w=0&h=x8h70-SXuizg3dcqN4oVe9idppdt8FUVeBFemfaMU7w=' />
          <img className='media-image' src='https://media.istockphoto.com/photos/image-of-open-antique-book-on-wooden-table-with-glitter-overlay-picture-id1354441996?b=1&k=20&m=1354441996&s=170667a&w=0&h=O4JDagXhIh1N13PNN6G4_L5KB5QPZryin7FOrZnzYvc=' />
          <img className='media-image' src='https://media.istockphoto.com/photos/image-of-open-antique-book-on-wooden-table-with-glitter-overlay-picture-id1354441996?b=1&k=20&m=1354441996&s=170667a&w=0&h=O4JDagXhIh1N13PNN6G4_L5KB5QPZryin7FOrZnzYvc=' />
          <img className='media-image' src='https://b.rgbimg.com/users/j/jo/johnnyberg/600/n8pqYs8.jpg' />
          <img className='media-image' src='https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws=' />

        </div>
        <div className='media-btn'>
          <button className='media-viewAll'>View all</button>
        </div>
      </div>
   
     </div>
  )
}

export default Profile