import React, { useState } from 'react'
import "./css/compose.css"
import RemoveIcon from '@mui/icons-material/Remove';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LinkIcon from '@mui/icons-material/Link';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import CreateIcon from '@mui/icons-material/Create';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import { db } from './firebase';
import firebase from 'firebase/compat/app'
import { selectUser } from './features/userSlice';
function Compose() {
    
    const [to,setTo] = useState("");
    const [subject,setsubject] = useState("");
    const [message,setmessage] = useState("");
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [emailObj,setEmailObj]=useState("");

    const formSubmit=(e)=>{
            e.preventDefault();
            if(to===""){
                return alert("To is required");
            }
            if(subject===""){
                return alert("Subject is required");
            }
            if(message===""){
                return alert("Message is required");
            }
            
            db.collection("emails").add({
                to,
                subject,
                message,
                from:user.email,
                fromName:user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

            const emailObj = {
                To:to,
                Subject:subject,
                Message:message,
                from:user.email,
                fromName:user.displayName,
                timestamp: Date.now()
            }
            
            sendMail(emailObj)
            // alert("Email Sent Successfully");
            
            // alert(`Name is ${to}. subject is ${subject}. message is ${message}`);
            setTo("");
            setsubject("");
            setmessage("");
            dispatch(closeSendMessage());
    }

    const sendMail = (emailObj)=>{
        debugger;
        console.log(emailObj)
        console.log(JSON.stringify(emailObj))
        fetch("/send_emails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Add other headers if required
            },
            body: JSON.stringify(emailObj)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log('Response from server:', data);
            // setResponseData(data); // Set the response data in state if needed
        })
        .catch(error => {
            // Handle errors
            console.log('Error:', error);
        });
        
    };

    return (
        <div className='compose'>
            <div className='compose__header'>
                <div className='compose__header__left'>
                    <span>New message</span>
                </div>
                <div className='compose__header__right'>
                    <RemoveIcon />
                    <OpenInFullIcon />
                    <CloseIcon onClick={() => dispatch(closeSendMessage())} />

                </div>
            </div>
            <form onSubmit={formSubmit}>
                <div className='compose__body'>
                    <div className='compose__bodyForm'>
                        <input type='text' placeholder='Recipients'  value={to} onChange={(e)=>setTo(e.target.value)}/>
                        <input type='text' placeholder='Subject'  value={subject} onChange={(e)=>setsubject(e.target.value)}/>
                        <textarea rows="20" onChange={(e)=>setmessage(e.target.value)}>{message}</textarea>

                    </div>
                </div>

                <div className='compose__footer'>
                    <div className='compose__footer__left'>
                        <button type='submit'>
                            Send
                            <ArrowDropDownIcon />
                        </button>
                    </div>
                    <div className='compose__footer__right'>
                        <FormatColorTextIcon />
                        <AttachFileIcon />
                        <LinkIcon />
                        <InsertEmoticonIcon />
                        <NoteAddIcon />
                        <AddPhotoAlternateIcon />
                        <PhonelinkLockIcon />
                        <CreateIcon />
                        <MoreVertIcon />
                        <DeleteIcon />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Compose