import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Emaillist from './Emaillist';
import Compose from './Compose';
import {useDispatch, useSelector} from 'react-redux';
import {selectSendMessageIsOpen} from './features/mailSlice';
import EmailDetails from './EmailDetails';
import DarkModeToggle from './DarkModeToggle';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Login from './Login';
import { selectUser, signout,signin } from './features/userSlice';
import { auth } from './firebase';
import BulkEmail from './BulkEmail';
import SentEmail from './SentEmail';
import BulkEmailGrid from './BulkEmailGrid'

function App() {
  const isMessageOpen =useSelector(selectSendMessageIsOpen);
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user)
      {
        dispatch(signin({
          displayName:user.displayName,
          photoURL:user.photoURL,
          email:user.email
        }))
      }
      else
      {
          dispatch(signout())
      }
    })
  },[])
  console.log(isMessageOpen);
  return (
    <Router>
      {
        user && (
          <div className="App">
          <Header/>
          {/* <DarkModeToggle /> */}
          <div className='app_body'>
          <Sidebar/>
          <Routes>
            <Route exact path='/' element={<Emaillist/>}></Route>
          </Routes>
          <Routes>
            <Route exact path='/bulkEmail' element={<BulkEmail/>}></Route>
          </Routes>
          <Routes>
            <Route exact path='/sentEmail' element={<SentEmail/>}></Route>
          </Routes>
          <Routes>
            <Route exact path='/mails' element={<EmailDetails/>}></Route>
          </Routes>
          <Routes>
            <Route exact path='/datagrid' element={<BulkEmailGrid/>}></Route>
          </Routes>
          </div>

          {
            isMessageOpen && <Compose/>
          }
          

        </div>  
        )}:
        {/* {<Login/>} */}
        
    </Router>
  );
}

export default App;
