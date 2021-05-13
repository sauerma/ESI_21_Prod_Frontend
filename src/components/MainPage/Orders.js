/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import './dashboard_order_table.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from "axios";

export default function Orders() {
  
  const columns = ["Bestelldatum", "Bestellnr", "Produktionsnr", "Menge", "Status", "Hex-Wert", "Priorität", "Bild"];
  const options = { filterType: 'checkbox' };
  const [data, setData] = useState([])

  useEffect(() => {
    
    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getactiveprodorders')
        .then(res => {
        
        console.log("RESPONSE:", res); //Data from Gateway

        if(IsDataBaseOffline(res)) return; //Check if db is available

        if(res.data.body.length === 0) { //Check if data is available
          setData(undefined);
          return;
        }          

        var sortedOrders = sortOrders(res.data.body); //Sort data from api 
        if (DataAreEqual(data, sortedOrders)) return; //Check if data has changed       
        setData(sortedOrders); //Set new data
  
        })
        .catch(err => {
            console.log(err.message); //Error-Handling
        })
  });


  
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

  //Sort data from api
  function sortOrders(list){

    var sortedOrders = [];

    for (var key in list){

      var singleSortedList = null;
      singleSortedList = [];
      var unsortedOrders = Object.values(list[key]);
      
      singleSortedList.push(unsortedOrders[4]); //Bestelldatum
      singleSortedList.push(unsortedOrders[1]); //Bestellnummer
      singleSortedList.push(unsortedOrders[18]); //Produktionsnummer
      singleSortedList.push(unsortedOrders[6]); //Menge
      singleSortedList.push(StatusNrToBez(unsortedOrders[7])); //Status
      singleSortedList.push(unsortedOrders[14]); // Hex-Wert
      singleSortedList.push(unsortedOrders[15]); //Priorität
      singleSortedList.push(unsortedOrders[16]); //Bild 
    
      sortedOrders.push(singleSortedList)
  }     
    return sortedOrders;
  }


  //Status-Nr to Status-Bez
  function StatusNrToBez(statusNr){
    if(statusNr === 0) return "In Planung";
    if(statusNr === 1) return "In Produktion";
    if(statusNr === 2) return "Produziert";
    if(statusNr === 3) return "Eingelagert";
  }


  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MuiTypography: {
            h6: {
              fontWeight: "600",
              textAlign: "left",
            }
        }
    }
  });

  return (
  <MuiThemeProvider theme={getMuiTheme()}>
    <MUIDataTable 
    title={"Aktive Aufträge"}
    data={data}
    columns={columns}
    options={options} />
    </MuiThemeProvider>
  );
}