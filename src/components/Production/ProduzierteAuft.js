/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import QualityCell from '../Planung/qualityCell.js';


export default function ProduzierteAuft() {

    const columns =  
    [
    {name: "O_DATE", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
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
    {name: "END_DATE", label: "Enddatum",options: {filter: true,sort: true, display: true}},
   ];

   const options = {rowsPerPage: 4, customToolbarSelect: () => {return; }, selectableRows: false, filterType: 'checkbox', download: false, };
               
   const [allData , setAllData] = useState([]); 


  useEffect(() => { DatenLaden();});
  
  function DatenLaden(){

/*https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getproducedorders -> Nur für MaWi*/
    
    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getproducedandstoredorders')
    .then(res => {
    console.log("RESPONSE:", res); //Data from Gateway
    
    if(IsDataBaseOffline(res)) return; //Check if db is available

    if(res.data.body.length === 0) { //Check if data is available
      setAllData(undefined);
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

  return (
  <div>
    <MUIDataTable 
        data={allData}      
        columns={columns}
        options={options}/>
    </div>
  );
}