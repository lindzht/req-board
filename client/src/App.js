import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import NavTop from './components/NavTop';
import LoginModal from './components/LoginModal';
import MyDashboard from './components/MyDashboard';
import MyReqsPage from './components/MyReqsPage';
import NavDashboard from './components/NavDashboard';
import MyDashboardHome from './components/MyDashboardHome';
import Settings from './components/Settings';

function App() {

  // STATE 
  
  const [currentUser, setCurrentUser] = useState(null)
  const [companies, setCompanies] = useState([])
  const [newCompany, setNewCompany] = useState([])
  const [newCompanyID, setNewCompanyID] = useState([])
  const [newRecruiter, setNewRecruiter] = useState([])
  const [errors, setErrors] = useState([])
  const [displayLoginForm, setDisplayLoginForm] = useState(false);

  //STAY LOGGED IN:
  useEffect(() => {
    fetch("/me")
    .then(res => {
      if(res.ok){
        res.json()
        .then(user => {
          setCurrentUser(user)
        })
      }
    });
  }, []);

  // FETCH COMPANIES 
  useEffect(() => {
    fetch('/companies')
    .then(res => {
      if (res.ok){
        res.json()
        .then(data => {
          setCompanies(data)
        })
      }
    })
  }, [newCompany])

  // CREATE NEW COMPANY AND ADD NEW COMPANY ID
   const createNewCompany = (newCompany)=> {
    fetch('/companies', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newCompany)
    })
    .then(res => {
      if (res.ok){
        res.json().then(data => {
          setNewCompany(data);
        })
      } else {
        res.json().then(data => {setErrors(data.errors); console.log(errors)})
      }
    })
   }

    // CREATE NEW RECRUITER
    const createNewRecruiter = (newRecruiter)=> {
      fetch('/recruiters', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newRecruiter)
      })
      .then(res => {
        if (res.ok){
          res.json().then(data => {
            console.log(data);
            <Link to="/"></Link>
          })
        } else {
          res.json().then(data => {setErrors(data.errors); console.log(errors)})
        }
      })
    }

     // LOGOUT
     const handleLogOut =()=> {
      fetch("/logout", {
      method: "DELETE"
      })
      .then(res => {
      if(res.ok) {
          setCurrentUser(null)
      }
      })
    }

    // DISPLAY LOGIN MODAL
    const handleLoginModal =()=> {
      setDisplayLoginForm(!displayLoginForm)
      console.log(displayLoginForm)
    }

    console.log(displayLoginForm);

  return (
    <BrowserRouter>
    {!currentUser ? 
      <div className="App">
        <NavTop 
              currentUser={currentUser} 
              handleLogOut={handleLogOut}
              handleLoginModal={handleLoginModal}
              />
        { displayLoginForm ? <LoginModal
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
              setErrors={setErrors}
              errors={errors}/>
        : null }
        <Routes>
          <Route index element={<LandingPage 
              handleLoginModal={handleLoginModal}/>} />
          <Route path='signup' element={<SignupPage 
              companies={companies}
              createNewCompany={createNewCompany}
              createNewRecruiter={createNewRecruiter}
              newCompany={newCompany}/>} />
          {/* <Route path='login' element={<LoginPage 
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
              setErrors={setErrors}
              errors={errors}/>} /> */}
        </Routes>
      </div>

    : 

      <>
          <div className="App-loggedin">
            <NavDashboard 
                  currentUser={currentUser} 
                  handleLogOut={handleLogOut}
                  handleLoginModal={handleLoginModal}
                  />
            <Routes>
              <Route index element={<MyDashboard currentUser={currentUser}/>} />
                <Route path='dashboard' element={<MyDashboard currentUser={currentUser}/>} >
                  <Route index element={<MyDashboardHome currentUser={currentUser}/>} />
                  <Route path='myreqs'element={<MyReqsPage currentUser={currentUser} />} />
                </Route>
                <Route path='settings'element={<Settings currentUser={currentUser} />} />
            </Routes>
        </div>
      </>
    }
    </BrowserRouter>
  );
}

export default App;
