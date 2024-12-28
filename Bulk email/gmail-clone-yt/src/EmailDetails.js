import React from 'react'
import "./css/Emaillist.css"
import { IconButton,Avatar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import LaunchIcon from '@mui/icons-material/Launch';
import StarRateIcon from '@mui/icons-material/StarRate';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectedMail } from './features/mailSlice';

function EmailDetails() {
    const mail = useSelector(selectedMail)
    const navigate = useNavigate()

  return (
    <div className='emailDetails'>
    <div className="emailist__settings">
        <div className='emailist__settingsLeft'>
            <IconButton>
                <ArrowBackIcon onClick={()=> navigate('/')} />
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
                <ChevronLeftIcon />
            </IconButton>
            <IconButton>
                <ChevronRightIcon />
            </IconButton>
        </div>
        </div>
        <div className='emailDetails_message'>
        <div className='emailDetails__header'>
            <div className='emailDetails__headerLeft'>
                <h4>{mail.subject}</h4>
                <IconButton>
                <LabelImportantIcon/>
                </IconButton>
            </div>
            <div className='emailDetails__headerRight'>
            <IconButton>
                <LocalPrintshopIcon/>
            </IconButton>
            <IconButton>
                <LaunchIcon/>
            </IconButton>
            </div>
        </div>

        <div className='emailDetails__middleheader'>
            <div className='emailDetails__middleheaderLeft'>
                <IconButton>
                <Avatar/>
                </IconButton>
                <h4>{mail.subject} </h4>
                <p> {mail.email}</p>
            </div>
            <div className='emailDetails__middleheaderRight'>
                <p>{mail.time}</p>

            <IconButton>
                <StarRateIcon/>
            </IconButton>
            <IconButton>
                <ReplyIcon/>
            </IconButton>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
            </div>
        </div>
        <div className='emailDetails_body'>
                <p>{mail.message}</p>
         </div>
        </div>


  </div>

   





  )
}

export default EmailDetails