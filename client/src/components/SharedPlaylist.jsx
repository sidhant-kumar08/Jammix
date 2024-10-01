import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaShare } from "react-icons/fa";
import { SearchIcon } from 'lucide-react';


function SharedPlaylist() {
  const navigate = useNavigate()
  const [cardData, setCardData] = useState([])  // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jammix.onrender.com/playlist/')
        const { playLists } = response.data // Destructure the playLists array from the response data
        setCardData(playLists)
        console.log(cardData);
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const handleShareClick = () => {
    navigate('/share')
  }




  const [filter, setFilter] = useState('')

  function handleFilterChange (e){
    setFilter(e.target.value);
  }

  return (
    <>
      <div className='px-8 py-4 select-none flex flex-col md:flex-row gap-4 justify-between'>
        <div>
        <h1 className='text-2xl md:text-4xl text-black font-[700] text-nowrap'>
          Shared Playlists
        </h1>
        </div>

        <div className='relative'>
            <input type="text" className='border border-zinc-300 w-full md:min-w-96 rounded-xl bg-transparent px-4 pl-12 py-2 ' value={filter} onChange={handleFilterChange} placeholder='Search by name' />
            <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
        </div>

        <div className='hidden md:block'>
          <button
            onClick={handleShareClick}
            className='bg-black flex items-center gap-2 text-nowrap text-white hover:bg-zinc-700 rounded-lg px-2 py-2 font-[500] text-sm'
          >
            Share Playlist
            <FaShare />
          </button>
        </div>
      </div>

      


      <div className='flex gap-8 text-black font-semibold select-none flex-wrap p-6 md:px-24 md:py-6 w-full'>
        {cardData.length > 0 ? (
          cardData.filter((item) => item.title.toLowerCase().includes(filter.toLowerCase())).map((item) => (
            <Card key={item._id} data={item} />  // Pass the playlist data to Card component
          ))
        ) : (
          <p>No playlists shared yet.</p>
        )}
      </div>
    </>
  )
}

export default SharedPlaylist
