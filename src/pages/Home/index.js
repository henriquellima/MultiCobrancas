import { useEffect } from "react";
import availableClientsIcon from "../../assets/available-clients-icon.svg";
import defaultersClientsIcon from "../../assets/defaulters-clients-icon.svg";
import Aside from "../../components/Aside";
import Header from "../../components/Header";
import HomeResume from "../../components/HomeResume";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table";
import useCharges from "../../hooks/useCharges";
import useAuth from "../../hooks/useAuth";
import useClients from "../../hooks/useClients";
import "./styles.css";

function Home() {

 
  const { getClients, clients} = useClients();
  const { getCharges, charges, paid , expired, previews} = useCharges();
  

  const {loading } = useAuth();
 
 
  useEffect(() => {
    getCharges()
    getClients()
    // eslint-disable-next-line 
  },[])
 

  return (
    <div className="container-home">     
    {loading && <Loading/>}
      <Aside></Aside>
      <div className="right">
        <Header title = "Resumo das Cobranças"></Header>
        <main className="main">
          <HomeResume charges={charges}/>
          <div className={"smallTables"}>
            <Table
              size={"smallTable"}
              title={"Cobranças pagas"}
              color={"blue"}
              tableContent={paid}
              
            />
            <Table
              size={"smallTable"}
              title={"Cobranças vencidas"}
              color={"red"}
              tableContent={expired}
              
            />
            <Table
              size={"smallTable"}
              title={"Cobranças previstas"}
              color={"yellow"}
              tableContent={previews}
              
            />
          </div>
          <div className={"largeTables"}>
            <Table
              size={"largeTable"}
              title={"Clientes em dia"}
              color={"blue"}
              icon={availableClientsIcon}          
              tableContent={clients.filter(x => x.status ==="em dia")}    
             
            />
            <Table
              size={"largeTable"}
              title={"Clientes inadimplentes"}
              color={"red"}
              icon={defaultersClientsIcon}
              tableContent={clients.filter(x => x.status ==="inadimplente")}
              
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
