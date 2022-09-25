import React, {useState} from 'react'
import { CFormInput } from '@coreui/react'
import Axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const handleSignUp = () => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            email,
            password
        }

        Axios.post("https://dolla-backend.herokuapp.com/api/users/login", config).then(res => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token)
            window.location.href = "/"
        })
    }

    return (
    <div className='flex flex-col justify-center items-center w-screen h-screen bg-slate-100 m-0 p-0'>
        <div className='flex flex-col items-center w-[30rem] h-[32rem] rounded-md shadow-md border border-gray-400 border-solid bg-white'>
            <h1 className='text-xl font-bold mt-5'>Login</h1>
            <hr className='h-1 w-[100%] mt-4 mb-16' />
            <CFormInput type="email" id="floatingInputEmail" floatingLabel="Email Address" placeholder="name@example.com" size='lg' className='mb-2' onChange={(e) => setEmail(e.target.value)} />
            <CFormInput type="password" id="floatingInputPassword" floatingLabel="Password" placeholder="password" size='lg' onChange={(e) => setPassword(e.target.value)} />
            <button className='bg-blue-700 p-2 rounded-md text-white mt-4' onClick={handleSignUp} >Login</button>
            <hr className='h-1 w-[100%] mt-4' />
            <a className='m-0 p-0' href='/accounts/register'>Don't have an account?</a>
            
        </div>
    </div>
  )
}
