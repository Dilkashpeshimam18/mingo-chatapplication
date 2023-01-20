import React from 'react'
import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = () => {
  return (
    <div className='search-bar'>
      <SearchIcon sx={{ width: 20, height: 18, color: 'gray' }} className='search-icon' />
      <input className='search-input' placeholder='Search room...' />

    </div>
  )
}

export default SearchBar