import closeIcon from "../../assets/close-icon.svg";
import chargesIconGray from "../../assets/charges-gray.svg";
import useCharges from "../../hooks/useCharges"

import "./styles.css";

export default function ModalChargeDetail({ setOpenModalChargeDetails }) {
  const {chargeDetails, setChargeDetails} = useCharges()
  return (
    <div className="page-modal-addCharges" onClick={() => {
      setChargeDetails()
      setOpenModalChargeDetails(false)}}>
      <div className="modal-chargeDetails" onClick={(e) => e.stopPropagation()}>
        <div className="modal-chargeDetails-header">
          <img
            className="img-header"
            src={chargesIconGray}
            alt="icone cobrança"
          />
          <h2>Detalhe de Cobrança</h2>
          <img
            onClick={() => {
              setChargeDetails()
              setOpenModalChargeDetails(false)}}
            className="closeIconChargeDetails-header"
            src={closeIcon}
            alt="close"
          />
        </div>
        <div>
          <h3>Nome</h3>
          <span>{chargeDetails.name}</span>
        </div>
        <div>
          <h3>Descrição</h3>
          <span>{chargeDetails.description}</span>
        </div>

        <div className="modal-charge-details-flex">
          <div>
            <h3>Vencimento</h3>
            <span>{chargeDetails.maturity_date.split('T')[0]
                      .split('-')
                      .reverse()
                      .join('/')}</span>
          </div>
          <div>
            <h3>Valor</h3>
            <span>{(chargeDetails.amount/100).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}</span>
          </div>
        </div>
        <div className="modal-charge-details-flex">
          <div>
            <h3>ID da cobrança</h3>
            <span>{chargeDetails.id}</span>
          </div>
          <div>
            <h3>Status</h3>
            {chargeDetails.paid && (
          
                      <span className="tableElement-paid chargeStatus">Paga</span>
  
                  )}
                  {!chargeDetails.paid &&
                    +new Date(chargeDetails.maturity_date) > +new Date() && (
                  
                        <span className="tableElement-preview chargeStatus"> Pendente</span>
                  
                    )}
                  {!chargeDetails.paid &&
                    +new Date(chargeDetails.maturity_date) < +new Date() && (
              
                        <span className="tableElement-expired chargeStatus"> Vencida</span>

                    )}
          </div>
        </div>
      </div>
    </div>
  );
}
