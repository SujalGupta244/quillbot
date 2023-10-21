import React, {useState} from 'react'
import Popup from './Popup'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
const Header = () => {
  
  const[show,setShow] = useState(false)

  return (
    <>
    <div className='border-b-2 p-4 border-gray-600 flex'>
        <div className='flex-shrink-0 px-3 border-r-2 border-gray-500 cursor-pointer' onClick={() => setShow(!show)}>Research</div>
        <div className='flex-shrink-0 px-3 border-r-2 border-gray-500'><DashboardCustomizeIcon/></div>
        <div className='flex-shrink-0 px-3 border-r-2 border-gray-500'><FormatQuoteIcon/></div>
    </div>
    <Popup show={show} setShow={setShow}/>
    </>

  )
}

export default Header