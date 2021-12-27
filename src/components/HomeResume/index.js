import "./styles.css";
import iconResumeBlue from "../../assets/homeResume-icon-blue.svg";
import iconResumeRed from "../../assets/homeResume-icon-red.svg";
import iconResumeYellow from "../../assets/homeResume-icon-yellow.svg";
import useCharges from '../../hooks/useCharges'
import { useEffect, useState } from "react";

import useLoading from "../../hooks/useLoading";

function HomeResume({charges}) {
  let paidControl = 0
  let expiredControl = 0
  let previewControl = 0

  const { isTodayDate, isOverdueAccount } = useCharges() 
  const [paid, setPaid] = useState(0)
  const [expired, setExpired] = useState(0)
  const [preview, setPreview] = useState(0)
  const {loading} = useLoading()


  useEffect(() => {
    
    for (const charge of charges) {
     if(charge.paid === true){
       // eslint-disable-next-line 
      paidControl += charge.amount
       setPaid(paidControl)
     
      }

    if(!charge.paid && (!isTodayDate(new Date(charge.maturity_date), new Date()) &&
        isOverdueAccount(new Date(charge.maturity_date), new Date()))){
      // eslint-disable-next-line 
      expiredControl += charge.amount
      setExpired(expiredControl)
  
    }

    if(!charge.paid && (isTodayDate(new Date(charge.maturity_date), new Date()) ||
    !isOverdueAccount(new Date(charge.maturity_date), new Date()))){
      // eslint-disable-next-line 
      previewControl += charge.amount
      setPreview(previewControl)
 
    }
      
    }
   
  },[loading]);     
  
  return (
    <div className="container-blocks">
      <div className="resume-block blue">
        <img src={iconResumeBlue} alt="" />
        <div className="title-and-values">
          <h3>Cobranças pagas</h3>
          <h4>{(paid/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4>
        </div>
      </div>
      <div className="resume-block red">
        <img src={iconResumeRed} alt="" />
        <div className="title-and-values">
          <h3>Cobranças vencidas</h3>
          <h4>{(expired/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4>
        </div>
      </div>
      <div className="resume-block orange ">
        <img src={iconResumeYellow} alt="" />
        <div className="title-and-values">
          <h3>Cobranças previstas</h3>
          <h4>{(preview/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4>
        </div>
      </div>
    </div>
  );
}

export default HomeResume;
