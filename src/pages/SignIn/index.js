import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import passwordInvisible from '../../assets/password-invisible.svg';
import passwordVisible from '../../assets/password-visible.svg';
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import ToastAnimated, { showToast } from "../../toast/Toasts";
import "./styles.css";

function Signin() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { setToken, token, userData } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory()

  useEffect(() => {
    token && history.push('/home');
    // eslint-disable-next-line
  }, [userData]);

  function handleSubmitLogin(e) {
    e.preventDefault();
    userLogin();
  }




  async function userLogin() {
    try {
      setLoading(true)
      const response = await fetch(
        "https://collection-api-d05.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (response.status !== 200) {
        showToast({ type: "error", message: data.mensagem });
        setLoading(false);
        return;
      }
      setLoading(false);
      setToken(data.token);

    } catch (error) {
      showToast({ type: 'error', message: error.message });
      setLoading(false)
    }
  }
  return (
    <div className="pageContainer">
      {loading && <Loading/>}
      <ToastAnimated />
      <div className="divImage">
        <h2 className="imagetext">
          Gerencie todos os pagamentos <br /> da sua empresa em um só <br />{' '}
          lugar.
        </h2>
      </div>
      <div className="loginContainer">
        <h2>Faça seu login!</h2>
        <form className="form" onSubmit={handleSubmitLogin}>
          <Input
            label={"E-mail"}
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder={"Digite seu e-mail"}
          />
            <div className="forget">
          <Input
            label={"Senha"}
            type={visible ? 'text' : 'password'}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder={"Digite sua senha"}
          />
            <span className="linkToRegister">Esqueceu a senha?</span>
          </div>
                      <img
              className="password-icon confirm"
              src={
                visible ? passwordVisible : passwordInvisible
              }
              alt=""
              onClick={() =>
                setVisible(!visible)
              }
            />
          <Button className="button" color={"pink"} text="Entrar" />
        </form>
        <span>
          Ainda não possui uma conta?{" "}
          <Link to={"/register"} className="linkToRegister">
            Cadastre-se
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Signin;
