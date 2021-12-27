import useClients from '../../hooks/useClients';
import editIcon from '../../assets/edit-client.svg';
import './styles.css';

export default function ClientInfoDetails() {
  const { clientDetails, setOpenAddClientModal } = useClients();

  return (
    <div className="clientDetails-Container">
      <span className="clientDetails-header">
        <h3>Dados do Cliente</h3>
        <button
          onClick={() => setOpenAddClientModal(true)}
          className="clientEdit-button"
        >
          <img className="editIcon" src={editIcon} alt="edit"></img>Editar
          Cliente
        </button>
      </span>
      <div className="personalInfos-container">
        <span className="info-container">
          <h5 className="infoTittle">Email</h5>
          <p className="info">{clientDetails.email}</p>
        </span>
        <span className="info-container">
          <h5 className="infoTittle">Telefone</h5>
          <p className="info">{clientDetails.telephone}</p>
        </span>
        <span className="info-container">
          <h5 className="infoTittle">CPF</h5>
          <p className="info">{clientDetails.cpf}</p>
        </span>
      </div>
      <div className="personalAdressInfos-container">
        <span className="info-container">
          <h5 className="infoTittle">Endereço</h5>
          <p className="info">{clientDetails.address || '-'}</p>
        </span>
        <span className="info-container">
          <h5 className="infoTittle">Bairro</h5>
          <p className="info">{clientDetails.district || '-'}</p>
        </span>
        <span className="info-container">
          <h5 className="infoTittle">Complemento</h5>
          <p className="info">{clientDetails.address_2 || '-'}</p>
        </span>
        <span className="info-container">
          <h5 className="infoTittle">CEP</h5>
          <p className="info">{clientDetails.zip_code || '-'}</p>
        </span>
        <span className="info-container">
          <h5 className="infoTittle">Cidade</h5>
          <p className="info">{clientDetails.city || '-'}</p>
        </span>
        <span className="info-container">
          <h5 className="infoTittle">UF</h5>
          <p className="info">{clientDetails.uf || '-'}</p>
        </span>
      </div>
    </div>
  );
}
