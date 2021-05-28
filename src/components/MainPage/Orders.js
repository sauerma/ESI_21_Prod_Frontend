/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import './dashboard_order_table.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from "axios";
import Link from '@material-ui/core/Link';
import QualityCell from '../Planung/qualityCell.js';

export default function Orders() {
  
  const columns = [
  {name: "O_DATE", label: "Bestelldatum", options: {filter: true, sort: true, display: true}},  
  {name: "p_nr", label: "Produktionsnr", options: {filter: true, sort: true, display: true}},
  {name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: false}}, 
  {name: "OI_NR", label: "Bestellpos-Nr", options: {filter: true, sort: true, display: true }}, 
  {name: "CUSTOMER_TYPE", label: "Kundentyp", options: {filter: true, sort: true, display: true}}, 
  {name: "QUANTITY", label: "Menge", options: {filter: true, sort: true, display: true}},
  {name: "PROD_PRIO", label: "Priorität", options: {filter: true,sort: true, display: true}}, 
  {name: "HEXCOLOR", label: "Hex-Wert", options: {filter: true,sort: true, display: true}},
  {name: "HEXCOLOR", label: "Farbe", options: {filter: true,sort: true, display: true, customBodyRender: (value, tableMeta, updateValue) => {
    return (
      <QualityCell
        value={value}
        index={tableMeta.columnIndex}
        change={event => updateValue(event)}
      />
    );}}},
  {name: "DELTA_E", label: "Delta_e", options: {filter: true,sort: true, display: false}},
  {name: "PROD_STATUS", label: "Status", options: {filter: true, sort: true, display: true}}, 
  {name: "PO_CODE", label: "PO_CODE", options: {filter: true,  sort: false,  display: false}}, 
  {name: "PO_COUNTER", label: "PO_COUNTER", options: {filter: true, sort: false, display: false}},  
  {name: "MAT_NR", label: "Material-Nr", options: {filter: true, sort: true, display: false}}, 
  {name: "C", label: "C", options: {filter: true, sort: false, display: false}},
  {name: "M", label: "M",options: {filter: true,sort: false,display: false}},
  {name: "Y",label: "Y",options: {filter: true,sort: false, display: false}},
  {name: "K", label: "K", options: {filter: true,sort: false, display: false}},
  {name: "IMAGE", label: "Image", options: {filter: true,sort: true, display: true}},
  {name: "END_DATE",label: "END_DATE",options: {filter: true,sort: false, display: false}}];

  const options = {rowsPerPage: 3, selectableRows: false , filterType: 'checkbox' };
  const [allData, setAllData] = useState([]); 

  useEffect(() => {
    
    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getactiveprodorders')
        .then(res => {
        
        console.log("RESPONSE:", res); //Data from Gateway

        if(IsDataBaseOffline(res)) return; //Check if db is available

        if(res.data.body.length === 0) { //Check if data is available
          setAllData(undefined);
          return;
        }          

        if (DataAreEqual(allData, res.data.body)) return;  //Check if data has changed       
        setAllData(res.data.body); //Set new data
  
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
    <div>
  <MuiThemeProvider theme={getMuiTheme()}>
    <MUIDataTable 
    title={"Aktive Aufträge"}
    data={allData}
    columns={columns}
    options={options} />
   
    </MuiThemeProvider>
    <Link color="primary" href="/Produktion" /*onClick={preventDefault}*/>
     Details anzeigen
   </Link>
    </div>
    
  );
}