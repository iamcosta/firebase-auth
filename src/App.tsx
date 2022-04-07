import './App.css';
import './service/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, UserCredential, User } from 'firebase/auth';
import { useState } from 'react';
import { AiFillGoogleCircle, AiOutlineLogout } from 'react-icons/ai';

function App() {
  
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  function login() {  
    signInWithPopup(auth, provider).then((result: UserCredential) => {
      console.log(result.user)
      setUser(result.user);      
    }).catch((error: any) => {
      alert(error);
    })
  }

  function logout() {
    signOut(auth).then(() => {
      setUser(null);
    }).catch(error => {
      alert(error)
    })
  }

  return (
    <div className="App">
      {!user ? (
        <>
          <strong>Você não está logado</strong>
          <button className="login-button"  onClick={login}>
            <div className="login-button-content">
              <AiFillGoogleCircle size={18}/>
              Login com Google
            </div>
          </button>
        </>
      ): (
        <>
          <img src={user.photoURL!}/>
          <strong>Bem vindo, {user.displayName}!</strong>
          <button className="login-button signout"  onClick={logout}>
            <div className="login-button-content">
              <AiOutlineLogout size={18}/>
              Logout
            </div>
          </button>
        </>
      )}
    </div>
  );
}

export default App;
