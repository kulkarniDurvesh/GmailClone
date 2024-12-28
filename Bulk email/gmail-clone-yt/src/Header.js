import React from "react"
import ReorderIcon from '@mui/icons-material/Reorder';
import { IconButton,Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import "./css/header.css"
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import firebase from 'firebase/compat/app'
import DarkModeToggle from "./DarkModeToggle";
const Header = () => {
    const user = useSelector(selectUser)
    return (
        <div className="header">
            <div className="header_left">
                <IconButton>
                    <ReorderIcon></ReorderIcon>
                </IconButton>
                {/* <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png" alt="logo" /> */}
            </div>
            <div className="header_middle">
                <div className="search_mail">
                    <IconButton>
                        <SearchIcon></SearchIcon>
                    </IconButton>
                    <input type="text" placeholder="search mail" />
                    <IconButton>
                        <ExpandMoreIcon></ExpandMoreIcon>
                    </IconButton>
                    
                </div>
                <div style={{marginLeft:"5%"}}>
                    <DarkModeToggle/>
                </div>
            </div>
            <div className="header_right">
                <IconButton>
                    <HelpOutlineIcon></HelpOutlineIcon>
                </IconButton>
                <IconButton>
                    <SettingsIcon></SettingsIcon>
                </IconButton>
                <IconButton>
                    <AppsIcon></AppsIcon>
                </IconButton>

                <Avatar src={user?.photoURL} onClick={()=>firebase.auth().signOut()} className="avatar"></Avatar>
            </div>
        </div>
    )
}

export default Header