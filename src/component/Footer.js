import React from 'react'
import {FaTwitter} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full bg-gray-800 flex flex-col gap-5 p-4'>
        <p className='text-center flex justify-center gap-2 text-white/80 text-md tracking-wide p-2'>
            <a href='https://twitter.com/bofawaz83?s=11&t=4eJas26mrRVgBsGtB1Bf4w' className='underline flex  items-center justify-center gap-2'><FaTwitter className='text-[#1DA1F2]'/> تركي  فواز الظفيري</a>هذا الموقع برعاية 
        </p>
        <p className='text-center flex justify-center gap-1 border-t-2 border-white text-gray-300 py-5 text-xs tracking-wide'>
            <a href='https://abasalmaayofi.github.io/portfolio/' className='underline flex items-center justify-center'>عباس المعيوفي &copy; </a> | جميع حقوق النشر محفوظة 
        </p>
    </div>
  )
}

export default Footer