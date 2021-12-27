import { useContext } from 'react';
import { ClientsContext } from '../context/ClientsContext';

function useClients() {
  return useContext(ClientsContext);
}

export default useClients;
