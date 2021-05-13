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

  const columns = ["Bestelldatum", "Bestellnr", "Produktionsnr", "Menge", "Status", "Hex-Wert", "Priorität", "Bild"];
  const options = { customToolbarSelect: () => {/* Hide Delete Button */}, filterType: 'checkbox',  
                    sortOrder: {name: 'Priorität', direction: 'asc'}, download: false, 
                    onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }};
  const [data, setData] = useState([]);  
  const [csvdata, setCsvData] = useState([]); 
  const [pkData, setPkData] = useState([]);
  const [selectedPkData, setSelectedPkData] = useState([]); 
  const [Quantity, setQuantity] = useState("");
  const [QuantityColor, setQuantityColor] = useState("#ffffff");
  const csvheaders = ["Bestelldatum", "Bestellnr", "Produktionsnr", "Menge", "Hex-Wert", "Bild"];
  


  useEffect(() => {

    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getplanningorders')
        .then(res => {
        
        console.log("RESPONSE:", res); //Data from Gateway
        if(IsDataBaseOffline(res)) return; //Check if db is available
        if(res.data.body.length === 0) { //Check if data is available
          setData(undefined);
          setPkData(undefined);
          return;
        }          
        var allSortedOrders = sortOrders(res.data.body) //alle geordneten Daten
        var PKsSortedOrders = allSortedOrders[1] //nur geordnete PKs
        var sortedTableOrders = allSortedOrders[0]; //nur geordnete Tabellendaten
        if (DataAreEqual(data, sortedTableOrders)) return; //Check if data has changed       
        setData(sortedTableOrders); //Set new table data
        setPkData(PKsSortedOrders); //Set related PKs
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

  //Sort data from api
  function sortOrders(list){
    var sortedOrders = [];
    var sortedPKs = [];

    for (var key in list){

      var singleSortedList = null;
      singleSortedList = [];
      var singleSortedPKs = null;
      singleSortedPKs = [];

      var unsortedOrders = Object.values(list[key]);
      
      //PKs
      singleSortedPKs.push(unsortedOrders[0]) //O_NR
      singleSortedPKs.push(unsortedOrders[1]) //OI_NR
      singleSortedPKs.push(unsortedOrders[2]) //PO_CODE
      singleSortedPKs.push(unsortedOrders[3]) //PO_COUNTER
     
      //Table Values
      singleSortedList.push(unsortedOrders[4]); //Bestelldatum
      singleSortedList.push(unsortedOrders[1]); //Bestellnummer
      singleSortedList.push(unsortedOrders[17]); //Produktionsnummer
      singleSortedList.push(unsortedOrders[6]); //Menge
      singleSortedList.push(StatusNrToBez(unsortedOrders[7])); //Status
      singleSortedList.push(unsortedOrders[13]); // Hex-Wert
      singleSortedList.push(unsortedOrders[14]); //Priorität
      singleSortedList.push(unsortedOrders[15]); //Bild 
      
      sortedOrders.push(singleSortedList);
      sortedPKs.push(singleSortedPKs);
  }     
    return [sortedOrders, sortedPKs];
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
      
  if (selectedPkData == null || selectedPkData === undefined || selectedPkData.length === 0) {
    alert("Bitte Positionen auswählen!");
    return;
  }
  console.log("Update Pks:", selectedPkData);

  //TODO Update Production table
  

  //TODO Update Verkauf & Versand table


  alert("Erfolgreich geupdated.")
  return;
}

  //RowSelectEvent
  function rowSelectEvent(curRowSelected, allRowsSelected){ 

    var selectedData = [];
    var selectedPKs = [];

  if(allRowsSelected.length === 0) {  //Wenn keine Rows ausgewählt sind
      setQuantity(0); //Menge auf 0 setzen
      setQuantityColor("#088A08");
      setSelectedPkData(undefined);
      return;
    }

    allRowsSelected.forEach(element => {  //Convert all indexes to data array
  
      let obj = {}

      columns.forEach((key, i) => {
        obj[key] = data[element.dataIndex][i]
      })

      selectedData.push(obj)      
    }); 

    allRowsSelected.forEach(element => { 
      selectedPKs.push(pkData[element.index]);
    });

    updateQuantity(selectedData);  
    setCsvData(selectedData);
    setSelectedPkData(selectedPKs);

    return;
  }

  function updateQuantity(selecteDataFromTable){

    var quantity = 0

    selecteDataFromTable.forEach(element => {
      quantity += element["Menge"]
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
        data={data}      
        columns={columns}
        options={options}/>
    <br/>
    <br/>
    <Button variant="contained" onClick={update_prod_status} >In Produktion geben</Button>
    <text name="DummySeperator">  </text>
    <Button variant="contained" onClick={update_prod_status} >
    <CSVLink data={csvdata} headers={csvheaders}  style={{textDecoration: "none", color: "black"}} filename={"MachineConfiguration.csv"}>Download CSV</CSVLink>
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
