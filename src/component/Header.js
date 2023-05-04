import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton } from '@mui/material';
import { AuthContext } from './AuthDetails';


const Header = () => {
    const [active, setActive] = useState(false);
    const [activeNavButton, setActiveNavButton] = useContext(AuthContext).activeNavButton;
    const showMenu = () => {
        setActive(!active);
    }
  return (
    <div className='fixed z-10 w-full  bg-gray-800 border-b border-gray-800 text-xl shadow-md text-black flex  justify-between p-4 items-center'>
        <div className='ml-2 bg-logo-image bg-cover bg-center h-10 w-32'>
        </div>

        <nav className='mr-10 text-center flex items-center'>

            <div className='absolute md:hidden scale-150'>
                <IconButton style={{color:"white"}}><MenuIcon onClick={showMenu}/></IconButton>
            </div>

            <ul className='hidden md:flex gap-16 items-center justify-center'>
                
                    <li className={`${activeNavButton[0] ? 'text-center border-b-4 border-logo-blue': 'text-center hover:border-b-4 hover:border-logo-blue' }`} onClick={() => setActiveNavButton([true, false])}>
                    <Link to="/">
                        <Button variant='text' sx={{fontSize: 18, color: "white"}}>
                              الصفحة الرئيسية 
                        </Button>
                     </Link>
                    </li>
                
                {/* <li className={`${activeNavButton[1] ? 'text-center border-b-4 border-logo-blue': 'text-center hover:border-b-4 hover:border-logo-blue' }`} onClick={() => setActiveNavButton([false, true])}>
                    <Link to="/about">
                        <Button variant='text' sx={{fontSize: 18, color: "white"}}>
                        معلومات عن الموقع 
                        </Button>
                     </Link>
                </li> */}
                <li onClick={() => setActiveNavButton([false, false, true])}>
                    <Link to="/signin">
                        <Button variant={`${activeNavButton[2] ? 'outlined' : 'contained'}`} sx={{fontSize: 22, backgroundColor: (activeNavButton[2] ? "white" : "")}} >
                        تسجيل الدخول                        
                        </Button>
                     </Link>
                </li>
            </ul>

            <MenuItem activeNavButton={activeNavButton} showMenu={showMenu} active={active}/>

        </nav>

    </div>
  )
}

export default Header