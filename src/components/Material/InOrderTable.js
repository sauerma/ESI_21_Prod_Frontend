/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import QualityCell from '../Planung/qualityCell.js';

export default function DataTable() {

  const columns = 
  [ 
   {name: "prodmat_id", label: "Material-Nr", options: {filter: true, sort: true, display: true}}, 
   {name: "m_id_materialstype", label: "Typ", options: {filter: true, sort: true, display: true}},
   {name: "quantity", label: "Menge",  options: {filter: true,  sort: true, display: true}}, 
   {name: "ppml", label: "PPML", options: {filter: true, sort: true, display: true}},
   {name: "whitness", label: "Weißgrad", options: {filter: true,  sort: true,  display: true}}, 
   {name: "viscosity", label: "Viskosität", options: {filter: true, sort: true, display: true}},  
   {name: "absorbency", label: "Saugfähigkeit", options: {filter: true,  sort: true,  display: true}}, 
   {name: "RES_QTY", label: "Restmenge", options: {filter: true, sort: true, display: true}}, 
   {name: "hexcolor", label: "HEX-Wert", options: {filter: true, sort: true, display: true}}, 
   {name: "hexcolor", label: "Farbe", options: {filter: true,sort: true, display: true,
    customBodyRender: (value, tableMeta, updateValue) => {
    return (
      <QualityCell
        value={value}
        index={tableMeta.columnIndex}
        change={event => updateValue(event)}
      />
    );} }}, 
   {name: "delta_e", label: "Delta_e", options: {filter: true,sort: true, display: true}}
  ];

   const options = {rowsPerPage: 3, customToolbarSelect: () => {return; }, selectableRows: false, filterType: 'checkbox', download: false, };
               
   const [allData , setAllData] = useState([]); 


  useEffect(() => { DatenLaden();});
  
  function DatenLaden(){

    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getinbestellungorders')
    .then(res => {
    console.log("RESPONSE:", res); //Data from Gateway
    
    if(IsDataBaseOffline(res)) return; //Check if db is available

    if(res.data.body.length === 0) { //Check if data is available
      setAllData(undefined);
      return;
    }

    if (DataAreEqual(allData, res.data.body)) return; //Check if data has changed       
    //setAllData(res.data.body); //Set new table data
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