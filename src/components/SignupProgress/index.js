import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import signupProgressIconCheck from "../../assets/signup-progress-icon-check.svg";
import signupProgressIconEmpty from "../../assets/signup-progress-icon-empty.svg";
import signupProgressIcon from "../../assets/signup-progress-icon.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  text: {
    color: "#0E8750",
    fontSize: 18,
    lineHeight: "130%",
    fontWeight: "bold",
  },
  sidebar: {
    borderLeft: "3px solid #0E8750",
    paddingLeft: 30,
    marginLeft: 15,
    marginTop: 4,
    marginBottom: 4,
    height: 40,
  },
  lastStep: {
    paddingLeft: 48,
  },
}));

function getSteps() {
  return ["Cadastre-se", "Escolha uma senha", "Cadastro realizado com sucesso"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Por favor, escreva seu nome e e-mail.`;
    case 1:
      return "Escolha uma senha segura.";
    case 2:
      return `E-mail e senha cadastrados com sucesso`;
    default:
      return "Unknown step";
  }
}

export default function SignupProgress({ activeStep, setActiveStep }) {
  const classes = useStyles();

  const steps = getSteps();

  return (
    <div className={classes.root}>
      <div activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              icon={
                <img
                  src={
                    activeStep === index && index < 2
                      ? signupProgressIcon
                      : signupProgressIconEmpty | (activeStep === 1) &&
                        index === 0
                      ? signupProgressIconCheck
                      : signupProgressIconEmpty | (activeStep === 2)
                      ? signupProgressIconCheck
                      : signupProgressIconEmpty
                  }
                  alt=""
                />
              }
            >
              <span className={classes.text}>{label}</span>
            </StepLabel>

            <div className={index < 2 ? classes.sidebar : classes.lastStep}>
              <Typography>{getStepContent(index)}</Typography>
            </div>
          </Step>
        ))}
      </div>
    </div>
  );
}
