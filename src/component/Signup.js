import React, { useState } from 'react'
import Header from './Header'
import signinImage from "../assets/signinImage.jpg";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import CheckIcon from '@mui/icons-material/Check';


const Signup = () => {
    const styles = {'inputStyle': 'p-2 border-2  rounded-xl mt-8 text-logo-blue'};

    const [showpassword, setShowPassword] = useState();
    const [showconfirmpassword, setShowConfirmPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const showPasswordFunction = () => {
        setShowPassword(!showpassword);
    }
    const ShowConfirmPassword = () => {
        setShowConfirmPassword(!showconfirmpassword)
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasswordFlag,  setConfirmPasswordFlag] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
                console.log(userCredential);
        }).catch((err) => {
            console.log(err);
        })
    }

  return (
    <>
        <Header/>
        <section className='h-screen w-full flex items-center justify-center'>
            <div className='bg-gray-200 flex rounded-2xl shadow-lg max-w-2xl mt-20 h-200 p-3'>
                <div className='w-full px-8'>
                    <h1 className='font-bold text-2xl text-logo-blue'>Sign Up</h1>
                    <p className='text-xs mt-4 text-logo-blue'>Create new account!</p>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='flex gap-1 items-center'>
                            <div className='relative'>
                                <input onChange={(e) => {setFirstName(e.target.value)}} className={`${styles.inputStyle} ${firstName ? 'border-green-800' : 'outline-red-500'}`} name="first_name" value={firstName} placeholder='First Name'/>
                                {firstName && <CheckIcon className='text-green-800 font-sm absolute top-10 right-3'/>}
                            </div>
                            <div className='relative'>
                                <input onChange={(e) => {setLastName(e.target.value)}} className={`${styles.inputStyle} ${lastName ? 'border-green-800' : 'outline-red-500'}`} name="first_name" value={lastName} placeholder='First Name'/>
                                {lastName && <CheckIcon className='text-green-800 font-sm absolute top-10 right-3'/>}
                            </div>
                        </div>
                        <input 
                        className='p-2 border rounded-xl outline-gray-500 text-logo-blue' 
                        type="email" 
                        name="email" 
                        placeholder='Email'
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        
                        />
                        <div className='relative'>
                        <input 
                        className='p-2 border rounded-xl w-full outline-gray-500 text-logo-blue' 
                        type={showpassword ? 'text': 'password'} 
                        name="password" 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        />
                        {showpassword ? (<VisibilityIcon onClick={showPasswordFunction} className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2  text-gray-400'/>) :  (<VisibilityOffIcon onClick={showPasswordFunction} className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2  text-gray-400'/>)}
                        </div>
                        <div className='relative'>
                        <input 
                        className='p-2 border rounded-xl w-full outline-gray-500 text-logo-blue' 
                        type={showpassword ? 'text': 'password'} 
                        name="confirm_password" 
                        placeholder='confirm_password'
                        onChange={(e) => {(e.target.value === password) ? setConfirmPasswordFlag(true) : setConfirmPasswordFlag(false)}}
                        />
                        {showconfirmpassword ? (<VisibilityIcon onClick={ShowConfirmPassword} className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2  text-gray-400'/>) :  (<VisibilityOffIcon onClick={ShowConfirmPassword} className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2  text-gray-400'/>)}
                        </div>
                
                        <button className='bg-logo-blue rounded-xl text-white py-2'>Login</button>
                    </form>
    

                </div>
            </div>
        </section>
    </>
    
  )
}

export default Signup
