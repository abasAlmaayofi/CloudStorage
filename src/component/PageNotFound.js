import React from 'react';
import { Link } from 'react-router-dom';


const PageNotFound = () => {
  return (
    <>
        <div className='text-center  relative mt-20'>
            <p className='text-red-900 uppercase text-3xl'>Page Not Found | 404 error</p>
            <Link className='text-logo-blue underline capitalize mt-5' to='/'>return back to home page</Link>
        </div>
    </>
    
  )
}

export default PageNotFound;