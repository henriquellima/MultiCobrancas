import { useState } from "react";
import InputMask from "react-input-mask";
import IntlCurrencyInput from "react-intl-currency-input";
import chargesIconGray from "../../assets/charges-gray.svg";
import closeIcon from "../../assets/close-icon.svg";
import useAuth from "../../hooks/useAuth";
import useCharges from "../../hooks/useCharges";
import useClients from "../../hooks/useClients";
import ToastAnimated, { showToast } from "../../toast/Toasts";
import Button from "../Button";
import CheckBox from "../CheckBox";
import Input from "../Input";
import "./styles.css";

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

export default function ModalAddCharge({ title }) {
  const { clientDetails } = useClients();

  const { token, baseURL } = useAuth();
  const {
    setOpenAddChargeModal,
    setOpenEditChargeModal,
    chargeDetails,
    setChargeDetails,
    getCharges,
    setCurrentChargesOnTable,
  } = useCharges();

  const [name] = useState(chargeDetails ? chargeDetails.name : clientDetails.name)

  const [description, setDescription] = useState(
    chargeDetails ? chargeDetails.description : ""
  );

  const [maturityDate, setMaturityDate] = useState(
    chargeDetails
      ? chargeDetails.maturity_date.split("T")[0].split("-").reverse().join("/")
      : ""
  );
  const [amount, setAmount] = useState(
    chargeDetails ? chargeDetails.amount / 100 : null
  );
  const [paid, setPaid] = useState(chargeDetails ? chargeDetails.paid : false);

  function handleAmount(event, value) {
    setAmount(value);
  }

  async function handleAddCharge(body) {

    try {
      const response = await fetch(`${baseURL}/charge/${clientDetails.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.status > 204) {
        showToast({ type: "error", message: data.mensagem });
        return;
      }
      getCharges()
      setCurrentChargesOnTable([])
      setOpenAddChargeModal(false);
      showToast({
        type: "success",
        message: "Cobrança cadastrada com sucesso!!",
      });
    } catch (error) {
      showToast({ type: "succes", message: `${error.message}` });
    }
  }
  async function handleEditCharge(body) {

    try {
      const response = await fetch(`${baseURL}/charge/${chargeDetails.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.status > 204) {
        showToast({ type: "error", message: data.mensagem });
        return;
      }

      getCharges()
      setChargeDetails()
      setCurrentChargesOnTable([])
      setOpenEditChargeModal(false);
      showToast({
        type: "success",
        message: "Cobrança editada com sucesso!!",
      });
    } catch (error) {
      showToast({ type: "error", message: `${error.message}` });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      return showToast({
        type: "error",
        message: "O campo descrição é obrigatório.",
      });
    }
    if (!amount) {
      return showToast({
        type: "error",
        message: "O campo valor é obrigatório.",
      });
    }
    if (!maturityDate) {
      return showToast({
        type: "error",
        message: "O campo vencimento é obrigatório.",
      });
    }
    const body = {
      description: description,
      maturity_date: maturityDate.split("/").reverse().join("-"),
      amount: amount.toString().replace(/\D+/g, ''),
      paid: paid,
    };

    if (chargeDetails) {
      handleEditCharge(body)

    } else {
      handleAddCharge(body);

    }

  }
  return (
    <div
      className="page-modal-addCharges"
      onClick={() => {
        setOpenEditChargeModal(false);
        setOpenAddChargeModal(false);
        setChargeDetails();
      }}
    >
      <ToastAnimated />
      <div className="modal-addCharges" onClick={(e) => e.stopPropagation()}>
        <div className="modal-addCharges-header">
          <img
            className="img-header"
            src={chargesIconGray}
            alt="icon cobrança"
          />
          <h2>{title}</h2>
          <img
            onClick={() => {
              setOpenEditChargeModal(false);
              setOpenAddChargeModal(false);
              setChargeDetails();
            }}
            className="closeIcon-header"
            src={closeIcon}
            alt="close"
          />
        </div>
        <div>
          <form className="form-addCharges" onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Nome*"
              value={name}
              readonly
            />
            <div className="textArea">
              <label>Descrição*</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                required
                value={description}
                placeholder="Digite a descrição"
              />
            </div>

            <div className="inputs-addCharges">
              <div className="input-component">
                <label htmlFor="">Vencimento:*</label>
                <InputMask
                  mask="99/99/9999"
                  maskChar={null}
                  value={maturityDate}
                  onChange={(e) => setMaturityDate(e.target.value)}
                  label="Vencimento:*"
                  placeholder="Data de Vencimento"
                />
              </div>

              <div className="maskDiv">
                <label htmlFor="value">Valor*</label>
                <IntlCurrencyInput
                  className="inputCurrencyMask"
                  currency="BRL"
                  config={currencyConfig}
                  onChange={(event, value) => handleAmount(event, value)}
                  id="value"
                  value={amount}
                  label="Valor"
                  color="#667085"
                />
              </div>
            </div>

            <CheckBox paid={paid} setPaid={setPaid} />

            <div className="buttons-addCharges">
              <Button className="button" color={"pink"} text="Aplicar" />
              <Button
                action={() => {
                  setOpenAddChargeModal(false);
                  setOpenEditChargeModal(false);
                  setChargeDetails();
                }}
                className="button"
                color={"grey"}
                text="Cancelar"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
