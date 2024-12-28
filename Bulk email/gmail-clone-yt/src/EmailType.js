import React from 'react'
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import "./css/Emaillist.css"

function EmailType() {
  return (
    <div class="emailtype">
        <div class="email__options  email__options--active">
            <InboxIcon/>
            <p>Primary</p>
        </div>

        <div class="email__options">
            <PeopleAltIcon/>
            <p>Social</p>
        </div>

        <div class="email__options">
            <LocalOfferIcon/>
            <p>Promotion</p>
        </div>
        

    </div>
  )
}

export default EmailType