import React, { useEffect, useState } from 'react'
import {selectEmailIdlist} from './features/emailIdSlice'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component-with-filter'
import CloseIcon from '@mui/icons-material/Close';
import { selectUser } from './features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function BulkEmailGrid() {
  debugger;
    const [subject,setSubject] = useState('');
    const [message,setMessage] = useState('');
    const [emailObj,setEmailObj] = useState(null);
    const user = useSelector(selectUser);
    const [adjustedRows,setadjustedRows] = useState([]);
    const[rowsSelected,setrowsSelected] = useState([]);
    const listArr =useSelector(selectEmailIdlist);
    const navigate = useNavigate();
    const isDarkModeEnable = localStorage.getItem('darkMode')

    useEffect(()=>{
      console.log(rowsSelected)
    },[rowsSelected])

    useEffect(() => {
      if (emailObj) {
        // Check emailObj is not null or undefined
        console.log(emailObj);
  
        // Call the function to send bulk mail here
        sendBulkMailComplete(emailObj);
      }
    }, [emailObj]);

    const columns=[
      {
        name:'id',
        selector: 'id',
        sortable:true
      },
      {
        name:'email',
        selector: 'email',
        sortable:true
      }
  ]

  const data= listArr.map(row => ({ id: row.id, email: row.email }))
  const [record,setRecord] = useState(data)
  const handleFilter = (event) =>{
    const newData = data.filter(row =>{
      return row.email.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecord(newData)
  }



  const handleSelectedRow = rows =>{
    setadjustedRows(rows.selectedRows);
    setrowsSelected(adjustedRows);
  }
  
  const sendBulkMail =()=>{
    console.log(adjustedRows);
        setEmailObj({
          To:adjustedRows.map((item)=>item.email).join(','),
          Subject:subject,
          from:user.email,
          Message:message
        });
  }


  const sendBulkMailComplete = async(emailObj)=>{
    debugger;
    console.log(emailObj)
    console.log(JSON.stringify(emailObj))
    const response= await  fetch("/send_emails", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Add other headers if required
        },
        body: JSON.stringify(emailObj)
    });

    {
      
      alert('Email Send Successfully');
      navigate('/')
    }
   


    // Handle success, update UI, etc.
        
};

  return (
    <div className='row'>
        <div className='col-md-6'>
          <div className='container mt-5 row' style={{width:'100%'}}>
              <div className='text-end'>
                <input type='text' className='italic' placeholder='filter email' onChange={handleFilter}></input>
                {/* <CloseIcon/> */}
              </div>
              <div>
                <DataTable
                    columns = {columns}
                    data = {record}
                    theme={isDarkModeEnable === true?'dark':'dark'}
                    selectableRows
                    onSelectedRowsChange={handleSelectedRow}
                    selectableRowsHighlight
                    fixedHeader
                    pagination
                ></DataTable>
              </div>
          </div>

        </div>

        <div className='col-md-6'>
          <div className='container mt-5 row'>
              <div className='bulkEmailFlex'>
                <div className='col'>
                    <div className='row' style={{margin:'2rem'}}>
                      <label className='BESubject'></label>
                      <input type='text' placeholder='Please enter subject' className='BulkEmailSubject' onChange={(e)=>setSubject(e.target.value)}></input>
                    </div>
                    <div className='row' style={{margin:'2rem'}}>
                      <label className='BEMessage'></label>
                      <textarea placeholder='Please enter message' className='BulkEmailMessage' onChange={(e)=>setMessage(e.target.value)}></textarea>
                    </div>
                </div>
              </div>
          </div>
          <div>
            <button type='button' className='btn BEbtn' onClick={sendBulkMail}>Send Mail</button>
          </div>
        </div>
    </div>
  )
}

export default BulkEmailGrid