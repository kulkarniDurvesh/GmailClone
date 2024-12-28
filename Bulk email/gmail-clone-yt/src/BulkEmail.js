import React,{useRef, useState} from 'react'
import "./css/BulkEmail.css"
import { selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fillEmailIdList, selectEmailIdlist } from './features/emailIdSlice';
import { useNavigate } from 'react-router-dom';
function BulkEmail() {

        const inputFileRef = useRef(null)
        const[subject,setsubject]=useState('');
        const[message,setMessage]=useState('');
        const user = useSelector(selectUser);
        const emailidlist = useSelector(selectEmailIdlist);
        const [selectedFile,setSelectedFile]=useState(null);
        const [emailObj,setEmailObj]=useState(null);
        const dispatch = useDispatch();
        const navigate = useNavigate();
 
        const handleChangeFile=(event)=>{
        debugger;
        const selectedFile=event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(selectedFile);

        reader.onload = (event)=>{
            const Content = event.target.result;
            const lines =Content.split('\n');
            let list_arr = []
            lines.forEach((elem,index)=>{
                if(elem !==''){
                    list_arr.push({
                       id:index+1,
                       email: elem})
                }
            })
            console.log(list_arr);
            dispatch(fillEmailIdList(list_arr));
             setEmailObj ({
                To:list_arr.map((item)=>item.email).join(','),
                Subject:subject,
                from:user.email,
                Message:message
            })
            debugger;
            navigate('/datagrid')
            debugger;

                }
        }

        const UploadFile = ()=>{
        debugger;
        
        sendBulkMail(emailObj)
        console.log('CSV file sent successfully!');
        setsubject('');
        setMessage('');
        setSelectedFile(null);

        }

        const sendBulkMail = async(emailObj)=>{
            debugger;
            // console.log(emailObj)
            // console.log(JSON.stringify(emailObj))
            // const response= await  fetch("/send_emails", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //         // Add other headers if required
            //     },
            //     body: JSON.stringify(emailObj)
            // })
            // .then(response => response.json()
                
            // )
            // .then(data => {
            //     // Handle the response data
            //     console.log('Response from server:', data);
            //     // setResponseData(data); // Set the response data in state if needed
            // })
            // .catch(error => {
            //     // Handle errors
            //     console.log('Error:', error);
            // });

        

            // Handle success, update UI, etc.
                
    };

  return (
    <>
        <div className=''>
            <div>
                <div>
                    <h2 style={{padding:'5px'}}>BULK EMAIL SERVICE</h2>
                </div>
                {/* <div className='bulkEmail'>
                
                    <label className='subjectbE'>Subject</label>
                    <input type='text' style={{width:'92%',height:'25px',marginLeft:'9px',borderRadius:'15px',paddingLeft:'5px'}} value={subject} onChange={(e)=>setsubject(e.target.value)} />

                </div>
                <div className='bulkEmailMessage'>
                    
                    <label className='messagebE'>Message</label>
                    <textarea className='textbulkemail' rows="20" maxLength={250} onChange={(e)=>setMessage(e.target.value)}>{message}</textarea>
                
                
                </div> */}
                <div className='btndiv'>
                    <input type="file" id="fileInput" className='choosebtn' ref={inputFileRef} name='fileUpload' onChange={handleChangeFile}/>
                    {/* <button className='choosebtn' onClick={UploadFile}>Send Mail</button> */}
                </div>
                {/* <input type="file" id="fileInput" className='choosebtn' ref={inputFileRef} name='fileUpload' onChange={UploadFile} />
                    <button className='choosebtn' onClick={openFile}>Send Mail</button> */}
            </div>

        </div>
    </>
  )
}

export default BulkEmail