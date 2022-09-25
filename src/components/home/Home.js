import React, {useEffect, useState} from 'react'
import Axios from "axios"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import {FaExclamationCircle} from "react-icons/fa"
import {IoTrashOutline} from "react-icons/io5"
import {FiClipboard} from "react-icons/fi"

export default function Home() {
    const [userID, setUserID] = useState("")
    const [snippets, setSnippets] = useState()
    const [loading , setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState('opacity-0');
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [code, setCode] = useState("")

    const isConnected = () => {
      if(localStorage.getItem("token") === null){
        window.location.href = "/accounts/register"
      }
      const config = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      Axios.get("https://dolla-backend.herokuapp.com/api/users/me", config).then(res => {
        setUserID(res.data.id)
      }).catch(error => {
        window.location.href = "/accounts/register"
      })
    }
  
    const getUserSnippets =() => {
      const config = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      Axios.get("https://dolla-backend.herokuapp.com/api/snippets/get-mine", config).then(res => {  
      setSnippets(res.data.snippets);
      
      
      }).finally(() => {
        setLoading(false);
      })
    }
  
    useEffect(() => {
      isConnected()
      getUserSnippets()
  }, []);

  const createSnippet = () => {
    const config = {
      headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
    }
    const bodyParameters = {
      title,
      description,
      code
    }
    
    Axios.post("https://dolla-backend.herokuapp.com/api/snippets/", bodyParameters, config).then(res => {
      console.log(res.data);
    }).catch(err => {
      window.location.reload();
      console.log("ds");
    })
  }  
  const delateAllUserSnippets = () => {
    const config = {
      headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
    }
    
    Axios.delete("https://dolla-backend.herokuapp.com/api/snippets/delete-mine", config).then((req) => {
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }

  const delateUserSnippet = (id) => {
    console.log(id)
    Axios.delete("https://dolla-backend.herokuapp.com/api/snippets/delete-snippet", { data: { id: id }, headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then(() => {window.location.reload()})
  }

  const submitDeleteAll = () => {

    confirmAlert({
      title: <FaExclamationCircle />,
      message: 'Are you sure you want to delete your snippets?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => delateAllUserSnippets()
        },
        {
          label: 'No',
          
        }
      ]
    });
  }

  const submitDeleteSnippet = () => {

    confirmAlert({
      title: <FaExclamationCircle />,
      message: 'Are you sure you want to delete this snippet?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => delateUserSnippet()
        },
        {
          label: 'No',
          
        }
      ]
    });
  }

  


    if(loading) return <div>Loading...</div>
    return (
    <div className='flex flex-col items-center m-0 p-0 h-screen w-screen bg-[#5BE9B9] font-main-font-family'>
          <div className='flex flex-row items-center mt-4 gap-4 p-0'>
            <button className='p-2 rounded-md bg-blue-600  mb-2 text-white cursor-pointer' onClick={() => setShowCreateForm(showCreateForm === "opacity-0" ? "opacity-1" : "opacity-0")}>Create a Snippet</button>
            <button className='p-2 rounded-md bg-red-600  mb-2 text-white cursor-pointer' onClick={submitDeleteAll}>Delete All Snippets</button>
          </div>
          <div className='flex flex-row mt-4' >
          <div className={`flex flex-col gap-2 ${showCreateForm} transition-opacity duration-300`} >
            <label className='text-center'>Title</label>
            <input className='rounded-md p-2 bg-[#E8E8E8] outline-none' onChange={(e) => {setTitle(e.target.value)}} />
            <label className='text-center'>description</label>
            <input className='rounded-md p-2 bg-[#E8E8E8] outline-none' onChange={(e) => {setDescription(e.target.value)}} />
            <label className='text-center'>Code</label>
            <textarea rows={10} cols={40} className='rounded-md p-2 bg-[#E8E8E8] outline-none'  onChange={(e) => {setCode(e.target.value)}} />
            <button className='p-2 rounded-md bg-green-500  mb-4 text-white cursor-pointer' onClick={createSnippet}>Create</button>
          </div>
        </div>
        <div className=' w-screen h[100%] flex items-center justify-center flex-col bg-[#5BE9B9]'>
          {snippets.map((snippet) => {
            return(
              <div key={snippet._id} className='flex flex-col items-center min-w-[24rem] w-auto h-auto bg-white rounded-md m-4 shadow-md relative'>
                <IoTrashOutline className='absolute top-2 right-2 cursor-pointer' size={28} onClick={() => {delateUserSnippet(snippet._id)}}/>
                <h1 className='mt-2 mb-0 '>{snippet.title} </h1>
                <hr className='h-1 w-[100%]' />
                <p className='w-[100%] text-center'>{snippet.description}</p>
                <hr className='h-1 w-[100%]' />
                <FiClipboard className='absolute bottom-5 right-2 cursor-pointer' size={28} onClick={() => {navigator.clipboard.writeText(snippet.code)}}/>
                <code className='w-[100%] mb-4 text-center'>{snippet.code}</code>                
              </div>
            )
          })}
        </div>
    </div>
  )
}

