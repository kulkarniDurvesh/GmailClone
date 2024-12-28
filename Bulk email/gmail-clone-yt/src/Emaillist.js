import React, { useEffect, useState } from 'react'
import "./css/Emaillist.css"
import EmailListSettings from './EmailListSettings'
import EmailType from './EmailType'
import Emailbody from './Emailbody'
import { db } from './firebase'
function Emaillist() {
  const[emails,setEmails] = useState([]);
  const[loading,setLoading] = useState(true)
  localStorage.setItem('PageCount',1)

  //to fetch data from data base //useEffect used when we want to do something once component is rendered
  // useEffect(()=>{
  //       db.collection("emails").orderBy("timestamp","desc").onSnapshot(snapshot =>{
  //             setEmails(snapshot.docs.map(doc =>({
  //               id:doc.id,
  //               data:doc.data()
  //             })))
  //       })
  // },[]);//[second param is dependency which is empty currently ]
  useEffect(()=>{
    fetch("/receive_email").then(
      res => res.json()
      ).then(
        data =>{
          setEmails(Object.keys(data).map(elem =>({
              id:data[elem].id,
              data:data[elem].data
          })))
          setLoading(false)
        }
      )
 },[]);//[second param is dependency which is empty currently ]
 
  return (
    <div className="Emaillist">
        <EmailListSettings/>
        <EmailType/>
        {loading?<img src="/slow-speeds.gif" alt='loading'style={{height: 70 + 'vh',width:78+'vw'}}></img>:(emails.map(({id,data})=>{
          return <Emailbody key={id} name={data.From} email={data.To} subject={data.Subject+" "} message={data.Body} time={data.Date} />
          }))
      }
    </div>
  )
}

export default Emaillist

//new Date(data.timestamp?.seconds*1000).toLocaleTimeString()