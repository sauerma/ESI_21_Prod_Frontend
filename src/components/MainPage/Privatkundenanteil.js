/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team production members
// Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
// Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
//          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
// File: KPI Privatkundenanteil
/*-----------------------------------------------------------------------*/

import React, { useState, useEffect } from "react";
import { ChartDonut } from '@patternfly/react-charts';
import axios from "axios";

export default function Privatkundenanteil() {

  const [privatKundenData, setPrivatKundenData] = useState([]);
  const [privatKundenNumber, setPrivatKundenNumber] = useState();

  //Event if data changed
  useEffect(() => { getPrivatKundenAnteil(); });

  //Get KPI
  function getPrivatKundenAnteil() {

    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidataprivatkunden')
      .then(res => {

        if (IsDataBaseOffline(res)) return; //Check if database is available

        if (res.data.body.length === 0) { //Check if data is available
          setPrivatKundenData(undefined);
          setPrivatKundenNumber(undefined);
          return;
        }

        var resp = JSON.parse(res.data.body[0]['privatkunden']);
        if (privatKundenNumber === resp) return;  //Check if data has changed  
        if (typeof resp !== 'number') return;
        setPrivatKundenNumber(resp); //Set new data
        setPrivatKundenData([{ x: '', y: resp }, { x: '', y: 100 - resp }]); //Set new data

      })
      .catch(err => {
        console.log(err.message); //Error-Handling
      })

  }

  //Check if database is offline (AWS)
  function IsDataBaseOffline(res) {

    if (res.data.errorMessage == null) return false;
    if (res.data.errorMessage === 'undefined') return false;
    if (res.data.errorMessage.endsWith("timed out after 3.00 seconds")) {
      //alert("Database is offline (AWS).");
      return true;
    }
    return false;
  }

  return (
    <div style={{ height: '78px', width: '90px', padding: 0, margin: 0, overflow: "hidden" }}>
      <ChartDonut
        ariaDesc="Average number of pets"
        ariaTitle="Donut chart example"
        padding={{ bottom: 0, left: 0, right: 0, top: 0 }}
        constrainToVisibleArea={true}
        data={privatKundenData}
        height={90}
        labels={({ datum }) => `${datum.x} ${datum.y}%`}
        title={Math.round(privatKundenNumber, 2) + "%"}
        width={140} />
    </div>
  );
}