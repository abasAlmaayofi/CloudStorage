import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {auth } from './firebase';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';







export const AuthContext = React.createContext();

const AuthDetails = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [activeNavButton, setActiveNavButton] = useState([true, false, false]);
    const passedDictionary = {currentUser: [currentUser, setCurrentUser], activeNavButton: [activeNavButton, setActiveNavButton]};
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);

    if(currentUser) {
        setTimeout(() => {
        signOut(auth).then(()=> {
            <Link to="/signin"/>
        }).catch((err) => {console.log(err)})
    }, 10800)
    }

    if (pending) {
        return (
        <div className='w-full h-screen flex items-center justify-center'>
            <CircularProgress size="8rem"/>
        </div>)
    }
    return (
    <AuthContext.Provider value={passedDictionary}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthDetails