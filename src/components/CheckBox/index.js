import "./styles.css";

import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import checked from "../../assets/checked.svg";

export default function RadioButtonsGroup({ paid, setPaid }) {
  const [value, setValue] = React.useState(paid ? "pago" :"não-pago");

  const handleChange = (event) => {
    setValue(event.target.value);
   
    setPaid(value === "pago" ? false : true)
  
  };

  return (
    <FormControl component="fieldset">
        <span className="checkbox-label">Status:*</span>
      <RadioGroup className="RadioGroup"
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
        className='checkbox-status'
          value={"não-pago"}
          control={
            <Radio
              checkedIcon={<img src={checked} alt="" />}
              icon={<div className="icon-unchecked" src={checked} alt="" />}
            />
          }
          label="Cobrança pendente"
        />
        <FormControlLabel
        className='checkbox-status'
          value="pago"
          control={
            <Radio
              checkedIcon={<img src={checked} alt="" />}
              icon={<div className="icon-unchecked" src={checked} alt="" />}
            />
          }
          label="Cobrança paga"
        />
      </RadioGroup>
    </FormControl>
  );
}
