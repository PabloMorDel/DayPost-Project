import { useContext } from 'react';
import { StatusContext } from '..';

export const AppError = () => {
  const { error, setError } = useContext(StatusContext);
  return error ? (
    <div className='banner error'>
      <p>{error}</p>
      <button onClick={() => setError(null)}>Ok</button>
    </div>
  ) : null;
};

export const AppWaiting = () => {
  const { waiting } = useContext(StatusContext);

  return waiting ? <div className='banner waiting'>cargando...</div> : null;
};
