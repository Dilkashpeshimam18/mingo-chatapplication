import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import './Sidebar.css'
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
        </div>
  )
}

export default Sidebar