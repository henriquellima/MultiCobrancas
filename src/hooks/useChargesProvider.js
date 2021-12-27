import { useEffect, useState } from 'react';
import { showToast } from '../toast/Toasts';
import useAuth from './useAuth';
import useLoading from './useLoading';

export default function useChargesProvider() {
  const { token, baseURL } = useAuth();
  const [charges, setCharges] = useState([]);
  const [openAddChargeModal, setOpenAddChargeModal] = useState(false);
  const [openEditChargeModal, setOpenEditChargeModal] = useState(false);
  const [paid, setPaid] = useState([]);
  const [expired, setExpired] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [currentChargesOnTable, setCurrentChargesOnTable] = useState([]);
  const [chargeDetails, setChargeDetails] = useState();
  const [chargeToDelete, setChargeToDelete] = useState();

  const { loading, setLoading } = useLoading();

  async function getCharges() {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/charges`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response) {
        return showToast({
          type: 'error',
          message: 'Um erro inesperado ocorreu!!',
        });
      }
      setCharges(data);
      setLoading(false);
    } catch (error) {
      showToast({ type: 'error', message: error.message });
    }
  }
  function isTodayDate(dueDate, today){  
    const dueDate2 = dueDate.toUTCString().substr(0,16);
    const today2 = today.toUTCString().substr(0,16);
  
    if(dueDate2 === today2){
      return true;
    }else{
      return false;
    }  
  }
  
  function isOverdueAccount(dueDate, today){  
    if(dueDate < today){
      return true
    }else{
      return false
    }
  }
  useEffect(() => {
    setPaid(charges.filter((charge) => charge.paid));
    setExpired(
      charges.filter(
        (charge) =>
        !charge.paid &&
        (!isTodayDate(new Date(charge.maturity_date), new Date()) &&
        isOverdueAccount(new Date(charge.maturity_date), new Date()))
      )
    );
    setPreviews(
      charges.filter(
        (charge) =>
        !charge.paid &&
        (isTodayDate(new Date(charge.maturity_date), new Date()) ||
        !isOverdueAccount(new Date(charge.maturity_date), new Date()))
      )
    );

    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    getCharges();
    // eslint-disable-next-line
  }, []);

  return {
    charges,
    setCharges,
    openAddChargeModal,
    setOpenAddChargeModal,
    getCharges,
    paid,
    expired,
    previews,
    loading,
    setCurrentChargesOnTable,
    currentChargesOnTable,
    chargeDetails,
    setChargeDetails,
    setOpenEditChargeModal,
    openEditChargeModal,
    setChargeToDelete,
    chargeToDelete,
    isOverdueAccount,
    isTodayDate

  };
}
