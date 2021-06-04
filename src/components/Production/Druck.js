/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Druck-Tabelle
/*-----------------------------------------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";
import QualityCell from '../Planung/qualityCell.js';

export default function Druck() {

  //Init specific table columns
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

  //Set table options
  const options = {rowsPerPage: 4, customToolbarSelect: () => {}, filterType: 'checkbox',  
                    onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }};

  //Set global variables                  
  const [allData, setAllData] = useState([]); 
  const [selectedData, setSelectedData] =  useState([]); 

  //Event if something changed
  useEffect(() => { DatenLaden(); });

  //Load print orders
  function DatenLaden(){

    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getprodorders')
    .then(res => {
    
    console.log("RESPONSE:", res); //Show data from Gateway

    if(IsDataBaseOffline(res)) return; //Check if database is available

    if(res.data.body.length === 0) { //Check if data is not empty
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

  //Event for selecting row(s)
  function rowSelectEvent(curRowSelected, allRowsSelected){ 

    var _selectedData = [];

    if(allRowsSelected.length === 0) {  //Check if no row is selected
        setSelectedData(undefined);
        return;
    }
    
    allRowsSelected.forEach(element => { //Get all selected rows 
        _selectedData.push(allData[element.dataIndex])
    });

    setSelectedData(_selectedData); //Set all selected rows

    return;
  }

  //Set selected orders to status produced
  function Abschliesen(){

    if (selectedData == null || selectedData === undefined || selectedData.length === 0) { //Check if no data is selected
        alert("Bitte Positionen auswählen!");
        return;
    }

    var pKs = filterPks(selectedData); //Get primary keys
    var pKs_json = JSON.parse(JSON.stringify(pKs));
    console.log(pKs_json)

    //Update production table: Status 'In Druck' to 'Produziert'
    axios.put("https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/updateinprodtoproducted", pKs_json)
    .then(res => {
        console.log(res);
        cssMessage("Erfolgreich auf produziert gesetzt.", "#4dff88");
    })
    .catch(err => {
        console.log(err.message); //Error-Handling
        cssMessage("Error.", "#9c2c2c");
    })  

    //Update Verkauf & Versand Status to 'Produziert'
    axios.put('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders/orderitems?status=4', pKs_json)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err.message); //Error-Handling
    })

    sleep(900).then(() => {  
      setSelectedData(undefined); //Reset selected order 
      DatenLaden(); //Reload data 
    }); 

    return;
  }

  //Sucess- and error messages in footer
  function cssMessage(message, color)
  { //Set footer messages
    document.getElementsByClassName("footer")[0].style.textAlign = "center";
    document.getElementsByClassName("footer")[0].innerHTML = message;
    document.getElementsByClassName("footer")[0].style.backgroundColor = color;
  
    //Reset footer messages
    sleep(2200).then(() => { 
    document.getElementsByClassName("footer")[0].style.textAlign = "right";
    document.getElementsByClassName("footer")[0].innerHTML = "Powered by ©BlackForestConsulting";
    document.getElementsByClassName("footer")[0].style.backgroundColor = "#90caf9";
    });
  }
  
  //Sleep function for asychronous calls
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Get only primary keys from selected orders
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
<dev> 
  <MUIDataTable
    data={allData}
    columns={columns}
    options={options} />
    <br></br>
    <Button     
    style={{float: "left"}}
    variant="contained" 
    onClick={Abschliesen}
    title="Mit Klick auf diesen Button werden alle markierten Druckaufträge als abgeschlossen markiert." >
    Produziert
    </Button> 
    <text><br></br></text>
</dev>
    );
}