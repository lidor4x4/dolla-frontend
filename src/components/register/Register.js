import React, {useState} from 'react'
import { CFormInput } from '@coreui/react'
import Axios from 'axios'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const handleSignUp = () => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            name,
            email,
            password
        }

        Axios.post("https://dolla-backend.herokuapp.com/api/users", config).then(res => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token)
            window.location.href = "/"
        })
    }

    return (
    <div className='flex flex-col justify-center items-center w-screen h-screen bg-slate-100 m-0 p-0'>
        <div className='flex flex-col items-center w-[30rem] h-[32rem] rounded-md shadow-md border border-gray-400 border-solid bg-white'>
            <h1 className='text-xl font-bold mt-5'>Register</h1>
            <hr className='h-1 w-[100%] mt-4 mb-16' />
            <CFormInput type="text" id="floatingInputName" floatingLabel="Name" placeholder="Ben Dover" size='lg' className='mb-2' onChange={(e) => setName(e.target.value)} />
            <CFormInput type="email" id="floatingInputEmail" floatingLabel="Email Address" placeholder="name@example.com" size='lg' className='mb-2' onChange={(e) => setEmail(e.target.value)} />
            <CFormInput type="password" id="floatingInputPassword" floatingLabel="Password" placeholder="password" size='lg' onChange={(e) => setPassword(e.target.value)} />
            <button className='bg-blue-700 p-2 rounded-md text-white mt-4' onClick={handleSignUp} >Sign Up</button>
            <hr className='h-1 w-[100%] mt-4' />
            <a className='m-0 p-0' href='/accounts/login'>Have an account?</a>
            
        </div>
    </div>
  )
}
