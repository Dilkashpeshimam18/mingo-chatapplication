import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import './Sidebar.css'
import Status from './Status/Status'
import UserDetail from './UserDetail/UserDetail'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-userDetail'>
            <UserDetail />

        </div>
        <div className='sidebar-search'>
            <SearchBar />
        </div>
        <div className='sidebar-status'>
            <Status />

        </div>
        </div>
  )
}

export default Sidebar