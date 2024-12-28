import React from 'react'
import "./css/Sidebaroptions.css"
import { useNavigate } from 'react-router-dom'

function Sidebaroptions({Icon,title,number,isactive,page,handlebarClick}) {
  const navigate = useNavigate()

  const handleClick=()=>{

      navigate(page);
      

  }

  return (
    <div className={ `sidebarOptions ${isactive && 'sidebarOptions--active'}` } onClick={()=>handlebarClick(page)}>
        <Icon/>
        <h4>{title}</h4>
        <p>{number }</p>
    </div>
  )
}

export default Sidebaroptions