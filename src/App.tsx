import './App.css';
import './service/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, UserCredential, User } from 'firebase/auth';
import { useState } from 'react';


function App() {
  
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  function login() {  
    signInWithPopup(auth, provider).then((result: UserCredential) => {
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
          <button onClick={login}>Login com Google!</button>
        </>
      ): (
        <>
          <strong>Bem vindo, {user.displayName}!</strong>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
