import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import clientTableIcon from '../../assets/client-table-icon.svg';
import createChargeIcon from '../../assets/create-charges-icon.svg';
import useClients from '../../hooks/useClients';
import './styles.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#FFFFF',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#3F3F55;',
  },
  body: {
    fontWeight: 'normal',
    fontSize: '14px',
    color: '#6E6E85',
    marginTop: '5px',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    borderRadius: 30,
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 'fit-content',
    backgroundColor: '#fff',
    borderRadius: 30,
  },
});

function TableClients({ setOpenAddChargeModal, openAddChargeModal }) {
  const classes = useStyles();
  const {
    clients,
    openAddClientModal,
    getClients,
    setClientDetails,
    setCurrentClient,
    currentClientsOnTable, 
    setCurrentClientsOnTable
  } = useClients();
  const [order, setOrder] = useState('asc');
  const history = useHistory();


  useEffect(() => {
    if(currentClientsOnTable.length === 0){

      setCurrentClientsOnTable(clients)
    }

    // eslint-disable-next-line
  }, [clients]);
  
  useEffect(() => {
    getClients();
    
    // eslint-disable-next-line
  }, [openAddClientModal]);

  function clientsAsc() {
    const clientsCopy = currentClientsOnTable;
    clientsCopy.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setCurrentClientsOnTable(clientsCopy);
    setOrder('desc');
  }

  function clientsDesc() {
    const clientsCopy = currentClientsOnTable;
    clientsCopy.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
    setCurrentClientsOnTable(clientsCopy);
    setOrder('asc');
  }

  function detailClient(client) {
    setClientDetails(client);
    history.push('/clients/details');
  }


  return (
    <div className="container-table">
      <TableContainer component={Paper} className={classes.table}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <div className="title-client-and-icon">
                  <img
                    src={clientTableIcon}
                    onClick={order === 'asc' ? clientsAsc : clientsDesc}
                    style={{ cursor: 'pointer' }}
                    alt=""
                  />{' '}
                  <span> Cliente</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">CPF</StyledTableCell>
              <StyledTableCell align="center">Telefone</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Criar cobrança</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.borderRadius}>
            {currentClientsOnTable && currentClientsOnTable.map((client) => (
              <StyledTableRow key={client.id} hover>
                <StyledTableCell
                  align="center"
                  className="table-element"
                  onClick={() => {
                    setCurrentClient({ name: client.name, id: client.id });
                    detailClient(client);
                  }}
                >
                  {client.name}
                </StyledTableCell>
                <StyledTableCell align="center">{client.email}</StyledTableCell>
                <StyledTableCell align="center">{`${client.cpf.substr(
                  0,
                  3
                )}.${client.cpf.substr(3, 3)}.${client.cpf.substr(
                  6,
                  3
                )}-${client.cpf.substr(9, 2)}`}</StyledTableCell>
                <StyledTableCell align="center">
                  {`(${client.telephone.substr(
                    0,
                    2
                  )}) ${client.telephone.substr(
                    2,
                    4
                  )} - ${client.telephone.substr(6, 5)}`}
                </StyledTableCell>
                <StyledTableCell align="center"><span className={`client-status-table 
                ${client.status === "inadimplente" ? 'status-red' : 'status-blue'}`}
                >{client.status}</span></StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {  
                    setClientDetails({ name: client.name, id: Number(client.id) });
                    setOpenAddChargeModal(!openAddChargeModal);
                  }}
                  className="table-element"
                  style={{ padding: 0 }}
                >
                  <div className="icon-and-text-addCharge">
                    <img src={createChargeIcon} alt="" />
                    <span
                    style={{fontWeight: 500}}>Cobrança</span>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableClients;
