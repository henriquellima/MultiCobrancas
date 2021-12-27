import { createContext } from 'react';
import useClientsProvider from '../hooks/useClientsProvider';

export const ClientsContext = createContext({});

export default function ClientsProvider( props ) {
  return (
    <ClientsContext.Provider value={useClientsProvider()}>
      {props.children}
    </ClientsContext.Provider>
  )
}