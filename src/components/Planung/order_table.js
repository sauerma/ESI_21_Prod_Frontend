/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";
import {CSVLink} from "react-csv";
import GetAppIcon from '@material-ui/icons/GetApp';
//import { keys } from "@material-ui/core/styles/createBreakpoints";

export default function DataTable() {

  const columns = [{ name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
   {name: "OI_NR", label: "Bestellpos-Nr", options: {filter: true, sort: true, display: true }}, 
   {name: "PO_CODE", label: "PO_CODE", options: {filter: true,  sort: false,  display: false}}, 
   {name: "PO_COUNTER", label: "PO_COUNTER", options: {filter: true, sort: false, display: false}},  
   {name: "O_DATE", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
   {name: "CUSTOMER_TYPE", label: "Kundentyp", options: {filter: true, sort: true, display: true}}, 
   {name: "QUANTITY", label: "Menge", options: {filter: true, sort: false, display: true}}, 
   {name: "PROD_STATUS", label: "Status", options: {filter: true, sort: true, display: true}}, 
   {name: "MAT_NR", label: "Material-Nr", options: {filter: true, sort: true, display: true}}, 
   {name: "C", label: "C", options: {filter: true, sort: false, display: false}},
   {name: "M", label: "M",options: {filter: true,sort: false,display: false}},
   {name: "Y",label: "Y",options: {filter: true,sort: false, display: false}},
   {name: "K", label: "K", options: {filter: true,sort: false, display: false}},
   {name: "HEXCOLOR", label: "Hex-Wert", options: {filter: true,sort: true, display: true}},
   {name: "PROD_PRIO", label: "Priorität", options: {filter: true,sort: true, display: true}},
   {name: "IMAGE", label: "Image", options: {filter: true,sort: true, display: true}},
   {name: "END_DATE",label: "END_DATE",options: {filter: true,sort: false, display: false}},
   {name: "p_nr", label: "Produktionsnr", options: {filter: true, sort: true, display: true}}];

  const options = { customToolbarSelect: () => {/* Hide Delete Button */}, filterType: 'checkbox', download: false, 
                    onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }};
  const [csvdata, setCsvData] = useState([]); 
  const [Quantity, setQuantity] = useState("");
  const [QuantityColor, setQuantityColor] = useState("#ffffff");
  const csvheaders = ["OI_NR", "O_DATE", "p_nr", "QUANTITY", "HEXCOLOR", "IMAGE"];
  
  const [allData, setAllData] = useState([]); 
  const [selectedData, setSelectedData] =  useState([]); 


  useEffect(() => {

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

  //Status-Nr to Status-Bez
  function StatusNrToBez(statusNr){
    if(statusNr === 0) return "In Planung";
    if(statusNr === 1) return "In Produktion";
    if(statusNr === 2) return "Produziert";
    if(statusNr === 3) return "Eingelagert";
  }

 //Update status in planning to in production
  function update_prod_status(){  
      
    if (selectedData == null || selectedData === undefined || selectedData.length === 0) {
        alert("Bitte Positionen auswählen!");
        return;
      }

      var pKs = filterPks(selectedData);
      console.log("Selected Pks:", pKs);

      //TODO Update Production table

      axios.put("https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/updateplanningtoprod", pKs)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.message); //Error-Handling
      })

      //TODO Update Verkauf & Versand table --> In Lambda-Funktion packen


 
    alert("Erfolgreich geupdated.")
    return;
}

function filterPks(selectedData){
  var _pks = {};
  var counter = 0;
  selectedData.forEach(element => {
    var singleVal = {};
    singleVal["O_NR"] = element["O_NR"];
    singleVal["OI_NR"] = element["OI_NR"];
    singleVal["PO_CODE"] = element["PO_CODE"];
    singleVal["PO_COUNTER"] = element["PO_COUNTER"];
    _pks[counter] = singleVal;
    counter += 1;
  });
  console.log(_pks);
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
    setCsvData(_selectedData); 
    setSelectedData(_selectedData);

    return;
  }

  function updateQuantity(selecteDataFromTable){

    var quantity = 0

    selecteDataFromTable.forEach(element => {
      quantity += element["QUANTITY"]
    });
    setQuantity(quantity)

    if(quantity > 350) setQuantityColor("#FF0040");
    else setQuantityColor("#088A08");

    return;
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
    <Button variant="contained" onClick={update_prod_status} >In Produktion geben</Button>
    <text name="DummySeperator">  </text>
    <Button variant="contained" onClick={update_prod_status} >
    <CSVLink data={csvdata} headers={csvheaders} style={{textDecoration: "none", color: "black"}} filename={"MachineConfiguration.csv"}>Download CSV</CSVLink>
    <GetAppIcon/>  
    </Button>
    <text name="DummySeperato2">  </text>
    <Button disabled variant="Quantity" style={{color: QuantityColor}} >Ausgewählte Menge: {Quantity}</Button>
    
    </div>
  );
}

    // //REST CALL Create CSV mit array Übergabe  
    // var data = { title: 'React POST Request Example' };    
    // axios.post('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/createcsv',data)
    //     .then(res => {      
        
    //     console.log("RESPONSE:", res); //Data from Gateway

    //   })
    //     .catch(err => {
    //         console.error('There was an error!', error); //Error-Handling
    //     });

  // }
// }
