import { useState } from 'react';
import InputMask from 'react-input-mask';
import clientsIconGray from '../../assets/clients-gray.svg';
import closeIcon from '../../assets/close-icon.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import useClients from '../../hooks/useClients';
import ToastAnimated, { showToast } from '../../toast/Toasts';
import Loading from '../Loading/Loading';
import './styles.css';

export default function ModalAddClient({ toDo }) {
  const { clientDetails, setClientDetails, setCurrentClientsOnTable} = useClients();
  const { setOpenAddClientModal } = useClients();
  const { baseURL, token } = useAuth();
  const [name, setName] = useState(toDo === 'edit' ? clientDetails.name : '');
  const [email, setEmail] = useState(
    toDo === 'edit' ? clientDetails.email : ''
  );
  const [cpf, setCpf] = useState(toDo === 'edit' ? clientDetails.cpf : '');
  const [telephone, setTelephone] = useState(
    toDo === 'edit' ? clientDetails.telephone : ''
  );
  const [zip_code, setZip_code] = useState(
    toDo === 'edit' ? clientDetails.zip_code : ''
  );
  const [address, setAddress] = useState(
    toDo === 'edit' ? clientDetails.address : ''
  );
  const [address_2, setAddress_2] = useState(
    toDo === 'edit' ? clientDetails.address_2 : ''
  );
  const [district, setDistrict] = useState(
    toDo === 'edit' ? clientDetails.district : ''
  );
  const [city, setCity] = useState(toDo === 'edit' ? clientDetails.city : '');
  const [uf, setUf] = useState(toDo === 'edit' ? clientDetails.uf : '');

  const [loading, setLoading] = useState(false);

  async function handleEditClient(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!name) {
        setLoading(false);
        return showToast({
          type: 'error',
          message: 'O campo nome é obrigatório.',
        }
        );
      }
      if (!email) {
        setLoading(false);
        return showToast({
          type: 'error',
          message: 'O campo email é obrigatório.',
        });
      }
      if (!telephone) {
        setLoading(false);
        return showToast({
          type: 'error',
          message: 'O campo telefone é obrigatório.',
        });
      }
      if (!cpf) {
        setLoading(false);
        return showToast({
          type: 'error',
          message: 'O campo CPF é obrigatório.',
        });
      }

      const body = {
        name: name,
        email: email,
        cpf: cpf.split('.').join('').split('-').join(''),
        telephone: telephone
          .split('(')
          .join('')
          .split(')')
          .join('')
          .split('-')
          .join('')
          .split(' ')
          .join(''),
        zip_code: zip_code,
        address: address,
        address_2: address_2,
        district: district,
        city: city,
        uf: uf,
      };

      const response = await fetch(`${baseURL}/client/${clientDetails.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.status > 204) {
        setLoading(false);
        showToast({
          type: 'error',
          message: 'Não foi possivel atualizar o cliente',
        });
        return;
      }
      setLoading(false);
      setOpenAddClientModal(false);
      showToast({
        type: 'success',
        message: 'Cliente atualizado com sucesso!!',
      });
      setClientDetails(await response.json());
    } catch (error) {
      setLoading(false);
      showToast({ type: 'error', message: 'O campo nome é obrigatório' });
    }
  }

  async function handleAddClient(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!name) {
        setLoading(false);
        return showToast({
          type: 'error',
          message: 'O campo nome é obrigatório.',
        });
      }
      if (!email) {
        setLoading(false);
        return showToast({
          type: 'error',
          message: 'O campo email é obrigatório.',
        });
      }
      if (!telephone) {
        setLoading(false);
        return showToast({
          type: 'error',
          message: 'O campo telefone é obrigatório.',
        });
      }
      if (!cpf) {
        setLoading(false);
        return showToast({
          type: 'error',
          message: 'O campo CPF é obrigatório.',
        });
      }

      const body = {
        name: name,
        email: email,
        cpf: cpf.split('.').join('').split('-').join(''),
        telephone: telephone
          .split('(')
          .join('')
          .split(')')
          .join('')
          .split('-')
          .join('')
          .split(' ')
          .join(''),
        zip_code: zip_code,
        address: address,
        address_2: address_2,
        district: district,
        city: city,
        uf: uf,
      };

      const response = await fetch(`${baseURL}/client`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.status > 204) {
        setLoading(false);
        showToast({ type: 'error', message: data.mensagem });
        return;
      }
      setCurrentClientsOnTable([])
      setLoading(false);
      setOpenAddClientModal(false);
      showToast({ type: 'success', message: 'Cliente criado com sucesso!!' });
    } catch (error) {
      setLoading(false);
      showToast({ type: 'error', message: `${error.message}` });
    }
  }

  async function viaCEP(value) {
    setZip_code(value);

    if (value.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
      const body = await response.json();
      if (response.status === 400 || body.erro) {
        showToast({ type: 'error', message: 'CEP Invalido' });
        return;
      }
      setUf(body.uf);
      setAddress(body);
      setDistrict(body.bairro);
      setAddress(body.logradouro);
      setCity(body.localidade);
    }
  }
  return (
    <div className="page-modal-addClient">
      {loading && <Loading />}
      <ToastAnimated />
      <div className="modal-addClient">
        <div className="modal-addClient-header">
          <img className="img-header" src={clientsIconGray} alt="icon client" />
          <h2>{toDo === 'edit' ? 'Editar cliente' : 'Cadastro do Cliente'}</h2>
          <img
            onClick={() => setOpenAddClientModal(false)}
            className="closeIcon-header"
            src={closeIcon}
            alt="close"
          />
        </div>
        <div>
          <form onSubmit={toDo === 'edit' ? handleEditClient : handleAddClient}>
            <Input  className="input-add-client"
              onChange={(e) => setName(e.target.value)}
              type="text"
              label="Nome*"
              required
              value={name}
              placeholder="Digite o nome"
            />
            <Input className="input-add-client"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email*"
              required
              value={email}
              placeholder="Digite o e-mail"
            />
            <div className="inputs-addClient" >
            <div className="input-component">
              <label htmlFor="">CPF*</label>

            <InputMask className="input-component"
              mask="999.999.999-99"
              maskChar={null}
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              label="CPF"
              placeholder="Digite seu CPF"
            />

  
</div>
<div className="input-component">
              <label htmlFor="">Telefone*</label>
              <InputMask
                mask={'(99) 99999-9999'}
                maskChar={null}
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                label="Telefone"
                placeholder="Digite o seu telefone"
              />
             
          
              </div>
            </div>
            <Input className="input-add-client"
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              label="Endereço"
              value={address}
              placeholder="Digite o endereço"
            />
            <Input className="input-add-client"
              onChange={(e) => setAddress_2(e.target.value)}
              type="text"
              label="Complemento"
              value={address_2}
              placeholder="Digite o complemento"
            />
            <div className="inputs-addClient">
              <Input className="input-add-client"
                onChange={(e) => viaCEP(e.target.value)}
                type="text"
                maxLength="8char"
                label="CEP"
                value={zip_code || null}
                placeholder="Digite o CEP"
              />
              <Input className="input-add-client"
                onChange={(e) => setDistrict(e.target.value)}
                type="text"
                label="Bairro"
                value={district}
                placeholder="Digite o bairro"
              />
            </div>
            <div className="inputs-addClient">
              <Input className="input-add-client"
                onChange={(e) => setCity(e.target.value)}
                type="text"
                label="Cidade"
                value={city}
                placeholder="Digite a cidade"
              />
              <Input className="input-add-client"
                onChange={(e) => setUf(e.target.value)}
                type="text"
                label="UF"
                minLength="2char"
                maxLength="2char"
                value={uf}
                placeholder="Digite o estado"
              />
            </div>
            <div className="buttons-addClient">
              <Button className="button" color={'pink'} text="Aplicar" />
              <Button
                action={() => setOpenAddClientModal(false)}
                className="button"
                color={'grey'}
                text="Cancelar"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
