import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import notFound from '../../assets/notfound-background.svg'
import notFound2 from '../../assets/notfound-background 2.svg'
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import useClients from '../../hooks/useClients';
import "./styles.css"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 2px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    height: 40,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function InputSearch({ setSearch, search }) {
  const classes = useStyles();
  const { currentClientsOnTable, setCurrentClientsOnTable, clients } = useClients();
  const [clientsFull, setClientsFull] = useState(currentClientsOnTable);

  function clientsSearch({ value }) {
    setSearch(value);
    
  }

  useEffect(() => {
    console.log(currentClientsOnTable)
    setCurrentClientsOnTable(
        // eslint-disable-next-line 
      clientsFull.filter((client) => {
        if (
          search.toLowerCase() === client.name.substr(0, search.length).toLowerCase() ||
          search.toLowerCase() === client.cpf.substr(0, search.length).toLowerCase() ||
          search.toLowerCase() === client.email.substr(0, search.length).toLowerCase()
        ) {
          return true
        }
      })
    );

    // eslint-disable-next-line
  }, [search])

  useEffect(() => {
    setClientsFull(currentClientsOnTable);
    // eslint-disable-next-line
  }, [clients]);

  return (
    <Paper component="form" className={classes.root}>
      {currentClientsOnTable.length === 0 && 
              <div className="background-notFound">
              <img className={"notFoundIcon2"} src={notFound2} alt="" />
              <img className={"notFoundIcon"} src={notFound} alt="" />
            <span className="invalidSearch">Nenhum resultado foi encontrado!</span>
            <span className="notFound-text2">Verifique se a escrita está correta</span>
            </div>}
      <InputBase
        onChange={(e) => clientsSearch(e.target)}
        value={search}
        className={classes.input}
        placeholder="Pesquise por nome, CPF ou Email"
        inputProps={{ 'aria-label': 'search clients' }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={(e) => e.preventDefault()}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default InputSearch;
