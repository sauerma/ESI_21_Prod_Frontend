/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: InBestellung-Tabelle
/*-----------------------------------------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import QualityCell from '../Planung/qualityCell.js';

export default function DataTable() {

  //Set table columns
  const columns = 
  [ 
   {name: "prodmat_id", label: "Mat-Bestellnr.", options: {filter: true, sort: true, display: true}}, 
   {name: "m_id_materialstype", label: "Typ", options: {filter: true, sort: true, display: true}},
   {name: "quantity", label: "Menge",  options: {filter: true,  sort: true, display: true}}, 
   {name: "ppml", label: "PPML", options: {filter: false, sort: false, display: false}},
   {name: "whitness", label: "Weißgrad", options: {filter: false,  sort: false,  display: false}}, 
   {name: "viscosity", label: "Viskosität", options: {filter: false, sort: false, display: false}},  
   {name: "absorbency", label: "Saugfähigkeit", options: {filter: false,  sort: false,  display: false}}, 
   {name: "RES_QTY", label: "Restmenge", options: {filter: false, sort: false, display: false}}, 
   {name: "hexcolor", label: "Hex-Wert", options: {filter: true, sort: true, display: true}}, 
   {name: "hexcolor", label: "Farbe", options: {filter: true,sort: true, display: true,
    customBodyRender: (value, tableMeta, updateValue) => {
    return (
      <QualityCell
        value={value}
        index={tableMeta.columnIndex}
        change={event => updateValue(event)}
      />
    );} }}, 
   {name: "delta_e", label: "Delta_e", options: {filter: false,sort: false, display: false}}
  ];

  //Set table options
  const options = {rowsPerPage: 3, customToolbarSelect: () => {return; }, selectableRows: false, filterType: 'checkbox', download: false, };          
  const [allData , setAllData] = useState([]); 

  //Event if data changed
  useEffect(() => { DatenLaden();});
    
  //Load data
  function DatenLaden(){

    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getinbestellungorders')
    .then(res => {
    console.log("RESPONSE:", res); //Data from Gateway
    
    if(IsDataBaseOffline(res)) return; //Check if database is available

    if(res.data.body.length === 0) { //Check if data is available
      setAllData(undefined);
      return;
    }

    if (DataAreEqual(allData, res.data.body)) return; //Check if data has changed       
    setAllDataWithTReplace(res.data.body); //Set Data with T to Shirt replacement

    })
    .catch(err => {
        console.log(err.message); //Error-Handling
    })
  }

  //Set Data with replacement T to Shirt
  function setAllDataWithTReplace(data){

    data.forEach(element => {
      for (var key in element){
        if(element[key] === "T"){
        element[key] = "Shirt"
        }
      }
    });
      setAllData(data);
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

  return (
  <div  style={{marginTop: "3%"}}>
    <MUIDataTable style={{float: "left"}}
        data={allData}    
        title="In Bestellung"
        columns={columns}
        options={options}/>
    </div>
  );
}