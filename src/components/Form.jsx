import React, {useRef, useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Switch from '@mui/material/Switch';
import axios from 'axios'
import { FormControlLabel } from '@mui/material';

const Form = () => {

  const [value,setValue] = useState('')
  const [isAcad,setIsAcad] = useState(false)
  const ref = useRef('')
  const [data,setData] = useState({})

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
      // console.log(data.data);
      setData(response.data)
    })
    .catch((error) => {
      console.log(error);
    })

  }

  const handleChecked = (e) =>{
    setIsAcad(e.target.checked)
  }

  // if(isAcad){
  //   const newData = data.filter(item =>)
  // }

  // console.log(data,isAcad)

  return (
    <div className=" flex flex-col items-center mt-10 pb-12 justify-start h-screen">
        <Box
        component="form"
        
        noValidate
        autoComplete="off"
        className='w-1/2 '
        onSubmit={handleSubmit}
        >
        <TextField className='w-full rounded-xl' label="Search" variant="outlined" onChange={(e) =>{setValue(e.target.value)}}/>
        <FormControlLabel control={<Switch  checked={isAcad} onChange={handleChecked}/>} label="Academic"  />
        </Box>

        <Box className="max-w-2xl mt-4">
          {(data.hasOwnProperty('data') && data?.data.length > 0) && 
          <>
            <h1 className='text-lg mb-3'>{isAcad ? "Academic Result" : "Web Result"}</h1>
            {data?.data.map(item=>(
            <Box className="shadow-xl border p-4 mb-4 rounded-lg">
              <h1 className='font-semibold mb-2'>{item?.journal?.name}</h1>
              <h2 className='font-bold mb-2'>{item?.title}</h2>
              {/* {item?.authors?.length > 0 && item?.authors.map(author =>(
                <h3>{author?.name}</h3>
                ))} */}
              {item?.authors?.length > 0 &&
              <>
                <p>{item.authors[0].name}</p>
                <p>{item.authors[1].name}</p>
              </> 
              }
            </Box>
            ))}
          </>
          }
        </Box>
    </div>
  )
}

export default Form