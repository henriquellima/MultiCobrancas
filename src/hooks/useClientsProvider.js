import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { showToast } from '../toast/Toasts';
import useAuth from './useAuth';
export default function useClientsProvider() {
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  
  const {token, baseURL} = useAuth();
  const [clients, setClients] = useState([]);
  const [clientDetails, setClientDetails] = useLocalStorage('clientDetail', {})
  const [currentClient, setCurrentClient] = useState({name:"", id:null})
  const [currentClientsOnTable, setCurrentClientsOnTable] = useState([]);
  const [loading, setLoading] = useState(false);
  

  async function getClients() {
  
    try {
      setLoading(true)
      const response = await fetch(`${baseURL}/clients`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
    
      if (!response) {
        setLoading(false)
        return;
      }
      setClients(data);
      setLoading(false)
    } catch (error) {
      showToast({ type: 'error', message: error.message });
      setLoading(false)
    }
  }

  useEffect(() =>{
    getClients()
    // eslint-disable-next-line
  }, [])
  
   return {
    openAddClientModal,
    setOpenAddClientModal,
    clients,
    setClients,
    clientDetails,
    setClientDetails,
    getClients,
    currentClient,
    setCurrentClient,
    loading,
    currentClientsOnTable, 
    setCurrentClientsOnTable
  };
}



