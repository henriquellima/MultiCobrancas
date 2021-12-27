import { createContext } from 'react';
import useAuthProvider from '../hooks/useAuthProvider';

export const AuthContext = createContext({});

export default function AuthProvider( props ) {
  return (
    <AuthContext.Provider value={useAuthProvider()}>
      {props.children}
    </AuthContext.Provider>
  )
}
