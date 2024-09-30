import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaShare } from "react-icons/fa";


function SharedPlaylist() {
  const navigate = useNavigate()
  const [cardData, setCardData] = useState([])  // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/playlist/')
        const { playLists } = response.data // Destructure the playLists array from the response data
        setCardData(playLists) // Set the card data to the playLists array
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const handleShareClick = () => {
    navigate('/share')
  }

  return (
    <>
      <div className='px-8 py-4 select-none flex justify-between'>
        <h1 className='text-2xl md:text-4xl text-black font-[700] text-nowrap'>
          Shared Playlists
        </h1>

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


      <div className='flex gap-8 text-black font-semibold select-none flex-wrap p-6 md:px-16 md:py-6 w-full'>
        {cardData.length > 0 ? (
          cardData.map((item) => (
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
