/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";
import {CSVLink} from "react-csv";
import GetAppIcon from '@material-ui/icons/GetApp';
import QualityCell from './qualityCell.js';

export default function DataTable() {

  const columns = [ {name: "O_DATE", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
   {name: "p_nr", label: "Produktionsnr", options: {filter: true, sort: true, display: true}},
   { name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
   {name: "OI_NR", label: "Bestellpos-Nr", options: {filter: true, sort: true, display: true}},
   {name: "PO_CODE", label: "PO_CODE", options: {filter: true,  sort: false,  display: false}}, 
   {name: "PO_COUNTER", label: "PO_COUNTER", options: {filter: true, sort: false, display: false}},  
   {name: "PO_CODE", label: "PO_CODE", options: {filter: true,  sort: true,  display: false}}, 
   {name: "PO_COUNTER", label: "PO_COUNTER", options: {filter: true, sort: true, display: false}},  
   {name: "QUANTITY", label: "Menge", options: {filter: true, sort: true, display: true}}, 
   {name: "MAT_NR", label: "Material-Nr", options: {filter: true, sort: true, display: false}}, 
   {name: "C", label: "C", options: {filter: true, sort: false, display: false}},
   {name: "M", label: "M",options: {filter: true,sort: false,display: false}},
   {name: "Y",label: "Y",options: {filter: true,sort: false, display: false}},
   {name: "K", label: "K", options: {filter: true,sort: false, display: false}},
   {name: "HEXCOLOR", label: "Hex-Wert", options: {filter: true,sort: true, display: true,
    customBodyRender: (value, tableMeta, updateValue) => {
    return (
      <QualityCell
        value={value}
        index={tableMeta.columnIndex}
        change={event => updateValue(event)}
      />
    );} }},
   {name: "PROD_PRIO", label: "Priorität", options: {filter: true,sort: true, display: true}},
   {name: "CUSTOMER_TYPE", label: "Kundentyp", options: {filter: true, sort: true, display: true}}, 
   {name: "IMAGE", label: "Image", options: {filter: true,sort: true, display: true}},
   {name: "PROD_STATUS", label: "Status", options: {filter: true, sort: true, display: true}}, 
   {name: "END_DATE",label: "END_DATE",options: {filter: true,sort: false, display: false}}];

   const options = {rowsPerPage: 5, customToolbarSelect: () => {return <Button disabled variant="Quantity" style={{color: QuantityColor}} >Ausgewählte Menge: {Quantity} / 350</Button>}, filterType: 'checkbox', download: false, 
   onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }};
               
  const [csvdata, setCsvData] = useState([]); 
  const [Quantity, setQuantity] = useState("");
  const [QuantityColor, setQuantityColor] = useState("#ffffff");
  const csvheaders = ["OI_NR", "O_DATE", "p_nr", "QUANTITY", "HEXCOLOR", "C", "M", "Y", "K", "IMAGE"];
  
  const [allData, setAllData] = useState([]); 
  const [selectedData, setSelectedData] =  useState([]); 


  useEffect(() => { DatenLaden();});
  
  function DatenLaden(){
    
    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getplanningorders')
    .then(res => {
    console.log("RESPONSE:", res); //Data from Gateway
    
    if(IsDataBaseOffline(res)) return; //Check if db is available

    if(res.data.body.length === 0) { //Check if data is available
      setAllData(undefined);
      setCsvData([]);
      return;
    }

    if (DataAreEqual(allData, res.data.body)) return; //Check if data has changed       
    setAllData(res.data.body); //Set new table data

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

  //Status-Nr to Status-Bez
/*   function StatusNrToBez(statusNr){
    if(statusNr === 0) return "In Planung";
    if(statusNr === 1) return "In Produktion";
    if(statusNr === 2) return "Produziert";
    if(statusNr === 3) return "Eingelagert";
  } */

 //Update status in planning to in production
  function updateProdStatus(){  
      
    if (selectedData == null || selectedData === undefined || selectedData.length === 0) {
        alert("Bitte Positionen auswählen!");
        return;
      }

      var pKs = filterPks(selectedData);
      //console.log("Selected Pks:", pKs);
      var pKs_json = JSON.stringify(pKs)
      console.log(pKs_json)

      //Update Production table from Prod_status 0 to 1 (In Planung zu In Produktion)
      axios.put("https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/updateplanningtoprod", pKs_json)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.message); //Error-Handling
      })

      //TODO Update Verkauf & Versand table --> In Lambda-Funktion packen

      sleep(900).then(() => { window.location.reload(); }); 

    return;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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


  //RowSelectEvent
  function rowSelectEvent(curRowSelected, allRowsSelected){ 

    var _selectedData = [];

  if(allRowsSelected.length === 0) {  //Wenn keine Rows ausgewählt sind
      setQuantity(0); //Menge auf 0 setzen
      setQuantityColor("#088A08");
      setSelectedData(undefined);
      setCsvData([]);
      return;
    }
    
    allRowsSelected.forEach(element => {
      _selectedData.push(allData[element.dataIndex])
    });

    updateQuantity(_selectedData);
    setSelectedData(_selectedData);

//-------------Sortieren der CSV WIP-----------------//
    var _sortedCsvData = _selectedData;
    //Nach Helligkeit konvertieren
    convertColors(_sortedCsvData);

    //Sortieren Für Strings
    // _sortedCsvData.sort(function(a,b){
    //   if(a.HEXCOLOR.toLowerCase() < b.HEXCOLOR.toLowerCase())return -1;
    //   if(a.HEXCOLOR.toLowerCase() > b.HEXCOLOR.toLowerCase())return 1;
    //   return 0;
    // })

    //Sortieren Für Integer
    _sortedCsvData.sort(function(a,b){
      return a.helligkeit - b.helligkeit;
    });
//-------------Sortieren der CSV Ende-----------------//
    setCsvData(_sortedCsvData);
    
    return;
  }

  function updateQuantity(selecteDataFromTable){

    var quantity = 0

    if (selecteDataFromTable === undefined || selecteDataFromTable.length === 0) {
        setQuantity(0)
        return;
    }

    selecteDataFromTable.forEach(element => {
      if (element === undefined || element["QUANTITY"] === undefined ) {
        setQuantity(0)
        return;
      }
  
      quantity += element["QUANTITY"]
    });
    setQuantity(quantity)

    if(quantity > 350) setQuantityColor("#FF0040");
    else setQuantityColor("#088A08");

    return;
  }

  function convertColors(dataforCSV){
    var culori = require("culori")

    dataforCSV.forEach(element => {
      let obj = culori.lab(element["HEXCOLOR"]);
      element['helligkeit'] = obj.l;
    });
  }

  return (
  <div>
    <MUIDataTable 
        title={"Planungsaufträge"}
        data={allData}      
        columns={columns}
        options={options}/>
    <br/>
    <br/>
    <Button variant="contained" onClick={updateProdStatus} title="Mit Klick auf diesen Button
    werden alle markierten Planungsaufträge
    auf 'in Produktion' gesetzt." >In Produktion geben</Button>
    <text name="DummySeperator">  </text>
    <Button variant="contained" onClick={updateProdStatus} title="Mit Klick auf diesen Button wird eine CSV-Datei mit allen markierten Aufträgen erstellt. 
    Außerdem ändert sich der Status auf 'in Produktion'.">
    <CSVLink data={csvdata} headers={csvheaders} style={{textDecoration: "none", color: "black"}} filename={"MachineConfiguration.csv"}>Download CSV</CSVLink>
    <GetAppIcon/>  
    </Button>   
    </div>
  );
}