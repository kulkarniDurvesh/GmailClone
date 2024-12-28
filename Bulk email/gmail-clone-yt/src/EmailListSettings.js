import React from 'react'
import "./css/Emaillist.css"
import { IconButton } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';



function EmailListSettings() {
  const navigate = useNavigate()
  const loadFurtherMail=()=>{
    const currentPage = parseInt(localStorage.getItem('PageCount'), 10);
    localStorage.setItem('PageCount',currentPage+1)
    window.location.reload()
  }
  const loadPreviousMail=()=>{
    const currentPage = parseInt(localStorage.getItem('PageCount'), 10);
    localStorage.setItem('PageCount',currentPage-1)
    window.location.reload()
  }
  return (
    <div className="emailist__settings">
      <div className='emailist__settingsLeft'>
        <IconButton>
          <CheckBoxOutlineBlankIcon />
        </IconButton>
        <IconButton>
          <ArrowDropDownIcon />
        </IconButton>
        <IconButton>
          <RefreshIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>

      <div className='emailist__settingsRight'>
        <p>1-50 of 10,222</p>
        <IconButton>
          <ChevronLeftIcon onClick={loadPreviousMail}/>
        </IconButton>
        <IconButton>
          <ChevronRightIcon onClick={loadFurtherMail}/>
        </IconButton>
      </div>
    </div>
  )
}

export default EmailListSettings