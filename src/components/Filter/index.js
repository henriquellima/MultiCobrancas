import { useState } from 'react';
import CheckBoxFilter from '../CheckBoxFilter';
import Button from '../Button';
import triangle from '../../assets/triangle.svg';
import InputMask from 'react-input-mask';
import './styles.css';
import useClients from '../../hooks/useClients';
import useCharges from '../../hooks/useCharges';
import { SentimentVeryDissatisfiedSharp } from '@material-ui/icons';

function Filter(props) {
  // eslint-disable-next-line
  const [date, setDate] = useState("");
  const [paid, setPaid] = useState(false);


  const [copyData, setCopyData] = useState(props.data);
  console.log(props);

  function filter() {
        if (date.length === 10) {
      props.setData(copyData.filter((object) => {
        if(new Date(`${date.slice(3, 5)}/${date.slice(0, 2)}/${date.slice(-4)}`).toUTCString().slice(0,16) === new Date(object.maturity_date).toUTCString().slice(0, 16)){
          return true
        }
      }))
      props.setShowFilter(false)
    }
  }

  function clearFilter(){
    props.setData(copyData)
    setDate('')
    props.setShowFilter(false)
  }

  return (
    <div
      style={{ left: props.page === 'clients' ? '35px' : '-140px' }}
      className="filter"
    >
      {/* <Checkbox />

      <div>
        <label htmlFor="">Data</label>
        <InputMask
          mask="99/99/9999"
          maskChar={null}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          label="Vencimento:*"
          placeholder="Data de Vencimento"
        />
      </div>
      <div className="buttons">
              <Button className="button" color={'pink'} text="Aplicar" />
              <Button
                className="button"
                color={'grey'}
                text="Cancelar"
              />
              </div> */}
      <img src={triangle} alt="" className="triangle" />
      <CheckBoxFilter paid={paid} setPaid={setPaid} />
      <div className="input-component filter-input ">
        <label htmlFor="">Data</label>
        <InputMask
          mask="99/99/9999"
          maskChar={null}
          label="Vencimento:*"
          placeholder="DD/MM/AAAA"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="buttons-filter">
        <Button className="button" action={filter} color={'pink'} text="Aplicar" />
        <Button
          className="button"
          color={'grey'}
          text="Cancelar"
          action={clearFilter}
        />
      </div>
    </div>
  );
}

export default Filter;
