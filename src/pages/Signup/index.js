import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import passwordInvisible from '../../assets/password-invisible.svg';
import passwordVisible from '../../assets/password-visible.svg';
import signupCheck from '../../assets/signup-check.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading from '../../components/Loading/Loading';
import SignupProgress from '../../components/SignupProgress';
import useAuth from '../../hooks/useAuth';
import ToastAnimated, { showToast } from '../../toast/Toasts';
import './styles.css';

function Signup() {
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const { token } = useAuth();
  const history = useHistory();

  async function handleVerifyEmail(e) {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch(
        'https://collection-api-d05.herokuapp.com/user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      if (response.status > 204) {
        showToast({ type: 'error', message: data.mensagem });
        setLoading(false);
        return;
      }

      setActiveStep(activeStep + 1);
      setLoading(false);
    } catch (error) {
      showToast({ type: 'error', message: error.message });
      setLoading(false)
    }
  }

  async function registerUser() {
    try {
      setLoading(true)
      const response = await fetch(
        'https://collection-api-d05.herokuapp.com/password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (response.status > 204) {
        showToast({ type: 'error', message: data.mensagem });
        setLoading(false);
        return;
      }

      setActiveStep(activeStep + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast({ type: 'error', message: error.message });
    }
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      return showToast({
        type: 'error',
        message: 'Verifique os campos senha e confirmação estão iguais.',
      });
    }

    registerUser();
  }
  useEffect(() => {
    token && history.push('/home');
    // eslint-disable-next-line
  }, [token]);
  return (
    <div className="container-signup">
      {loading && <Loading/>}
      <ToastAnimated />
      <aside>
        <SignupProgress activeStep={activeStep} setActiveStep={setActiveStep} />
      </aside>
      {activeStep === 0 && (
        <div className="container-form">
          <h2>Adicione seus dados</h2>
          <form onSubmit={handleVerifyEmail}>
            <Input
              type="text"
              label="Nome*"
              placeholder="Digite seu nome"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
            />

            <Input
              type="text"
              label="E-mail*"
              placeholder="Digite seu e-mail"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
            />

            <Button text="Continuar" color="pink"></Button>
          </form>
          <span className="span-redirect-login">
            Já possui uma conta? Faça seu{' '}
            <Link to={'/'} className="linkToRegister">
              Login
            </Link>
          </span>
          <div className="lines">
            <div className="line line-green"></div>
            <div className="line line-gray"></div>
            <div className="line line-gray"></div>
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div className="container-form">
          <h2>Escolha sua senha</h2>
          <form onSubmit={handleSubmitForm}>
            <Input
              type={visible.password ? 'text' : 'password'}
              label="Senha*"
              placeholder="Crie uma senha"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            
            />
            <img
              className="password-icon"
              src={visible.password ? passwordVisible : passwordInvisible}
              alt=""
              onClick={() =>
                setVisible({ ...visible, password: !visible.password })
              }
            />
            <Input
              type={visible.confirmPassword ? 'text' : 'password'}
              label="Repita a senha*"
              placeholder="Confirme sua senha"
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
            <img
              className="password-icon confirm"
              src={
                visible.confirmPassword ? passwordVisible : passwordInvisible
              }
              alt=""
              onClick={() =>
                setVisible({
                  ...visible,
                  confirmPassword: !visible.confirmPassword,
                })
              }
            />
            <Button text="Cadastrar" color="pink"></Button>
          </form>
          <span className="span-redirect-login">
            Já possui uma conta? Faça seu{' '}
            <Link to={'/'} className="linkToRegister">
              Login
            </Link>
          </span>
          <div className="lines">
            <div className="line line-gray back-to-step-one" onClick={() => setActiveStep(0)}></div>
            <div className="line line-green"></div>
            <div className="line line-gray"></div>
          </div>
        </div>
      )}
      {activeStep === 2 && (
        <div className="container-form">
          <div className="signup-check">
            <img src={signupCheck} alt="" />
            <h3>Cadastro realizado com sucesso!</h3>
          </div>
          <Link to={'/'} className="linkToRegister">
            <Button text="Ir para o Login" color="pink"></Button>
          </Link>
          <div className="lines">
            <div className="line line-gray"></div>
            <div className="line line-gray"></div>
            <div className="line line-green"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
