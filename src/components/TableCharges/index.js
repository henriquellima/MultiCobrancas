import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useEffect, useState } from 'react';
import clientTableIcon from '../../assets/client-table-icon.svg';
import editIcon from '../../assets/edit-user.svg';
import iconDelete from '../../assets/icon-delete.svg';
import useCharges from '../../hooks/useCharges';
import ModalChargeDetails from '../ModalChargeDetails';
import ModalConfirmDeleteCharge from '../ModalConfirmDeleteCharge';
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


function TableCobrancas({ path }) {
  const classes = useStyles();
  const [order, setOrder] = useState({ name: 'asc', id: 'asc' });
  const {
    getCharges,
    openAddChargeModal,
    currentChargesOnTable,
    setCurrentChargesOnTable,
    charges,
    setChargeDetails,
    setOpenEditChargeModal,
    openEditChargeModal,
    setChargeToDelete,
    isTodayDate, 
    isOverdueAccount
  } = useCharges();
  const [openModalChargeDetails, setOpenModalChargeDetails] = useState(false);
  const [openModalDeleteConfirm, setOpenModalDeleteConfirm] = useState(false);

  useEffect(() => {
    if (currentChargesOnTable.length === 0) {
      setCurrentChargesOnTable(charges);
    }
    // eslint-disable-next-line
  }, [charges]);

  useEffect(() => {
    getCharges();

    // eslint-disable-next-line
  }, [openAddChargeModal, openEditChargeModal]);

  function chargesAsc(property) {
    const chargesCopy = currentChargesOnTable;
    chargesCopy.sort((a, b) => {
      if (property === 'name') {
        return a[property].localeCompare(b[property]);
      } else {
        return a[property] - b[property];
      }
    });
    setCurrentChargesOnTable(chargesCopy);
    setOrder(
      property === 'name'
        ? { ...order, name: 'desc' }
        : { ...order, id: 'desc' }
    );
  }

  function chargesDesc(property) {
    const chargesCopy = currentChargesOnTable;
    chargesCopy.sort((a, b) => {
      if (property === 'name') {
        return b[property].localeCompare(a[property]);
      } else {
        return b[property] - a[property];
      }
    });
    setCurrentChargesOnTable(chargesCopy);
    setOrder(
      property === 'name' ? { ...order, name: 'asc' } : { ...order, id: 'asc' }
    );
  }

  return (
    <div className='container-table'>
      {openModalChargeDetails && (
        <ModalChargeDetails
          openModalChargeDetails={openModalChargeDetails}
          setOpenModalChargeDetails={setOpenModalChargeDetails}
        />
      )}
      {openModalDeleteConfirm && (
        <ModalConfirmDeleteCharge
          setOpenModalDeleteConfirm={setOpenModalDeleteConfirm}
        />
      )}
      <TableContainer component={Paper} className={classes.table}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              {path === 'charges' && (
                <StyledTableCell align='center'>
                  <div className='title-client-and-icon'>
                    <img
                      src={clientTableIcon}
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        order.name === 'desc'
                          ? chargesDesc('name')
                          : chargesAsc('name')
                      }
                      alt=''
                    />
                    <span> Cliente</span>
                  </div>
                </StyledTableCell>
              )}
              <StyledTableCell align='center'>
                <div className='title-client-and-icon'>
                  <img
                    src={clientTableIcon}
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      order.id === 'desc' ? chargesDesc('id') : chargesAsc('id')
                    }
                    alt=''
                  />
                  <span>ID Cob.</span>
                </div>
              </StyledTableCell>

              <StyledTableCell align='center'>Valor</StyledTableCell>
              <StyledTableCell align='center'>Data de venc.</StyledTableCell>
              <StyledTableCell align='center'>Status</StyledTableCell>
              <StyledTableCell align='center'>Descrição</StyledTableCell>
              <StyledTableCell align='center'></StyledTableCell>
              <StyledTableCell align='center'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.borderRadius}>
            {currentChargesOnTable &&
              currentChargesOnTable.map((charge) => (
                <StyledTableRow
                  key={charge.id}
                  hover
                  className='cursor-pointer'
                  onClick={() => {
                    setChargeDetails(charge);
                    setOpenModalChargeDetails(true);
                  }}
                >
                  {path === 'charges' && (
                    <StyledTableCell align='center'>
                      {charge.name}
                    </StyledTableCell>
                  )}
                  <StyledTableCell align='center'>{charge.id}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {(charge.amount / 100).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {charge.maturity_date
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('/')}
                  </StyledTableCell>
                  {charge.paid && (
                    <StyledTableCell align='center'>
                      <span className='tableElement-paid'>Paga</span>
                    </StyledTableCell>
                  )}
                  {!charge.paid &&
                  (isTodayDate(new Date(charge.maturity_date), new Date()) ||
                  !isOverdueAccount(new Date(charge.maturity_date), new Date())) && (
                      <StyledTableCell align='center'>
                        <span className='tableElement-preview'> Pendente</span>
                      </StyledTableCell>
                    )}
                  {!charge.paid &&
                  (!isTodayDate(new Date(charge.maturity_date), new Date()) &&
                  isOverdueAccount(new Date(charge.maturity_date), new Date())) && (
                      <StyledTableCell align='center'>
                        <span className='tableElement-expired'> Vencida</span>
                      </StyledTableCell>
                    )}
                  <StyledTableCell className='descriptionSpace' align='center'>
                    {charge.description}
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='table-icons table-element'
                    style={{ padding: 10 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setChargeDetails(charge);
                      setOpenEditChargeModal(true);
                    }}
                  >
                    <div className='table-edit-icon'>
                      <img src={editIcon} alt='' />
                      <span>Editar</span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='table-icons table-element'
                    style={{ padding: 10 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setChargeToDelete(charge);
                      setOpenModalDeleteConfirm(true);
                    }}
                  >
                    <div className='table-delete-icon'>
                      <img src={iconDelete} alt='' />
                      <span>Excluir</span>
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

export default TableCobrancas;
