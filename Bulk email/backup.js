import React,{useRef, useState} from 'react'
import "./css/BulkEmail.css"
function BulkEmail() {

    const inputFileRef = useRef(null)
    const[subject,setsubject]=useState('');
    const[message,setMessage]=useState('');
    const openFile = ()=>{
        inputFileRef.current.click()
    }

    const UploadFile = (event)=>{
        const selectedFile = event.target.files[0];
        debugger;
        const reader = new FileReader();
        reader.readAsText(selectedFile);

        reader.onload = (event)=>{
            const Content = event.target.result;
            const lines =Content.split('\n');
            let list_arr = []
            lines.forEach(elem=>{
                if(elem !==''){
                    list_arr.push(elem)
                }
            })
            console.log(list_arr);

            const emailObj = {
                To:list_arr.toString(),
                Subject:"Testing from Bulk Email",
                from:"pythonlearnpython@gmail.com",
                Message:"Hi this is Testing mail"
            }

            sendBulkMail(emailObj)
            debugger;

        }

    }

    const sendBulkMail = (emailObj)=>{
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
    <>
        <div className=''>
            <div>
                <div>
                    <h2 style={{padding:'5px'}}>BULK EMAIL SERVICE</h2>
                </div>
                <div className='bulkEmail'>
                
                    <label className='subjectbE'>Subject</label>
                    <input type='text' style={{width:'92%',height:'25px',marginLeft:'9px',borderRadius:'15px',paddingLeft:'5px'}}></input>

                </div>
                <div className='bulkEmailMessage'>
                    
                    <label className='messagebE'>Message</label>
                    <textarea className='textbulkemail' rows="20" maxLength={250}></textarea>
                
                
                </div>
                <div className='btndiv'>
                    <input type="file" id="fileInput" className='choosebtn' ref={inputFileRef} name='fileUpload' onChange={UploadFile} />
                    <button className='choosebtn' onClick={openFile}>Send Mail</button>
                </div>
                {/* <input type="file" id="fileInput" className='choosebtn' ref={inputFileRef} name='fileUpload' onChange={UploadFile} />
                    <button className='choosebtn' onClick={openFile}>Send Mail</button> */}
            </div>

        </div>
    </>
  )
}

export default BulkEmail