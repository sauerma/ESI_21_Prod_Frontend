import React, {/*useState, useEffect*/} from "react";
import MUIDataTable from "mui-datatables";



export default function ColorTable() {

    const columns = [{ name: "O_NR", label: "Bestell-Nr",  options: {filter: true,  sort: true, display: true}}, 
{name: "OI_NR", label: "Bestellpos-Nr", options: {filter: true, sort: true, display: true }}, 
{name: "PO_CODE", label: "PO_CODE", options: {filter: true,  sort: false,  display: false}}, 
{name: "PO_COUNTER", label: "PO_COUNTER", options: {filter: true, sort: false, display: false}},  
{name: "O_DATE", label: "Bestelldatum", options: {filter: true, sort: true, display: true}}, 
{name: "CUSTOMER_TYPE", label: "Kundentyp", options: {filter: true, sort: true, display: true}}, 
{name: "QUANTITY", label: "Menge", options: {filter: true, sort: true, display: true}}, 
{name: "PROD_STATUS", label: "Status", options: {filter: true, sort: true, display: true}}, 
{name: "MAT_NR", label: "Material-Nr", options: {filter: true, sort: true, display: false}}, 
{name: "C", label: "C", options: {filter: true, sort: false, display: false}},
{name: "M", label: "M",options: {filter: true,sort: false,display: false}},
{name: "Y",label: "Y",options: {filter: true,sort: false, display: false}},
{name: "K", label: "K", options: {filter: true,sort: false, display: false}},
{name: "HEXCOLOR", label: "Hex-Wert", options: {filter: true,sort: true, display: true}},
{name: "PROD_PRIO", label: "Priorität", options: {filter: true,sort: true, display: false}},
{name: "IMAGE", label: "Image", options: {filter: true,sort: true, display: true}},
{name: "END_DATE", label: "Enddatum",options: {filter: true,sort: false, display: true}},
{name: "p_nr", label: "Produktionsnr", options: {filter: true, sort: true, display: true}}];

const options = {rowsPerPage: 8, customToolbarSelect: () => {/* Hide Delete Button */}, filterType: 'checkbox' };
var data = undefined;


  return (
          <div style={{ padding: '20px'}}>
              <MUIDataTable
    title={"Farben"}
    data={data}
    columns={columns}
    options={options} />
          </div>

  );
}