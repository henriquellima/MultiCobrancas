import { useEffect, useState } from 'react';
import chargesIconGray from '../../assets/charges-gray.svg';
import filter from '../../assets/filter.svg';
import Aside from '../../components/Aside';
import Filter from '../../components/Filter';
import Header from '../../components/Header';
import InputSearchCharges from '../../components/InputSearchCharges';
import Loading from '../../components/Loading/Loading';
import ModalAddCharge from '../../components/ModalAddCharge';
import ModalAddClient from '../../components/ModalAddClient';
import TableCharges from '../../components/TableCharges';
import useCharges from '../../hooks/useCharges';
import useClients from '../../hooks/useClients';
import ToastAnimated, { showToast } from '../../toast/Toasts';
import './styles.css';

function Charges() {
  const { openAddClientModal } = useClients();
  const { openAddChargeModal, charges, setCurrentChargesOnTable, loading, openEditChargeModal } = useCharges();
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      showToast({
        type: 'success',
        message: 'Cadastro concluído com sucesso.',
      });
      setShowSuccessMessage(false);
    }
  }, [showSuccessMessage]);
  return (
    <div className="container-clients">
      <ToastAnimated />
      {loading && <Loading />}

      {openAddChargeModal && 
        <ModalAddCharge setShowSuccessMessage={setShowSuccessMessage} title="Cadastro de cobrança" />
      }
      {openEditChargeModal &&
        <ModalAddCharge setShowSuccessMessage={setShowSuccessMessage} title="Edição de cobrança" />
      }
      {openAddClientModal && 
        <ModalAddClient setShowSuccessMessage={setShowSuccessMessage} />
      }

      <Aside />
      <div className="right">
        <Header
          title={<span className="header-title">Cobranças</span>}
        ></Header>
        <div className="container-header-clients">
          <div>
            <span className="icons-header-clients">
              <img
                className="icon-clientsPage"
                src={chargesIconGray}
                alt="Icon Clients"
              />
              Cobranças
            </span>
          </div>
          <div className="input-buttons-clients">
            <img
              className="filterClients"
              src={filter}
              onClick={() => {
                setShowFilter(!showFilter);
              }}
              alt="Filter"
            />
            {showFilter && <Filter data={charges} setData={setCurrentChargesOnTable} page="charges" setShowFilter={setShowFilter}  />}
            <InputSearchCharges chargesSearch={search} setChargesSearch={setSearch} />
          </div>
        </div>
        <main className="main-clients">
          <TableCharges charges={charges} path={'charges'} />
        </main>
      </div>
    </div>
  );
}

export default Charges;
