import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const Popup = (props) => {
    const {show ,setShow} = props
    const [value,setValue] = useState('')

   const [data,setData] = useState([])

    
  const handleSubmit = async(e) => {
    e.preventDefault()

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.gyanibooks.com/search_publication/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify({
        "keyword": value,
        "limit": "10"
      })
    };


    axios.request(config)
    .then((response) => {
      const data = response.data
      console.log(data);
      setData(response.data)
    })
    .catch((error) => {
      console.log(error);
    })

    console.log(isAcad)
  }



  return (
    <>
    {show &&
    <>
    <Box component="form" onSubmit={handleSubmit} className="rounded-xl h-[30rem] w-[28rem] bg-slate-100 z-10 fixed left-2 top-16 p-5 border-2  border-gray-700">
        <CloseIcon className='absolute right-2 top-2 cursor-pointer' onClick={() => setShow(false)}/>
        <h1 className='mb-4'>Popup</h1>
        <TextField className='w-full rounded-xl' label="Search" variant="filled" onChange={(e) =>{setValue(e.target.value)}}/>
    </Box>
    {/* {data && data?.data.length > 0 && data?.data.map(item=>(
            <Box>
              <h1>{item?.journal?.name}</h1>
              <h2>{item?.title}</h2>
              {item.authors.length > 0 && item?.authors.map(author =>(
                <h3>{author.name}</h3>
              ))}
            </Box>
    ))} */}
    </> 
    }
    </>
  )
}

export default Popup