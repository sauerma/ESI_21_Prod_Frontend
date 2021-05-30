import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import QualityCell from '../Planung/qualityCell.js';
import axios from "axios";


export default function ShirtsUndColorsTable() {

useEffect(() => { ShirtDatenLaden(); ColorDatenLaden(); });
  

/*-----------------------------------------Section SHIRTS TABLE-----------------------------------------------------*/    
const [ShirtData , setShirtData] = useState([]); 

const columnsShirts = 
  [ 
    {name: "prodmat_id", label: "Material-Nr", options: {filter: true, sort: true, display: true}}, 
    {name: "m_id_materialstype", label: "Typ", options: {filter: false, sort: false, display: false}},
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
const optionsShirts = {rowsPerPage: 3, customToolbarSelect: () => {/* Hide Delete Button */}, filterType: 'checkbox' };


function ShirtDatenLaden(){

  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getmaterialshirts')
  .then(res => {
  console.log("RESPONSE:", res); //Data from Gateway
  
  if(IsDataBaseOffline(res)) return; //Check if db is available

  if(res.data.body.length === 0) { //Check if data is available
    setShirtData(undefined);
    return;
  }

  if (DataAreEqual(ShirtData, res.data.body)) return; //Check if data has changed       
  setShirtData(res.data.body); //Set new table data

  })
  .catch(err => {
      console.log(err.message); //Error-Handling
  })
}

/*-----------------------------------------END Section SHIRTS TABLE-----------------------------------------------------*/   


/*----------------------------------------- Section Colors TABLE-----------------------------------------------------*/    
const [ColorData , setColorData] = useState([]); 

const columnsColors = 
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

const optionsColors = {rowsPerPage: 3, customToolbarSelect: () => {/* Hide Delete Button */}, filterType: 'checkbox' };

function ColorDatenLaden(){

  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getmaterialcolors')
  .then(res => {
  console.log("RESPONSE:", res); //Data from Gateway
  
  if(IsDataBaseOffline(res)) return; //Check if db is available

  if(res.data.body.length === 0) { //Check if data is available
    setColorData(undefined);
    return;
  }

  if (DataAreEqual(ColorData, res.data.body)) return; //Check if data has changed       
  setColorData(res.data.body); //Set new table data

  })
  .catch(err => {
      console.log(err.message); //Error-Handling
  })
}

/*----------------------------------------- END Section Colors TABLE-----------------------------------------------------*/    


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
<div style={{ padding: '0px'}}>
    <MUIDataTable
title={"Shirts"}
data={ShirtData}
columns={columnsShirts}
options={optionsShirts} />
   <br></br>
<MUIDataTable
    title={"Farben"}
    data={ColorData}
    columns={columnsColors}
    options={optionsColors} />
    <br></br>
<Button variant="contained" title="Mit Klick auf diesen Button werden die entsprechenden Restmengen aktualisiert.">Restmengen aktualisieren</Button> 
</div>

  );
}