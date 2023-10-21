import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Switch from '@mui/material/Switch';
import axios from 'axios'
import { FormControlLabel } from '@mui/material';

const Form = () => {

  const [value,setValue] = useState('')
  const [isAcad,setIsAcad] = useState('off')
  
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

  // console.log(data)


  return (
    <div className=" flex flex-col items-center mt-10 justify-start h-screen">
        <Box
        component="form"
        
        noValidate
        autoComplete="off"
        className='w-1/2 '
        onSubmit={handleSubmit}
        >
        <TextField className='w-full rounded-xl' label="Search" variant="outlined" onChange={(e) =>{setValue(e.target.value)}}/>
        <FormControlLabel control={<Switch />} label="Academic" onChange={(e) =>{setIsAcad(e.target.value)}} />
        </Box>

        <Box >
          {data.length > 0 && 
          <>
            <h1>{isAcad == "off" ? "Web Result" : "Academic Result"}</h1>
            {data?.data.map(item=>(
            <Box>
              <h1>{item?.journal.name}</h1>
              <h2>{item?.title}</h2>
              {item.authors.length > 0 && item?.authors.map(author =>(
                <h3>{author.name}</h3>
                ))}
            </Box>
            ))}
          </>
          }
        </Box>
    </div>
  )
}

export default Form