import { Link } from "react-router-dom";

import "./styles.css";
import chargesIconGray from "../../assets/charges-gray.svg";
import chargesIconPink from "../../assets/charges-pink.svg";
import clientsIconGray from "../../assets/clients-gray.svg";
import clientsIconPink from "../../assets/clients-pink.svg";
import homeIconPink from "../../assets/home-pink.svg";
import homeIconGray from "../../assets/home-gray.svg";
import useCharges from "../../hooks/useCharges";
import useClients from "../../hooks/useClients";


function Aside() {
  const { setCurrentChargesOnTable, getCharges, setChargeDetails, setOpenEditChargeModal, setOpenAddChargeModal } = useCharges()
  const { setCurrentClientsOnTable, clients } = useClients()


  return (
    <aside className="container-aside" onClick={() => {
      setChargeDetails() 
      setOpenEditChargeModal(false) 
      setOpenAddChargeModal(false)

    }}>
      <Link to={"/home"} className="link linkToHome">
      <div className={`container-aside-icon icon-home ${
          window.location.pathname === "/home" && "pink-decoration"
        }`}>
          <img src={  window.location.pathname === "/home" ? homeIconPink : homeIconGray} alt="" />
        Home 
      </div>
        </Link>
        <Link to={"/clients"} className="link linkToClients" onClick={() => setCurrentClientsOnTable(clients)}>
      <div
        className={`container-aside-icon icon-clients ${
          window.location.pathname === "/clients" && "pink-decoration"
        } ${
          window.location.pathname === "/clients/details" && "pink-decoration"
        }`}
      >
          <img src={  window.location.pathname.includes("/clients") ? clientsIconPink : clientsIconGray } alt="" />
        Clientes
      </div>
        </Link>

        <Link to={"/charges"} className="link linkToCharges" onClick={() => {
          getCharges()
          setCurrentChargesOnTable([])}
          }>
      <div
        className={`container-aside-icon icon-challenges ${
          window.location.pathname === "/charges" && "pink-decoration"
        }`}
      >
          <img src={  window.location.pathname === "/charges" ? chargesIconPink : chargesIconGray} alt="" />
        Cobranças
      </div>
        </Link>
    </aside>
  );
}

export default Aside;
