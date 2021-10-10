import { useState, useEffect } from 'react';

function useLocalStorage(initial, key) {
  const initialValue = JSON.parse(window.localStorage.getItem(key)) ?? initial;
  const [localStorage, setlocalStorage] = useState(initialValue);
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(localStorage));
  }, [localStorage, key]);
  return [localStorage, setlocalStorage];
}

export default useLocalStorage;
