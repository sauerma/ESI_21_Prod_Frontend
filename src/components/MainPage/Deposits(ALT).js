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


useEffect(() => 
{
  console.log("test");
  getAuslastung();
  getFortschritt();
  getPrivatKundenAnteil();
});


function getAuslastung()
{ 
  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidataauslastung')
      .then(res => {

      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.body.length === 0) { //Check if data is available
        setAuslastungData(undefined);
        setAuslastungNumber(Number(0.00));
        return;
      }       

      var resp = JSON.parse(res.data.body[0]['auslastung']);
      if (auslastungNumber === resp) return;  //Check if data has changed
      console.log(typeof resp);
      if (typeof resp !== 'number') return;
      setAuslastungNumber(resp);
      setAuslastungData([{ x: '', y: resp}, {x: '', y: 100-resp }]);     //Set new data     

      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      })
  } 


function getFortschritt(){
  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidatafortschritt')
  .then(res => {

  if(IsDataBaseOffline(res)) return; //Check if db is available

  if(res.data.body.length === 0) { //Check if data is available
    setFortschrittData(undefined);
    setFortschrittNumber(Number(0.00));
    return;
  }          

  var resp = JSON.parse(res.data.body[0]['fortschritt']);
  if (fortschrittNumber === resp) return;  //Check if data has changed       
  if (typeof resp !== 'number') return;
  setFortschrittNumber(resp); //Set new data
  setFortschrittData([{ x: '', y: resp}, {x: '', y: 100-resp } ]); //Set new data

  })
  .catch(err => {
      console.log(err.message); //Error-Handling
    }) 
}

function getPrivatKundenAnteil(){

      axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidataprivatkunden')
      .then(res => {
    
      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.body.length === 0) { //Check if data is available
        setPrivatKundenData(undefined);
        setPrivatKundenNumber(undefined);
        return;
      }          

      var resp = JSON.parse(res.data.body[0]['privatkunden']);
      if (privatKundenNumber === resp) return;  //Check if data has changed  
      if (typeof resp !== 'number') return;   
      setPrivatKundenNumber(resp); //Set new data
      setPrivatKundenData([{ x: '', y: resp}, {x: '', y: 100 - resp} ]); //Set new data

      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      })
   
    }

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
        labels={({ datum }) => `${datum.x} ${datum.y}%`}
        title= {auslastungNumber + "%"}
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
        labels={({ datum }) => `${datum.x} ${datum.y}%`}
        title={fortschrittNumber + "%"}
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
        labels={({ datum }) => `${datum.x} ${datum.y}%`}
        title={privatKundenNumber + "%"}
        width={140}/>
    </div>
  );
}