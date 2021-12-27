import useClients from '../../hooks/useClients';
import "./styles.css";
import Aside from "../../components/Aside";
import ModalAddClient from "../../components/ModalAddClient";
import Header from "../../components/Header";
import TableClients from "../../components/TableClients";
import clientsIconGray from "../../assets/clients-gray.svg";
import filter from "../../assets/filter.svg";
import Button from "../../components/Button";
import InputSearch from "../../components/InputSearch";
import ToastAnimated, { showToast } from "../../toast/Toasts";
import { useEffect, useState } from 'react';
import ModalAddCharge from '../../components/ModalAddCharge';
import useCharges from '../../hooks/useCharges';
import Loading from '../../components/Loading/Loading';
import Filter from '../../components/Filter';

   
function Clients() {
  const {openAddClientModal, setOpenAddClientModal, loading, clients, setClients, setCurrentClientsOnTable } = useClients();
  const { setOpenAddChargeModal, openAddChargeModal } = useCharges();
  const [search, setSearch] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFilter, setShowFilter] = useState(false)
 
  useEffect(() => {
    if(showSuccessMessage){
      showToast({ type: "success", message: "Cadastro concluído com sucesso." });
      setShowSuccessMessage(false)
   }
  },[showSuccessMessage])
  return (
    <div className="container-clients">
        <ToastAnimated />
      {openAddChargeModal && <ModalAddCharge setShowSuccessMessage={setShowSuccessMessage} title="Cadastro de cobrança"/> }
      {openAddClientModal && <ModalAddClient setShowSuccessMessage={setShowSuccessMessage}/>}
 
      <Aside/>
      <div className="right">
        <ToastAnimated/>
        {loading && <Loading/>}
        <Header title={<span className="header-title">Clientes</span>}></Header>
        <div className="container-header-clients">
          <div>
            <div className="icons-header-clients">
              <img
                className="icon-clientsPage"
                src={clientsIconGray}
                alt="Icon Clients"
              />
              Clientes
            </div>
          </div>
          <div className="input-buttons-clients">
            <Button action={() => setOpenAddClientModal(true)} color={"pink"} text="+ Adicionar Cliente" />
            
            <img className="filterClients" src={filter} onClick={() => {setShowFilter(!showFilter)}} alt="Filter" />
            {showFilter && <Filter page='clients' data={clients} setData={setCurrentClientsOnTable} setShowFilter={setShowFilter}/>}
            <InputSearch setSearch={setSearch} search={search} />
          </div>
        </div>
        <main className="main-clients">
          <TableClients setOpenAddChargeModal={setOpenAddChargeModal} openAddChargeModal={openAddChargeModal}/>
        </main>
      </div>
    </div>
  );
}

export default Clients;
