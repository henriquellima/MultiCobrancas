
import useCharges from "../../hooks/useCharges"
import closeIcon from "../../assets/close-icon.svg";
import alertIcon from "../../assets/alert-icon.svg";
import { showToast } from '../../toast/Toasts';
import useAuth from '../../hooks/useAuth';
import useLoading from '../../hooks/useLoading';

import "./styles.css";

export default function ModalConfirmDeleteCharge({ setOpenModalDeleteConfirm }) {
  const {   chargeToDelete, currentChargesOnTable, setCurrentChargesOnTable} = useCharges()
  const { token, baseURL } = useAuth();
  const { setLoading } = useLoading();
  
  async function handleDeleteCharge(){
    
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/charge/${chargeToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        setLoading(false);
        return showToast({
          type: 'error',
          message: data.mensagem,
        });
      }

      showToast({
        type: 'success',
        message: data.mensagem,
      });
    
      setCurrentChargesOnTable(currentChargesOnTable.filter(x => x.id !== chargeToDelete.id))
      setLoading(false);
      setOpenModalDeleteConfirm(false)
      
    } catch (error) {
      showToast({ type: 'error', message: error.message });
      
    }
  }

  return (
    <div className="page-modal-addCharges" onClick={() => setOpenModalDeleteConfirm(false)}>
      <div className="modal-confirmDeleteCharge" onClick={(e) => e.stopPropagation()}>

        <img src={alertIcon} alt="" />
        <div className="modal-chargeDetails-header">

          <img
            onClick={() => setOpenModalDeleteConfirm(false)}
            className="closeIconChargeDetails-header"
            src={closeIcon}
            alt="close"
            />
        </div>
        
            <h3 className=" yellow-title">Tem certeza que deseja excluir esta cobrança?</h3>

            <div className="buttons-confirmDelete">
              <button className="button-green-confirmDelete" onClick={() =>{handleDeleteCharge()}}>Sim</button>
              <button className="button-red-confirmDelete" onClick={() => setOpenModalDeleteConfirm(false)}>Não</button>
            </div>
 
      </div>
    </div>
  );
}
