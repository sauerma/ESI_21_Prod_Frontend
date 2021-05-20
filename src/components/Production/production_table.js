/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";
import QualityCell from '../Planung/qualityCell.js';

export default function DataTable() {

  const columns = [{ name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
  {name: "OI_NR", label: "Bestellpos-Nr", options: {filter: true, sort: true, display: true }}, 
  {name: "PO_CODE", label: "PO_CODE", options: {filter: true,  sort: false,  display: false}}, 
  {name: "PO_COUNTER", label: "PO_COUNTER", options: {filter: true, sort: false, display: false}},  
  {name: "O_DATE", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
  {name: "CUSTOMER_TYPE", label: "Kundentyp", options: {filter: true, sort: true, display: true}}, 
  {name: "QUANTITY", label: "Menge", options: {filter: true, sort: true, display: true}}, 
  {name: "PROD_STATUS", label: "Status", options: {filter: true, sort: true, display: true}}, 
  {name: "MAT_NR", label: "Material-Nr", options: {filter: true, sort: true, display: false}}, 
<<<<<<< HEAD
  {name: "C", label: "C", options: {filter: true, sort: false, display: false}},
  {name: "M", label: "M",options: {filter: true,sort: false,display: false}},
  {name: "Y",label: "Y",options: {filter: true,sort: false, display: false}},
  {name: "K", label: "K", options: {filter: true,sort: false, display: false}},
  {name: "HEXCOLOR", label: "Hex-Wert", options: {filter: true,sort: true, display: true ,
    customBodyRender: (value, tableMeta, updateValue) => {
    return (
      <QualityCell
        value={value}
        index={tableMeta.columnIndex}
        change={event => updateValue(event)}
      />
    );} }},
=======
  {name: "C", label: "C", options: {filter: true, sort: true, display: false}},
  {name: "M", label: "M",options: {filter: true,sort: true,display: false}},
  {name: "Y",label: "Y",options: {filter: true,sort: true, display: false}},
  {name: "K", label: "K", options: {filter: true,sort: true, display: false}},
  {name: "HEXCOLOR", label: "Hex-Wert", options: {filter: true,sort: true, display: true}},
>>>>>>> Master
  {name: "PROD_PRIO", label: "Priorität", options: {filter: true,sort: true, display: false}},
  {name: "IMAGE", label: "Image", options: {filter: true,sort: true, display: true}},
  {name: "END_DATE", label: "Enddatum",options: {filter: true,sort: true, display: true}},
  {name: "p_nr", label: "Produktionsnr", options: {filter: true, sort: true, display: true}}];

  const options = {rowsPerPage: 8, customToolbarSelect: () => {/* Hide Delete Button */}, filterType: 'checkbox',  
                    onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }};
  const [allData, setAllData] = useState([]); 
  const [selectedData, setSelectedData] =  useState([]); 

  useEffect(() => {
        
    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getprodorders')
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

 /*  //Status-Nr to Status-Bez
  function StatusNrToBez(statusNr){
    if(statusNr === 0) return "In Planung";
    if(statusNr === 1) return "In Produktion";
    if(statusNr === 2) return "Produziert";
    if(statusNr === 3) return "Eingelagert";
  }
 */

//RowSelectEvent
function rowSelectEvent(curRowSelected, allRowsSelected){ 

  var _selectedData = [];

if(allRowsSelected.length === 0) {  //Wenn keine Rows ausgewählt sind
    setSelectedData(undefined);
    return;
  }
  
  allRowsSelected.forEach(element => {
    _selectedData.push(allData[element.dataIndex])
  });

  setSelectedData(_selectedData);

  return;
}


  function Abschliesen(){

    if (selectedData == null || selectedData === undefined || selectedData.length === 0) {
      alert("Bitte Positionen auswählen!");
      return;
    }

    var pKs = filterPks(selectedData);
    var pKs_json = JSON.stringify(pKs)
    console.log(pKs_json)

    //Update Production table from Prod_status 1 to 2 (In Produktion zu Produziert)
    axios.put("https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/updateinprodtoproducted", pKs_json)
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
  


    return (
<dev>
  <MUIDataTable
    title={"Produktionsaufträge"}
    data={allData}
    columns={columns}
    options={options} />
    <br></br>
    <Button
    variant="contained" 
    onClick={Abschliesen}
    title="Mit Klick auf diesen Button
    werden alle markierten Produktionsaufträge
    als produziert markiert." >
    Produziert
    </Button>
    <text>   </text>
    
</dev>
    );
}