import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { motion } from "framer-motion";
import {FaTwitter} from 'react-icons/fa';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';


const Section = () => {
  // <a href='https://twitter.com/bofawaz83?s=11&t=4eJas26mrRVgBsGtB1Bf4w' className='underline flex items-center justify-center gap-2'><FaTwitter className='text-[#1DA1F2]'/> تركي  فواز الظفيري</a>هذا الموقع برعاية 
  return (
    <div className='bg-hero-image bg-black-400 w-full h-screen bg-cover bg-center flex flex-col items-center  justify-center border-b-2 border-gray-700 shadow-sm'>
      <div class="w-full h-full flex  justify-center items-center flex-col bg-black/70 backdrop-brightness-75 ">
        <div className='uppercase text-white font-extrabold text-center flex flex-col justify-center text-shadow items-center gap-10'>
            <h1 className='md:text-3xl text-white leading-relaxed text-black/70 text-xl tracking-wide px-3 w-full md:w-1/2'>تم إنشاء هذا الموقع لتسهيل البحث على الطلبه و التيسير لهم سألين المولى عز وجل لكم دوام التوفيق</h1>
            <h3 className='rounded text-white p-2 mt-4 text-black/70 tracking-wide text-lg px-3 max-w-1/2'>اليوم تدرس نصوص، وغداً تترافع عن نفوس  <ArrowLeftIcon/> </h3>
        </div>
        <motion.div 
        initial={{x:'-100vw'}}
        animate={{
          x:0,
          transition:{ delay: 0.5, type: 'spring', stiffness:120}
        }}
        whileHover={{
          y:10,
          transition: {duration: 0.08}
        }}
        className='z-0 relative uppercase font-extrabold  tracking-wide text-white text-lg  mt-20  border-black shadow-lg'>
            <a href='#notes_container' className='w-full h-full bg-logo-blue p-5 rounded-md '>
 <ArrowDownwardIcon/> إبحث في الملفات
            </a>
        </motion.div>
        </div>
    </div>
  )
}

export default Section