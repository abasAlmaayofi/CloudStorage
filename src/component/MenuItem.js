import { Close } from '@mui/icons-material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthDetails';

const MenuItem = ({showMenu, active}) => {
    const [activeNavButton, setActiveNavButton] = useContext(AuthContext).activeNavButton;
  return (
            <ul className={active ? 'z-10 flex-col text-white flex items-center fixed bg-black/40 backdrop-blur-lg justify-center gap-8 left-1/4 inset-0 p-8 md:hidden' : 'hidden'}>
                <Close  className='cursor-pointer hover:text-logo-blue' onClick={showMenu}/>
                <li className={`text-center hover:border-b-4 border-logo-blue ${activeNavButton[0] ? 'border-b-4' : ''}`} onClick={() => {setActiveNavButton([true, false, false])}}>
                    <Link to="/">الصفحة الرئيسية</Link>
                </li>
                {/* <li className={`text-center hover:border-b-4 border-logo-blue ${activeNavButton[1] ? 'border-b-4' : ''}`}onClick={() => {setActiveNavButton([false, true, false])}}>
                    <Link to="/About">About</Link>
                </li> */}
                <li className={`bg-logo-blue rounded-md p-4 border-2  cursor-pointer hover:bg-white border-2 border-logo-blue hover:text-logo-blue hover:font-extrabold ${activeNavButton[2] ? 'bg-white text-logo-blue' : 'text-white'} `} onClick={() => {setActiveNavButton([false, false, true])}}>
                    <Link to="/signin">تسجيل الدخول  </Link>
                </li>
            </ul>
      
  )
}

export default MenuItem