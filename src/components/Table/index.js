import { useHistory } from "react-router-dom";
import useCharges from "../../hooks/useCharges";
import useClients from "../../hooks/useClients";
import "./styles.css";

function Line({ name, amount, chargeId, size, clientId, cpf }) {
  return size === "smallTable" ? (
    <div className="table-line">
      <div className="line-right">
        <span>{name}</span>
      </div>
      <div className="line-center">
        <span>{chargeId}</span>
      </div>
      <div className="line-left">
        <span>
          {(amount / 100).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </div>
  ) : (
    <div className="table-line">
      <div className="line-right">
        <span>{name}</span>
      </div>
      <div className="line-center">
        <span>{clientId}</span>
      </div>
      <div className="line-left">
        <span>
          {`${cpf.substr(
                  0,
                  3
                )}.${cpf.substr(3, 3)}.${cpf.substr(
                  6,
                  3
                )}-${cpf.substr(9, 2)}`}
        </span>
      </div>
    </div>
  );
}

function Table({ size, title, color, icon, tableContent }) {
  const history = useHistory();
  const { setCurrentChargesOnTable } = useCharges();
  const { setCurrentClientsOnTable } = useClients()

  return (
    <div className={`container-table ${size}`}>
     <div className="table-header">
        <div className="title-and-icon">
          <img src={icon} alt="" />
          <span className="title">{title}</span>
        </div>
        <div className={`length  ${color}`}>
          <span>{tableContent.length}</span>
        </div>
      </div>
      {tableContent.length > 0 &&  <div className="column-title">
        <div className="column-right">
          <span>Cliente</span>
        </div>
        <div className="column-center">
          <span>{size === "largeTable" ? "ID do cli." : "ID da cob."}</span>
        </div>
        <div className="column-left">
          <span>{size === "largeTable" ? "CPF" : "Valor"}</span>
        </div>
      </div>}
      {tableContent &&
        size === "smallTable" &&
        tableContent.map(
          (charge, index) =>
            index < 4 && (
              <Line
                name={charge.name}
                amount={charge.amount}
                chargeId={charge.id}
                size={size}
                date={charge.maturity_date}
              />
            )
        )}

      {tableContent &&
        size === "largeTable" &&
        tableContent.map(
          (client, index) =>
            index < 4 && (
              <Line
                name={client.name}
                cpf={client.cpf}
                clientId={client.id}
                size={size}
              />
            )
        )}
      <div
        className="linkToRegister see-all"
        onClick={() => {
          size=== "smallTable" &&
          setCurrentChargesOnTable(tableContent)
          size=== "largeTable" &&
          setCurrentClientsOnTable(tableContent)
          size=== "smallTable" ?
          history.push("/charges") :
          history.push("/clients")
        }}
      >
        {tableContent.length > 0 && <span>Ver todos</span>}
      </div>

    </div>
  );
}

export default Table;
