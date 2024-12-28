import React, { useState } from 'react'
import "./css/darkmode.css"


 const DarkModeToggle = () => {
    const [isDarkMode,setIsDarkMode]=useState(
        localStorage.getItem('darkMode')==='true'
    )

    const toggleDarkMode=()=>{
        const newMode = !isDarkMode
        setIsDarkMode(newMode);
        document.body.classList.toggle('dark-mode',newMode);
        localStorage.setItem('darkMode',newMode)
    }
  return (
    <div className='btn-toggle-right'>
        <button className='btn-toggle' onClick={toggleDarkMode}>{isDarkMode ?'Switch To light Mode':'Switch To Dark Mode'}</button>
    </div>
  )
}

export default DarkModeToggle