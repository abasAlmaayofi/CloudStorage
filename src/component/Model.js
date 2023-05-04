import React from 'react'

const Model = ({linkURL}) => {
  return (
    <iframe target="_parent" className='w-full h-screen' src={linkURL} ></iframe>
  )
}

export default Model