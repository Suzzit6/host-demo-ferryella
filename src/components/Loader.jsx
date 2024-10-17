import React from 'react';
import { MoonLoader } from 'react-spinners';
import { useLoader } from '../contexts/LoaderContext';

const Loader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    }}>
      <MoonLoader color="hsla(307, 100%, 50%, 1)" loading size={60} speedMultiplier={1} />
    </div>
  );
};

export default Loader;