import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

export default function useAuthProvider() {
  const baseURL = "https://collection-api-d05.herokuapp.com";
  const [token, setToken] = useLocalStorage('token', null);
  const [userData, setUserData, removeUserData] = useLocalStorage('userData', {name:""});
  const [loading, setLoading] = useState(false);


  async function getUserData() {
    
    setLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/user`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/JSON',
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200 && response.status !== 304) {
        setToken(null);
        setUserData(null);
        setLoading(false);
        //'toast aqui'
       
        return  
      }
      setUserData(await response.json());
      setLoading(false)
     
      
    } catch (error) {
      setToken(null);
      setUserData(null);
      setLoading(false)
    }
  }

  useEffect(() => {
    token && getUserData();
    // eslint-disable-next-line
  }, [token]);

  return {
    baseURL,
    token,
    setToken,
    userData,
    setUserData,
    loading,
    setLoading,
    removeUserData
  };
}
