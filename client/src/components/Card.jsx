import React from 'react'

function Card({ data }) {
  return (
    <>
      <div className='bg-[#F4F4F5] border border-zinc-200 rounded-2xl px-2 py-3 text-center font-sans shadow-md hover:scale-105 transition duration-100 ease-in-out'>
        <div>
            <img className='rounded-2xl md:h-44 md:w-44 h-72 w-72' src={data.image} alt={data.title} />
        </div>

        <div className='text-lg text-wrap'>
            <h2>{data.title}</h2>
        </div>

        <div>
          <a href={data.link} target='blank' className='text-blue-500 hover:text-blue-400'>{`Go to spotify >`}</a>
        </div>
      </div>



      
    </>
  )
}

export default Card
