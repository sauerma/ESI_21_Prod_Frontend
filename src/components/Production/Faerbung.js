/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Färbung-Tabelle
/*-----------------------------------------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";
import QualityCell from '../Planung/qualityCell.js';
import './TabStyle.css';

export default function Faerbung() {

  //Init specific table data
  const columns = [  {name: "O_DATE", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
  {name: "p_nr", label: "Produktionsnr", options: {filter: true, sort: true, display: true}},
  { name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
  {name: "OI_NR", label: "Bestellpos-Nr", options: {filter: true, sort: true, display: true }}, 
  {name: "PO_CODE", label: "PO_CODE", options: {filter: true,  sort: false,  display: false}}, 
  {name: "PO_COUNTER", label: "PO_COUNTER", options: {filter: true, sort: false, display: false}},  
  {name: "QUANTITY", label: "Menge", options: {filter: true, sort: true, display: true}},
  {name: "PROD_PRIO", label: "Priorität", options: {filter: true,sort: true, display: false}}, 
  {name: "HEXCOLOR", label: "Hex-Wert", options: {filter: true,sort: true, display: true}},
  {name: "HEXCOLOR", label: "Farbe", options: {filter: true,sort: true, display: true ,
    customBodyRender: (value, tableMeta, updateValue) => {
    return (
      <QualityCell
        value={value}
        index={tableMeta.columnIndex}
        change={event => updateValue(event)}
      />
    );} }},
  {name: "DELTA_E", label: "Delta_e", options: {filter: true,sort: true, display: true}},
  {name: "CUSTOMER_TYPE", label: "Kundentyp", options: {filter: true, sort: true, display: true}},  
  {name: "MAT_NR", label: "Material-Nr", options: {filter: true, sort: true, display: false}}, 
  {name: "C", label: "C", options: {filter: true, sort: false, display: false}},
  {name: "M", label: "M",options: {filter: true,sort: false,display: false}},
  {name: "Y",label: "Y",options: {filter: true,sort: false, display: false}},
  {name: "K", label: "K", options: {filter: true,sort: false, display: false}},
  {name: "IMAGE", label: "Image", options: {filter: true,sort: true, display: true}},
  {name: "PROD_STATUS", label: "Status", options: {filter: true, sort: true, display: true}}, 
  {name: "END_DATE", label: "Enddatum",options: {filter: false,sort: false, display: false}},
 ];

  const options = {rowsPerPage: 4, customToolbarSelect: () => {/* Hide Delete Button */}, filterType: 'checkbox',  
                    onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }};
  const [allData, setAllData] = useState([]); 
  const [selectedData, setSelectedData] =  useState([]); 

  //Event if data changed
  useEffect(() => { DatenLaden(); });

  //Load data
  function DatenLaden(){
        
    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getfaerbeorders')
      .then(res => {
      
      console.log("RESPONSE:", res); //Data from Gateway

      if(IsDataBaseOffline(res)) return; //Check if db is available

      if(res.data.body.length === 0) { //Check if data is available
        setAllData(undefined);
        return;
      }          

      if (DataAreEqual(allData, res.data.body)) return; //Check if data has changed       
      setAllData(res.data.body); //Set new data

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


  //RowSelectEvent
  function rowSelectEvent(curRowSelected, allRowsSelected){ 

    var _selectedData = [];

   if(allRowsSelected.length === 0) {  //If no rows are selected
      setSelectedData(undefined);
      return;
    }
    
    allRowsSelected.forEach(element => {
      _selectedData.push(allData[element.dataIndex])
    });

    setSelectedData(_selectedData);

    return;
  }

  //Update orders to 'Produziert'
  function Produziert(){
    if (selectedData == null || selectedData === undefined || selectedData.length === 0) {
      alert("Bitte Positionen auswählen!");
      return;
    }

    var pKs = filterPks(selectedData);
    var pKs_json = JSON.parse(JSON.stringify(pKs));
    console.log(pKs_json)

    //Update V&V Status
    axios.put('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/orderitems?status=4', pKs_json)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err.message); //Error-Handling
    })

    //Update Production table from Prod_status 'In Färbung' zu 'Produziert'
     axios.put("https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/updateinprodtoproducted", pKs_json)
    .then(res => {
      console.log(res);
      cssMessage("Erfolgreich auf produziert gesetzt.", "#4dff88"); 
    })
    .catch(err => {
      console.log(err.message); //Error-Handling
      cssMessage("Error.", "#9c2c2c"); 
    })  

    sleep(900).then(() => { //Reload data
      setSelectedData(undefined); 
      DatenLaden(); 
      cssMessage("Erfolgreich auf produziert gesetzt."); 
    
    }); 

  return;

  }

  //Update Orders to 'In Druck'
  function InDruckGeben(){

    if (selectedData == null || selectedData === undefined || selectedData.length === 0) {
      alert("Bitte Positionen auswählen!");
      return;
    }

    var pKs = filterPks(selectedData);
    var pKs_json = JSON.parse(JSON.stringify(pKs));
    console.log(pKs_json)

    //Update Production table from Prod_status 'In Färbung' to 'In Druck'
     axios.put("https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/updatefaerbeorders", pKs_json)
    .then(res => {
      console.log(res);
      cssMessage("Erfolgreich in den Druck gegeben.", "#4dff88"); 
    })
    .catch(err => {
      console.log(err.message); //Error-Handling
      cssMessage("Error.", "#9c2c2c"); 
    })  

    sleep(900).then(() => { //Reload data
      setSelectedData(undefined); 
      DatenLaden(); 
    }); 

  return;
  }

  //Success and error messages
  function cssMessage(message, color)
  { //Set
    document.getElementsByClassName("footer")[0].style.textAlign = "center";
    document.getElementsByClassName("footer")[0].innerHTML = message;
    document.getElementsByClassName("footer")[0].style.backgroundColor = color;

    //Reset
    sleep(4000).then(() => { 
    document.getElementsByClassName("footer")[0].style.textAlign = "right";
    document.getElementsByClassName("footer")[0].innerHTML = "Powered by ©BlackForestConsulting";
    document.getElementsByClassName("footer")[0].style.backgroundColor = "#90caf9";
    });
  }
  
  //Sleep for asynchronous calls
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Get primary keys from selected orders
  function filterPks(selectedData){
    var _pks = [];
   
    selectedData.forEach(element => {
      var singleVal = {};
      singleVal["O_NR"] = element["O_NR"];
      singleVal["OI_NR"] = element["OI_NR"];
      singleVal["PO_CODE"] = element["PO_CODE"];
      singleVal["PO_COUNTER"] = element["PO_COUNTER"];
      _pks.push(singleVal);
    });
  
    return _pks; 
  }
  
    return (
<div > 
  <MUIDataTable 
    //title={"Färbeaufträge"}
    data={allData}
    columns={columns}
    options={options} />
    <br></br>
    <Button 
    style={{float: "left"}}
    variant="contained" 
    onClick={InDruckGeben}
    title="Mit Klick auf diesen Button werden alle markierten Färbeaufträge in den Druck gegeben." >
    In Druck geben
    </Button>
    <p style={{float: "left", color: "#ffffff"}}>.</p>
    <Button 
    style={{float: "left"}}
    variant="contained" 
    onClick={Produziert}
    title="Mit Klick auf diesen Button werden alle markierten Färbeaufträge als produziert markiert." >
    Produziert
    </Button>
    <text><br></br></text>
    
</div>
    );
}