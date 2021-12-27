import { useState } from 'react';
import { createContext } from 'react';

export const LoadingContext = createContext({});

export default function LoadingProvider( props ) {

    function useLoadingProvider() {
        const [ loading, setLoading ] = useState(true);
        
        return{
            loading,
            setLoading
        }
    }
  return (
    <LoadingContext.Provider value={useLoadingProvider()}>
      {props.children}
    </LoadingContext.Provider>
  )
}