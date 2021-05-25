/*----------------------------------------*/
  //Author: ESI SoSe21 - Team Production//
/*----------------------------------------*/

import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";

export default function DataTable() {

  const columns = [ 
   {name: "PRODMAT_ID", label: "PRODMAT_ID", options: {filter: true, sort: true, display: true}}, 
   {name: "TYP", label: "Typ", options: {filter: true, sort: true, display: true}},
   {name: "TYP_T", label: "Farbwert",  options: {filter: true,  sort: true, display: true}}, 
   {name: "TYP_C", label: "Farbtyp", options: {filter: true, sort: true, display: true}},
   {name: "QYT", label: "Menge", options: {filter: true,  sort: true,  display: true}}]

   const options = {rowsPerPage: 5, customToolbarSelect: () => {return; }, filterType: 'checkbox', download: false, };
               
   const [allData /*, setAllData*/] = useState([]); 


  useEffect(() => { DatenLaden();});
  
  function DatenLaden(){

    }

 

  return (
  <div>
    <MUIDataTable 
        title={"In Bestellung"}
        data={allData}      
        columns={columns}
        options={options}/>
    </div>
  );
}