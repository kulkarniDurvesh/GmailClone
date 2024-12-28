import React from 'react'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import "./css/Emaillist.css"
import { useNavigate } from 'react-router-dom';
import { openMessage } from './features/mailSlice';
import { useDispatch } from 'react-redux';

function Emailbody({id,name,subject,message,time,email}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setMail=() =>{
        debugger;
        dispatch(openMessage({
            name,
            subject,
            message,
            time,
            email
        }))

        navigate('/mails')
    }
  return (
    <div className='emailbody'>
        <div className='emailbody__left'>
            {/* <CheckBoxOutlineBlankIcon/> */}
            <input type='checkbox' id={id}/>
            <StarBorderIcon/>
            <LabelOutlinedIcon/>
            <h4>{name}</h4>
        </div>

        <div className='emailbody__middle'  onClick={setMail}>
            <div className='emailbody__middle_msg'>
                <p><b>{subject}</b>{message}</p>
            </div>
        </div>

        <div className='emailbody__right'>
            <p><b>{time}</b></p>
        </div>
    </div>
  )
}

export default Emailbody