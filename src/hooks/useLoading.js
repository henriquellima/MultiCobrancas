import { useContext } from 'react';
import { LoadingContext } from '../context/LoadingContext';

function useLoading() {
  return useContext(LoadingContext);
}

export default useLoading;
