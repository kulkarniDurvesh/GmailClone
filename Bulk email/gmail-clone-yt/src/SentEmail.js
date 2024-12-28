import React, { useState,useEffect } from 'react'
import EmailListSettings from './EmailListSettings'
import EmailType from './EmailType'
import Emailbody from './Emailbody'


function SentEmail() {
    debugger;
    const[sentemails,setSentEmails] = useState([]);
    const[loading,setLoading] = useState(true)
    const pageNumber = localStorage.getItem('PageCount')==null?1:localStorage.getItem('PageCount')
    useEffect(()=>{
        debugger;
        fetch(`/sent_email?Pagecount=${pageNumber}`).then(
            res => res.json()
        ).then(
            data=>{
                console.log(data)
                debugger
                setSentEmails(Object.keys(data).map(elem=>({
                    id:data[elem].id,
                    data:data[elem].data

                })))
                setLoading(false)

            }
        )
    },[pageNumber]);
    
  return (
    <div className="Emaillist">
        <EmailListSettings />
        <EmailType />
        {
            loading?<img src="/slow-speeds.gif" alt='loading'  style={{height: 70 + 'vh',width:78+'vw'}}></img>:(sentemails.map(({id,data})=>{
                return <Emailbody key={id} name={data.To} email={data.From} subject={data.Subject+" "} message={data.Body} time={data.Date} />
            }))
        }
    </div>
  )
}

export default SentEmail