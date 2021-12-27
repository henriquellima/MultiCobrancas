import Button from '../../components/Button'
import confirmEdit from '../../assets/confirmUserEdit.svg'
import './styles.css'

export default function Modalconfirm({ closeModal }){


    return(
      <div className='confirmEditPage'>
        <div className='confirmEditModal'>
        <img src={confirmEdit} alt=''></img>
        <h2>Cadastro Alterado com sucesso!</h2>
        <Button action={() => closeModal(false)} className="button" color={'pink'} text="FECHAR" />
        </div>
      </div>
    )
  }