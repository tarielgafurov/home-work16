import React, { useState } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import SwitchesSize from './components/ToggleSwitch';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [done,setdone] = useState(false)

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <AuthContext.Provider value={{done:done,setDone:setdone}}>

      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} d/>
      
      <main style={{backgroundColor: !done ? '' :'grey',height:'800px'}}>
        
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>  

      </AuthContext.Provider>
    
      
    </React.Fragment>
    
  );
}

export default App;
