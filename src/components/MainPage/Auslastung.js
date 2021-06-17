/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team production members
// Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
// Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
//          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
// File: KPI-Auslastung
/*-----------------------------------------------------------------------*/

import React, { useState, useEffect } from "react";
import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';
import axios from "axios";

export default function Auslastung() {

  const [auslastungData, setAuslastungData] = useState([]);
  const [auslastungNumber, setAuslastungNumber] = useState();
  const [kpiColor, setKpiColor] = useState(ChartThemeColor.orange);

  useEffect(() => { getAuslastung(); });

  //Get KPI
  function getAuslastung() {
    axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getkpidataauslastung')
      .then(res => {

        if (IsDataBaseOffline(res)) return; //Check if database is available

        if (res.data.body.length === 0) { //Check if data is available
          setAuslastungData(undefined);
          setAuslastungNumber(Number(0.00));
          return;
        }

        var resp = JSON.parse(res.data.body[0]['auslastung']);
        if (auslastungNumber === resp) return;  //Check if data has changed
        console.log(typeof resp);
        if (typeof resp !== 'number') return;
        setAuslastungNumber(resp);
        CalcKpiColor(resp); //Set dynamic color
        setAuslastungData([{ x: '', y: resp }, { x: '', y: 100 - resp }]); //Set new data     

      })
      .catch(err => {
        console.log(err.message); //Error-Handling
      })
  }

  //Set dynamic color 
  function CalcKpiColor(resp) {
    console.log("Auslastung:", resp);
    if (resp < 80) setKpiColor(ChartThemeColor.orange);
    else if (resp >= 80 && resp <= 90) setKpiColor(ChartThemeColor.gold);
    else if (resp > 100) setKpiColor(ChartThemeColor.orange);
    else setKpiColor(ChartThemeColor.green);
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
        ariaDesc="Auslastung"
        ariaTitle="Auslastung"
        constrainToVisibleArea={true}
        data={auslastungData}
        height={90}
        labels={({ datum }) => `${datum.x} ${datum.y}%`}
        themeColor={kpiColor}
        title={Math.round(auslastungNumber, 2) + "%"}
        padding={{
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
        }}
        width={140} />

    </div>
  );
}