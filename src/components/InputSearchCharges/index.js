import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import notFound from '../../assets/notfound-background.svg'
import notFound2 from '../../assets/notfound-background 2.svg'
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import './styles.css';
import useCharges from '../../hooks/useCharges';

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

function InputSearchCharges({
  setChargesSearch,
  chargesSearch
}) {
  const classes = useStyles();
  const { currentChargesOnTable, setCurrentChargesOnTable, charges } = useCharges();
  const [chargesFull, setChargesFull] = useState(currentChargesOnTable);

  useEffect(() => {
    setCurrentChargesOnTable(
      // eslint-disable-next-line
        chargesFull.filter((charge) => {
          if (
            chargesSearch.toLowerCase() === charge.name.substr(0, chargesSearch.length).toLowerCase() ||
            chargesSearch === charge.id.toString().substr(0, chargesSearch.length)
            
          ) {
            return true;
          }})
      // eslint-disable-next-line
  )}, [chargesSearch]);

  useEffect(() => {
      setChargesFull(currentChargesOnTable);
      // eslint-disable-next-line
  }, [charges]);

  return (
    <Paper component="form" className={classes.root}>
      {currentChargesOnTable.length === 0 &&  chargesSearch  && (
        <div className="background-notFound">
          <img className={"notFoundIcon2"} src={notFound2} alt="" />
          <img className={"notFoundIcon"} src={notFound} alt="" />
        <span className="invalidSearch">Nenhum resultado foi encontrado!</span>
        <span className="notFound-text2">Verifique se a escrita está correta</span>
        </div>
      )}
      <InputBase
        onChange={(e) => setChargesSearch(e.target.value)
        }
        value={chargesSearch}
        className={classes.input}
        placeholder="Pesquise por nome do cliente ou ID"
        inputProps={{ 'aria-label': 'sek 0rch clients' }}
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

export default InputSearchCharges;
