import React, { useState, useEffect} from "react";
import { ChartDonut } from '@patternfly/react-charts';
import axios from "axios";

export default function Deposits() {

const [auslastungData, setAuslastungData] = useState([]); 
const [auslastungNumber, setAuslastungNumber] = useState(); 

const [fortschrittData, setFortschrittData] = useState([]); 
const [fortschrittNumber, setFortschrittNumber] = useState(); 

const [privatKundenData, setPrivatKundenData] = useState([]); 
const [privatKundenNumber, setPrivatKundenNumber] = useState(); 


useEffect(() => {
    
  //const dataChart2 = [{ x: 'Auslastung', y: 70 }, { x: 'Fehlende Auslastung', y: 30 }];

  //---------------------------- START First KPI: Auslastung ----------------------------//

  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidataauslastung')
      .then(res => {

      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.body.length === 0) { //Check if data is available
        setAuslastungData(undefined);
        setAuslastungNumber(undefined);
        return;
      }       

      //Attention: Response is an string!
      if (auslastungNumber === res.data.body[0]['auslastung']) return;  //Check if data has changed
      setAuslastungNumber(res.data.body[0]['auslastung']); //Set new data   
      setAuslastungData([{ x: ' ', y: auslastungNumber}, {x: ' ', y: auslastungNumber} ]); //Set new data
     

      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      })
    });

    //---------------------------- END First KPI: Auslastung ----------------------------//


    //---------------------------- START Second KPI: Fortschritt ----------------------------//

      axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidatafortschritt')
      .then(res => {

      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.body.length === 0) { //Check if data is available
        setFortschrittData(undefined);
        setFortschrittNumber(undefined);
        return;
      }          

      //Attention: Response is an string!
      if (fortschrittNumber === res.data.body[0]['fortschritt']) return;  //Check if data has changed       
      setFortschrittNumber(res.data.body[0]['fortschritt']); //Set new data
      setFortschrittData([{ x: ' ', y: fortschrittNumber}, {x: ' ', y: fortschrittNumber } ]); //Set new data
      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      }); 

    //---------------------------- END Second KPI: Fortschritt ----------------------------//

    
    //------------------ START Third KPI: Verhältnis Privat- und Businesskunden -------------------//
       
      axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidataprivatkunden')
      .then(res => {
    
      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.body.length === 0) { //Check if data is available
        setPrivatKundenData(undefined);
        setPrivatKundenNumber(undefined);
        return;
      }          

      //Attention: Response is an string!
      if (privatKundenNumber === res.data.body[0]['privatkunden']) return;  //Check if data has changed       
      setPrivatKundenNumber(res.data.body[0]['privatkunden']); //Set new data
      setPrivatKundenData([{ x: ' ', y: privatKundenNumber}, {x: ' ', y: privatKundenNumber} ]); //Set new data

      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      }); 

      //---------------------------- END Third KPI: Verhältnis Privat- und Businesskunden ----------------------------//


  //Check if database is offline (AWS)
  function IsDataBaseOffline(res){

    if(res.data.errorMessage == null) return false; 
    if(res.data.errorMessage === 'undefined') return false;
    if(res.data.errorMessage.endsWith("timed out after 3.00 seconds")){
        //alert("Database is offline (AWS).");
        return true;
    }     
    return false;
  }

  return (
    <div style={{ height: '80px', width: '90px', padding: 0, margin: 0 }}>   
      <ChartDonut
        ariaDesc="Auslastung"
        ariaTitle="Auslastung"
        constrainToVisibleArea={true}
        data={auslastungData}
        height={120}
        labels={({ datum }) => ` Auslastung`}
        title= {auslastungNumber}
        padding={{
          bottom: 0,
          left: 0,
          right: 0, 
          top: 0
        }}
        width={140}/>
      <ChartDonut
        ariaDesc="Average number of pets"
        ariaTitle="Donut chart example"
        padding={{
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
        }}
        constrainToVisibleArea={true}
        data={fortschrittData}
        height={120}
        labels={({ datum }) => ` Fortschritt`}
        title={fortschrittNumber}
        width={140}/>
      <ChartDonut
        ariaDesc="Average number of pets"
        ariaTitle="Donut chart example"
        padding={{
          bottom: 0,
          left: 0,
          right: 0, // Adjusted to accommodate legend
          top: 0
        }}
        constrainToVisibleArea={true}
        data={privatKundenData}
        height={120}
        labels={({ datum }) => ` Privatkundenanteil`}
        title={privatKundenNumber}
        width={140}/>
    </div>
  );
}