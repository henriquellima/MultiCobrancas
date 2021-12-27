import useClients from "../../hooks/useClients";
import "./styles.css";
import Aside from "../../components/Aside";
import ModalAddClient from "../../components/ModalAddClient";
import Header from "../../components/Header";
import clientsIconGray from "../../assets/clients-gray.svg";
import ClientInfoDetails from "../../components/ClientInfoDetails";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import useCharges from "../../hooks/useCharges";
import TableCobrancas from "../../components/TableCharges";
import ToastAnimated from "../../toast/Toasts";
import {  useEffect } from "react";
import ModalAddCharge from "../../components/ModalAddCharge";

function ClientDetails() {
  const { openAddClientModal, clientDetails } = useClients();

 
  const { charges, setOpenAddChargeModal, openAddChargeModal, setCurrentChargesOnTable, openEditChargeModal  } = useCharges();
  useEffect(() => {
    setCurrentChargesOnTable(
      charges.filter((charge) => charge.client_id === clientDetails.id)
    );
    // eslint-disable-next-line
  }, [charges]);

  const history = useHistory();

  return (
    <div className="container-clients">
    {openAddChargeModal &&  <ModalAddCharge/>}
      <ToastAnimated />
      <Aside />
      {openEditChargeModal &&
        <ModalAddCharge  title="Edição de cobrança" />
      }
      {openAddClientModal && <ModalAddClient toDo={"edit"} />}
      <div className="right">
        <Header
          title={
            <span className="header-title">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/clients");
                }}
              >
                Clientes
              </span>
              <span style={{ color: "grey" }}>{` >  Detalhes do cliente`}</span>
            </span>
          }
        ></Header>
        <div className="container-header-clients">
          <div>
            <span className="icons-header-clients">
              <img
                className="icon-clientsPage"
                src={clientsIconGray}
                alt="Icon Clients"
                style={{ marginRight: "10px" }}
              />
              {clientDetails.name}
            </span>
          </div>
        </div>
        <main className=" main-client-details">
          <ClientInfoDetails />
          <div className="container-header-table">
            <div className="header-table-charges-clientDetails">
              <h3>Cobranças do Cliente</h3>
              <Button color={"pink"} text="+ Nova Cobrança" action={() => setOpenAddChargeModal(true)} />
            </div>
            <TableCobrancas path={"details"} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ClientDetails;
