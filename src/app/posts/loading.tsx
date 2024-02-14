import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <Image
        width={200}
        height={200}
        alt='loading icon'
        src='/icons/react-original.svg'
        className='animate-bounce'
      />
      <h2 className='text-center'>Loading...</h2>
    </div>
  )
}
