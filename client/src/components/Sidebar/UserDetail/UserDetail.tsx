import React from 'react'
import './UserDetail.css'
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';


const UserDetail = () => {
  return (
    <div className='user-detail'>
        <div className='user-image'>
        <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"   sx={{ width: 56, height: 56 }}
/> 

        </div>
              <div className='user-name'>
                <span className='name'>Gran David </span><br></br>
                 <span className='bio'>Senior Developer</span>

              </div>
              <div className='user-edit'>
                    <EditIcon style={{fontSize:"19px", color:"black"}}/>

                </div>
 
    </div>
  )
}

export default UserDetail