import React from 'react'
import Header from './Header'
import { Container } from '@mui/material'
import Footer from './Footer'

const About = () => {
  return (
    <div>
        <Header/>
        <div className='relative top-32 h-screen'>
            <h1 className='text-3xl tracking-wide m-4 pb-5 text-right border-b-2 border-gray-200'></h1>
            <p className='text-gray-900 text-right border-r border-logo-blue text-2xl md:w-1/2 w-2/3 space-wrap '>حياتي لكم جميعا ،

هذا الموقع غير ربحي يهدف إلى مساعدة طلاب القانون في الكويت من أجل تعزيز دراساتهم والوصول إلى درجات عالية في دوراتهم.

الموقع من تصميم وتصميم عباس المعيوفي وبتمويل تركي فواز الضفيري.</p>
        </div>
        <Footer/>
    </div>
  )
}

export default About