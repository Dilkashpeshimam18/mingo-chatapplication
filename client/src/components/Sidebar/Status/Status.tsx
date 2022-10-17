import React from 'react'
import Avatar from '@mui/material/Avatar';
import './Status.css'


const Status = () => {
  return (
    <div className='status'>
      <div className='status-header'>
        <h3 className='status-title'>
          Status
        </h3>
      </div>

      <div className='all-status'>
        <div className='single-status'>
          <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" sx={{ width: 45, height: 45 }} />
          <p className='status-name'>Suzi</p>

        </div>
        <div className='single-status'>
          <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" sx={{ width: 45, height: 45 }} />
          <p className='status-name'>Max</p>

        </div>
        <div className='single-status'>
          <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" sx={{ width: 45, height: 45 }} />
          <p className='status-name'>Stuart</p>

        </div>
        <div className='single-status'>
          <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" sx={{ width: 45, height: 45 }} />
          <p className='status-name'>Ray</p>

        </div>
        <div className='single-status'>
          <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" sx={{ width: 45, height: 45 }} />
          <p className='status-name'>John</p>

        </div>
        <div className='single-status'>
          <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" sx={{ width: 45, height: 45 }} />
          <p className='status-name'>Andrena</p>

        </div>

      </div>

    </div>
  )
}

export default Status