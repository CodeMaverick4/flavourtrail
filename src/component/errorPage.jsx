import React from 'react'

export default function ErrorPage({err}) {
  return (
    <div className='flex justify-center items-center  h-screen '>
        <div className='flex justify-center items-center rounded-lg w-[20%] h-[20%] bg-red-400 text-red-700' >
            {err}
        </div>
      
    </div>
  )
}
