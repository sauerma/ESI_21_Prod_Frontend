/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Liniendiagramm
/*-----------------------------------------------------------------------*/

import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import React, { useState, useEffect} from "react";
import axios from "axios";

export default function Chart() {
  
const [allData, setAllData] = useState([{}]); 
const [maxQuantity, setMaxQuantity] = useState(); 

useEffect(() => {
    
  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getchartdatalastorders')
      .then(res => {
      
      console.log("RESPONSE:", res); //Show data from Gateway

      if(IsDataBaseOffline(res)) return; //Check if database is available

      if(res.data.body.length === 0) { //Check if data is available
        setAllData(undefined);
        return;
      }          
      if (DataAreEqual(allData, res.data.body)) return;  //Check if data has changed     
      setAllData(res.data.body); //Set new data
      getMaxQuantity(res.data.body); //Get max quantity for y-achsis

      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      })
});

  //Get max quantity for y-achsis
  function getMaxQuantity(data){
    var maxQuan = 10;
    data.forEach(element => {
      if(element['quantity'] > maxQuan) maxQuan = parseInt(element['quantity']);
    });
    console.log("MaxQuan:", (Math.ceil((maxQuan +5) / 10) * 10));
    setMaxQuantity((Math.ceil((maxQuan +5) / 10) * 10)); 
    return;
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

  //Check if old data = new data
  function DataAreEqual(data, sortedOrders){

    if(data.sort().join(',') === sortedOrders.sort().join(',')){
      return true;
      }
      else return false;
  }

  const theme = useTheme();
    return (
      <React.Fragment>
        <h2>Letzter Monat</h2>
        <ResponsiveContainer>
          <LineChart data={allData} margin={{ top: 16, right: 16, bottom: 0, left: 24}} >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis type="number" domain={[0, maxQuantity]} allowDataOverflow={true} >
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }} >
              Produktionsmenge
            </Label>
          </YAxis>
          <Tooltip  />
          <Line type="monotone" dataKey="quantity" name="Tagesmenge" stroke="#90caf9" dot={true} strokeWidth="3" activeDot={{r:7}}/>
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}