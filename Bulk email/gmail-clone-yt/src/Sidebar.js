import React, {useState}from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import "./css/Sidebar.css"
import Sidebaroptions from './Sidebaroptions';
import InboxIcon from '@mui/icons-material/Inbox';
import StarRateIcon from '@mui/icons-material/StarRate';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import LabelIcon from '@mui/icons-material/Label';
import DeleteIcon from '@mui/icons-material/Delete';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useDispatch } from 'react-redux';
import { openSendMessage } from './features/mailSlice';
import BulkEmail from './BulkEmail';
import SmsIcon from '@mui/icons-material/Sms';
import { Navigate, useNavigate } from 'react-router-dom';
function Sidebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('/');
  const handleOptionClick=(page)=>{
    debugger
    setActivePage(page);
    navigate(page)
  }
  return (
    <div className='sidebar'>
      <Button startIcon={<AddIcon />} className="compose_btn" onClick={()=>dispatch(openSendMessage())}>Compose</Button>
      {/* <Button startIcon={<AddIcon />} className="bulkEmail_btn" onClick={()=>navigate('/bulkEmail')}>Bulk Email</Button> */}

      <Sidebaroptions Icon={InboxIcon} title="Inbox" number="224" page={'/'} isactive={activePage === '/'} handlebarClick={handleOptionClick}></Sidebaroptions>

      <Sidebaroptions Icon={StarRateIcon} title={"Starred"} number={500}></Sidebaroptions>

      <Sidebaroptions Icon={DriveFolderUploadIcon} title={"Bulk Email"} isactive={activePage === '/bulkEmail'} handlebarClick={handleOptionClick} page={'/bulkEmail'} number={500}></Sidebaroptions>
      <Sidebaroptions Icon={SmsIcon} title={"Bulk SMS"} isactive={activePage === '/bulksms'} handlebarClick={handleOptionClick} page={'/bulksms'} ></Sidebaroptions>

      <Sidebaroptions Icon={WatchLaterIcon} title={"Snoozed"} number={300}></Sidebaroptions>

      <Sidebaroptions Icon={LabelImportantIcon} title={"Important"} number={452}></Sidebaroptions>

      <Sidebaroptions Icon={SendIcon} title={"Sent"} isactive={activePage === '/sentEmail'} page={'/sentEmail'} handlebarClick={handleOptionClick} number={254}></Sidebaroptions>

      <Sidebaroptions Icon={DraftsIcon} title={"Drafts"} number={254}></Sidebaroptions>

      <Sidebaroptions Icon={LabelIcon} title={"Category"} number={254}></Sidebaroptions>

      <Sidebaroptions Icon={DeleteIcon} title={"[Map]/Trash"} number={254}></Sidebaroptions>

      <Sidebaroptions Icon={FindInPageIcon} title={"Documents"} number={254}></Sidebaroptions>

      <Sidebaroptions Icon={ExpandMoreIcon} title={"More"} number={254}></Sidebaroptions>
   
   <hr></hr>
        <h3 className="SidebarOptions_heading">Meet</h3>

        <Sidebaroptions Icon={VideocamIcon} title={"New meeting"}></Sidebaroptions>
        <Sidebaroptions Icon={KeyboardIcon} title={"Join a meeting"}></Sidebaroptions>

    </div>
  )
}

export default Sidebar
