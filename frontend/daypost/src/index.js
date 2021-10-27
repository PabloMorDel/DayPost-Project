import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import useLocalStorage from './hooks/useLocalStorage';
//import getPost from './api/getPost';

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage(null, 'token');
  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  );
}
export const UserIdContext = React.createContext();

function IdProvider({ children }) {
  const [loggedUserId, setLoggedUserId] = useLocalStorage(0, 'userID');
  return (
    <UserIdContext.Provider value={[loggedUserId, setLoggedUserId]}>
      {children}
    </UserIdContext.Provider>
  );
}

export const StatusContext = React.createContext();

function StatusProvider({ children }) {
  const [error, setError] = useState(null);
  const [waiting, setWaiting] = useState(false);

  return (
    <StatusContext.Provider value={{ error, setError, waiting, setWaiting }}>
      {children}
    </StatusContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <IdProvider>
        <StatusProvider>
          <App />
        </StatusProvider>
      </IdProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
