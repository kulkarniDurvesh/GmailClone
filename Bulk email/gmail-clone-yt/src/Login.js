import React from 'react'
import "./css/login.css"
import { auth, provider } from './firebase'
import { useDispatch } from 'react-redux'
import { signin } from './features/userSlice';
function Login() {
    const dispatch = useDispatch();
    const login = () =>{
       auth.signInWithPopup(provider).then(({user})=>{
            dispatch(signin({
                displayName:user.displayName,
                photoURL:user.photoURL,
                email:user.email    
            }))
       }).catch((error)=>{
        alert(error)
       })
    }
  return (
    <div className='loginwrapper'>
        <div className='login'>
            <img src={process.env.PUBLIC_URL + '/download.png'} />
       
        
        <button className='gmail_login' onClick={login}>Login with Gmail</button>

    </div>
    </div>
  )
}

export default Login