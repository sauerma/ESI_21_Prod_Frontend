import React, { useState, useEffect} from "react";
import { ChartDonut } from '@patternfly/react-charts';
import axios from "axios";

export default function Deposits() {

const [auslastungRes, setAuslastungRes] = useState([]);
const [auslastungData, setAuslastungData] = useState([]); 
const [auslastungNumber, setAuslastungNumber] = useState(); 


//------------------------------Test Daten-------------------------------------//
const dataChart2 = [{ x: 'Auslastung', y: 70 }, { x: 'Fehlende Auslastung', y: 30 }];
const dataChart3 = [{ x: 'Auslastung', y: 70 }, { x: 'Fehlende Auslastung', y: 30 }]; 

useEffect(() => {
    

  //---------------------------- First KPI: Auslastung ----------------------------//

  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidataauslastung')
      .then(res => {
      
      console.log("RESPONSE:", res); //Data from Gateway

      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.body.length === 0) { //Check if data is available
        setAuslastungData(undefined);
        setAuslastungRes(undefined);
        setAuslastungNumber("0");
        return;
      }          

      if (DataAreEqual(auslastungRes, res.data.body)) return;  //Check if data has changed
      setAuslastungRes(res.data.body)    //Important for checking updated data   
      setAuslastungData([{ x: ' ', y: Math.round((100-res.data.body[0]['auslastung'])* 100)/100 }, {x: ' ', y: (res.data.body[0]['auslastung']) } ]); //Set new data
      setAuslastungNumber(res.data.body[0]['auslastung'] + "%");
      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      })
    });

    //---------------------------- Second KPI: Fortschritt ----------------------------//

    /*   axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidataauslastung')
      .then(res => {
      
      console.log("RESPONSE:", res); //Data from Gateway

      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.body.length === 0) { //Check if data is available
        auslastungData(undefined);
        return;
      }          

      if (DataAreEqual(allData, res.data.body)) return;  //Check if data has changed       
      auslastungData([{ x: 'Auslastung', y: 70 }, { x: 'Fehlende Auslastung', y: 30 }]); //Set new data

      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      }); */



      //---------------------------- Third KPI: Verhältnis Privat- und Businesskunden ----------------------------//

          /*   axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidataauslastung')
      .then(res => {
      
      console.log("RESPONSE:", res); //Data from Gateway

      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.body.length === 0) { //Check if data is available
        auslastungData(undefined);
        return;
      }          

      if (DataAreEqual(allData, res.data.body)) return;  //Check if data has changed       
      auslastungData([{ x: 'Auslastung', y: 70 }, { x: 'Fehlende Auslastung', y: 30 }]); //Set new data

      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      }); */


  //Check if database is offline (AWS)
  function IsDataBaseOffline(res){

    if(res.data.errorMessage == null) return false; 
    if(res.data.errorMessage === 'undefined') return false;
    if(res.data.errorMessage.endsWith("timed out after 3.00 seconds")){
        alert("Database is offline (AWS).");
        return true;
    }     
    return false;
  }

  //Check if old data = new data
  function DataAreEqual(data, sortedOrders){

    if(data.sort().join(',') === sortedOrders.sort().join(',')){
      return true;
      }
      else return false;
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
        data={dataChart2}
        height={120}
        labels={({ datum }) => `${datum.x}: ${datum.y}%`}
        title="100%"
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
        data={dataChart3}
        height={120}
        title="100%"
        width={140}/>
    </div>
  );
}