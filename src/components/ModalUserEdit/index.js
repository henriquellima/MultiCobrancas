import { useState } from 'react';
import closeIcon from '../../assets/close-icon.svg';
import passwordInvisible from '../../assets/password-invisible.svg';
import passwordVisible from '../../assets/password-visible.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from 'react-input-mask';
import useAuth from '../../hooks/useAuth';
import Loading from '../Loading/Loading';
import ToastAnimated, { showToast } from '../../toast/Toasts';
import './styles.css';

export default function ModalEdit({ setShowEditUser, setShowEditConfirm }) {
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const { token, userData, setUserData } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEditingData, setUserEditingData] = useState(userData);
  const [changePassword, setChangePassword] = useState(false);

  async function updateUser(event) {
    event.preventDefault();

    if (
      userEditingData.password &&
      userEditingData.password !== confirmPassword &&
      changePassword
    ) {
      showToast({ type: 'error', message: 'Senhas não coincidem' });
      return;
    }
    if (changePassword && userEditingData.password === '') {
      showToast({ type: 'error', message: 'Informe sua nova senha' });
      return;
    }
    if (changePassword && userEditingData.password.length < 6) {
      showToast({
        type: 'error',
        message: 'Informe uma senha com mais de 6 caracteres',
      });
      return;
    }
    if (
      !changePassword &&
      userEditingData.cpf === userData.cpf &&
      userEditingData.telephone === userData.telephone &&
      userEditingData.email === userData.email &&
      userEditingData.name === userData.name
    ) {
      showToast({
        type: 'error',
        message: 'Nenhuma alteração feita',
      });
      return;
    }
      if (userEditingData.cpf) {
        userEditingData.cpf = userEditingData.cpf
          .split('.')
          .join('')
          .split('-')
          .join('');
      }
    if (userEditingData.telephone) {
      userEditingData.telephone = userEditingData.telephone
        .split('(')
        .join('')
        .split(')')
        .join('')
        .split('-')
        .join('')
        .split(' ')
        .join('');
    }

    try {
      setLoading(true);
      const response = await fetch(
        'https://collection-api-d05.herokuapp.com/user',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/JSON',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userEditingData),
        }
      );

      const profile = await response.json();

      if (response.status > 204) {
        showToast({ type: 'error', message: profile.mensagem });
        setLoading(false);
        return;
      }

      setUserData(profile);
      setLoading(false);
      setShowEditUser(false);
      setShowEditConfirm(true);
    } catch (error) {
      showToast({ type: 'error', message: error.message });
      setLoading(false);
    }
  }

  return (
    <div className="pageModal">
      {loading && <Loading />}
      <ToastAnimated />
      <div className="modal">
        <img
          onClick={() => setShowEditUser(false)}
          className="closeIcon"
          src={closeIcon}
          alt=""
        />
        <h2>Editar seus Dados</h2>
        <form onSubmit={updateUser}>
          <Input
            onChange={(e) =>
              setUserEditingData({ ...userEditingData, name: e.target.value })
            }
            value={userEditingData.name}
            type="text"
            label="Nome*"
            placeholder="Digite seu nome"
            required={true}
          />
          <Input
            onChange={(e) =>
              setUserEditingData({ ...userEditingData, email: e.target.value })
            }
            value={userEditingData.email}
            type="email"
            label="Email*"
            placeholder="Digite seu nome"
            required={true}
          />
          <div className="twoInputs">
            <div className="input-component">
              <label htmlFor="">CPF</label>
              <InputMask
                mask="999.999.999-99"
                maskChar={null}
                value={userEditingData.cpf}
                onChange={(e) =>
                  setUserEditingData({
                    ...userEditingData,
                    cpf: e.target.value,
                  })
                }
                label="CPF"
                placeholder="Digite seu CPF"
              />
            </div>
            <div className="input-component">
              <label htmlFor="">Telefone</label>
              <InputMask
                mask="(99) 99999-9999"
                maskChar={null}
                value={userEditingData.telephone}
                onChange={(e) =>
                  setUserEditingData({
                    ...userEditingData,
                    telephone: e.target.value,
                  })
                }
                label="Telefone"
                placeholder="Digite o seu telefone"
              />
            </div>
          </div>
          <p
            className="buttonChangePassword"
            onClick={() => {
              setChangePassword(!changePassword);
            }}
          >
            {changePassword ? 'Não alterar senha' : 'Alterar senha'}
          </p>
          {changePassword && (
            <div className="changePasswordContainer">
              <div className="divPassword">
                <Input
                  onChange={(e) =>
                    setUserEditingData({
                      ...userEditingData,
                      password: e.target.value,
                    })
                  }
                  value={userEditingData.password}
                  type={visible.password ? 'text' : 'password'}
                  label="Senha"
                  placeholder="Digite sua senha"
                />
                <img
                  className="password-icon1"
                  src={visible.password ? passwordVisible : passwordInvisible}
                  alt=""
                  onClick={() =>
                    setVisible({ ...visible, password: !visible.password })
                  }
                />
              </div>
              <div className="divPassword">
                <Input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword || ''}
                  type={visible.confirmPassword ? 'text' : 'password'}
                  label="Repita a senha"
                  placeholder="Confirme sua senha"
                />
                <img
                  className="password-icon2 confirm1"
                  src={
                    visible.confirmPassword
                      ? passwordVisible
                      : passwordInvisible
                  }
                  alt=""
                  onClick={() =>
                    setVisible({
                      ...visible,
                      confirmPassword: !visible.confirmPassword,
                    })
                  }
                />
              </div>
            </div>
          )}

          <Button className="button" color={'pink'} text="Enviar" />
        </form>
      </div>
    </div>
  );
}
