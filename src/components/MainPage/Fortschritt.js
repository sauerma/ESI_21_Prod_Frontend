import React, { useState, useEffect} from "react";
import { ChartDonut } from '@patternfly/react-charts';
import axios from "axios";

export default function Fortschritt() {

const [fortschrittData, setFortschrittData] = useState([]); 
const [fortschrittNumber, setFortschrittNumber] = useState(Number(0.00)); 

useEffect(() => { getFortschritt(); });

function getFortschritt(){
  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidatafortschritt')
  .then(res => {

  if(IsDataBaseOffline(res)) return; //Check if db is available

  if(res.data.body.length === 0) { //Check if data is available
    setFortschrittData(undefined);
    setFortschrittNumber(Number(0.00));
    return;
  }          

  console.log("Forschritt:", resp);
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
    <div style={{ height: '78px', width: '90px', padding: 0, margin: 0 }}>   
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
        height={110}
        labels={({ datum }) => `${datum.x} ${datum.y}%`}
        title={fortschrittNumber + "%"}
        width={140}/>
    </div>
  );
}