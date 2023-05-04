import { signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthDetails';
import { auth } from './firebase';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import FolderFileUpload from './FolderFileUpload';
import Header from './Header'; 
import UniData from '../constants/UniData.json'
import Footer from './Footer';

const UserPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(AuthContext).currentUser;   
    const UserSignOut = () => {
        if (window.confirm("Are you sure you want to sign out?") == true) {
            signOut(auth).then(()=> {
                navigate("/signin", {replace: true})
            }).catch((err) => {console.log(err)})
        }
    }
    useEffect(() => {
        if (currentUser === null) {
            navigate('/', {replace: true})
        }else{
        setTimeout(() => {
            signOut(auth).then(()=> {
                navigate("/signin", {replace: true})
            }).catch((err) => {console.log(err)})
        }, 14400000)
    }
    }, [])
    const goAboutPage = () => {
        navigate('/about', {replace: true});
    }
    const goHomePage = () => {
        navigate('/', {replace: true});
    }

    return (
        <>
        
        <div className='w-full flex flex-col justify-between h-screen bg-white/60'>
        <Header/>
                {/* <div className='bg-logo-blue'>
                    <ul>
                        <li onClick={goHomePage} className='flex gap-2 items-center justify-center p-4 border-b border-black text-white  text-xl hover:bg-gray-200 hover:text-black hover:border hover:border-white cursor-pointer'>
                            <HomeIcon/> 
                        </li>
                        <li onClick={goAboutPage} className='flex gap-2 items-center justify-center p-4 border-b border-black text-white  text-xl hover:bg-gray-200 hover:text-black hover:border hover:border-white cursor-pointer'>
                            <InfoIcon/> 
                        </li>
                        <li onClick={UserSignOut} className='flex gap-2 items-center justify-center p-4 border-b border-black text-white  text-xl hover:bg-gray-200 hover:text-black hover:border hover:border-white cursor-pointer'>
                            <LogoutIcon/>
                        </li>
                        <li className='flex gap-2 items-center justify-center p-4 border-b border-black text-white  text-xl hover:bg-gray-200 hover:text-black hover:border hover:border-white cursor-pointer'>
                            <InsertDriveFileIcon/>
                        </li>
                    </ul>
                </div> */}
        <div className='relative bg-white-200 w-full flex flex-col items-center justify-center top-28'>
            <div className='w-full flex justify-end'>
            <p className='rounded-md p-5 text-3xl text-black bg-gray-200 border-r-2 border-black m-2 mr-5'>حياك تركي</p>
            </div>
            <FolderFileUpload/>
        </div>
        </div>
        <Footer />
            
        </>
        
    )
}

export default UserPage