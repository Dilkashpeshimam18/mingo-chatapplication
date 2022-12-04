import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const ProfileInput = () => {
    return (
        <div className='profile-input'>
            <div className='profile-search-bar'>
                <SearchIcon sx={{ width: 20, height: 18, color: 'gray' }} className='search-icon' />
                <input className='profile-search-input' placeholder='Search People' />

            </div>
        </div>
    )
}

export default ProfileInput