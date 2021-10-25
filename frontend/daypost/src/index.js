import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import useLocalStorage from './hooks/useLocalStorage';
import get from './api/get';

export const AuthContext = React.createContext('');

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage(null, 'token');
  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  );
}
export const PostsContext = React.createContext([]);
export function PostProvider({ children }) {
  const [postList, setPostList] = useState([]);
  const [token] = useContext(AuthContext);
  useEffect(() => {
    const url = 'http://localhost:4001/posts';

    setInterval(
      get(url, (body) => setPostList(body), token),
      10000
    );
    return () => clearInterval();
  }, [token]);
  return (
    <PostsContext.Provider value={[postList, setPostList]}>
      {children}
    </PostsContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
