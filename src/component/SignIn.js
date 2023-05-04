import React, { useState } from 'react'
import Header from './Header'
import signinImage from "../assets/signinImage.jpg";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { auth } from './firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { Alert, Button } from '@mui/material';






const SignIn = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [showpassword, setShowPassword] = useState();

    const showPasswordFunction = () => {
        setShowPassword(!showpassword);
    }

    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            navigate("/userpage", {replace: true});
        }).catch((err) => {
            setError(true);
        })
    }
    const handleRedirect = () => {
        navigate('/signup', {replace: true});
    }
  return (
    <>
        <Header/>
        <section className='h-screen w-full flex items-center justify-center'>
            <div className='bg-gray-200 rounded-2xl flex flex-col gap-3 justify-center shadow-lg max-w-2xl mt-20 h-200 p-3'>
            {error && <Alert severity="error">This is an error alert — check your email and password!</Alert>}
            <div className='flex w-full'>
    
                <div className='w-1/2 hidden md:block '>
                    <img className='rounded-md w-full h-full' src={signinImage} alt='SignIn_Image'/>
                </div>
                <div className='md:w-1/2 w-full px-8 flex flex-col justify-evenly'>
                    <h1 className='font-bold text-2xl text-logo-blue text-right'>تسجيل الدخول</h1>
                    <p className='text-xs mt-4 text-logo-blue text-right'>إذا كنت عضوًا بالفعل ، فقم بتسجيل الدخول بسهولة</p>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <input 
                        className='text-right p-2 border rounded-xl mt-8 outline-gray-500 text-logo-blue' 
                        type="email" 
                        name="email" 
                        placeholder='بريد إلكتروني'
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        
                        />
                        <div className='relative'>
                        {showpassword ? (<VisibilityIcon onClick={showPasswordFunction} className='cursor-pointer absolute left-2 top-1/2 -translate-y-1/2  text-gray-400'/>) :  (<VisibilityOffIcon onClick={showPasswordFunction} className='cursor-pointer absolute left-2 top-1/2 -translate-y-1/2  text-gray-400'/>)}
                        <input 
                        className='text-right p-2 border rounded-xl w-full outline-gray-500 text-logo-blue' 
                        type={showpassword ? 'text': 'password'} 
                        name="password" 
                        placeholder='كلمة المرور'
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        />
                        </div>
                
                        <Button type='submit' variant='contained' sx={{backgroundColor: '#145386', borderRadius: 5, fontSize: 15}}>تسجيل الدخول</Button>
                    </form>
                   
                    <div className='mt-5 grid grid-cols-3 items-center text-gray-400'>
                        <hr className='border-gray-400'/>
                        <p className='text-center text-xl'>أو</p>
                        <hr className='border-gray-400'/>
                    </div>
                    <div className='mt-4 flex items-center justify-evenly'>
                        <p className='outline-none text-gray-500 text-xs text-right'>هام: يسمح فقط للمسؤولين بتسجيل الدخول من خلال هذه البوابة</p>
                    </div>

                </div>
            </div>
            </div>
        </section>
        <Footer/>
    </>
    
  )
}

export default SignIn
