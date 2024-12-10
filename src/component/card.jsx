import React from 'react';
import { Link } from 'react-router-dom';

export default function RecepiCard({recipeId, imgAddress, recepiTitle, prepTime, recepiType }) {
  return (
    <Link to={`recipe/${recipeId}`}  className='rounded-md bg-white flex flex-col gap-4 p-3 shadow-lg w-72 min-h-[318px] cursor-pointer hover:scale-105 transition-all duration-300 group'>
      {/* Image */}
      <div className='relative h-40'>
        <img src={imgAddress} alt="" className='w-full h-full object-cover rounded-md' />
      </div>

      {/* Recipe Title */}
      <div className='flex flex-grow items-center'>
        <p className='group-hover:font-semibold break-words whitespace-normal'>{recepiTitle}</p>
      </div>

      {/* Divider */}
      <div className='border border-gray-400'></div>

      {/* Prep Time and Recipe Type */}
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          <div className='p-1 rounded-full bg-gray-500'></div>
          <span>{prepTime} min</span>
        </div>

        <div className='flex gap-2 items-center'>
          {recepiType ? (
            <>
              <div className='p-1 rounded-full bg-green-400'></div>
              <span>Veg</span>
            </>
          ) : (
            <>
              <div className='p-1 bg-red-400'></div>
              <span>Non-Veg</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
