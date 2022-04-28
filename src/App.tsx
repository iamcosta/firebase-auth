import './App.css';
import './service/firebase';
import { User } from 'firebase/auth';
import { useState } from 'react';
import { AiFillGoogleCircle, AiOutlineLogout } from 'react-icons/ai';
import { AuthController } from './service/controllers/AuthController';

function App() {

  const [user, setUser] = useState<User | null>(null);

  const authController = new AuthController([user, setUser]);

  function login() {
    authController.login();
  }

  function logout() {
    authController.logout();
  }

  return (
    <div className="App">
      {!user ? (
        <>
          <strong>Você não está logado</strong>
          <button className="login-button" onClick={login}>
            <div className="login-button-content">
              <AiFillGoogleCircle size={18} />
              Login com Google
            </div>
          </button>
        </>
      ) : (
        <>
          <img src={user.photoURL!} alt={`Imagem de perfil de ${user.displayName}`} />
          <strong>Bem vindo, {user.displayName}!</strong>
          <button className="login-button signout" onClick={logout}>
            <div className="login-button-content">
              <AiOutlineLogout size={18} />
              Logout
            </div>
          </button>
        </>
      )}
    </div>
  );
}

export default App;
