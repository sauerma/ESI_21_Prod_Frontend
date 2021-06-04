/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: FAQ Bereich
/*-----------------------------------------------------------------------*/

import React from 'react';
import Faq from 'react-faq-component';

export default function FaqBereich() {

  const data = {
      title: "FAQ",
      rows: [
        {
          title: "Wie setzen sich die Kennzahlen der Startseite zusammen?",
          content: "Die Produktionsmenge des letzten Monates wird in einer Zeitachse angezeigt. Jeder Punkt gibt die Summe der produzierten T-Shirts eines Tages wieder. Wenn man mit der Maus auf den jeweiligen Punkt fährt, erscheint die exakte Tagesmenge. Die Anzeige enthält immer 30 Tage rückwirkend. Die Auslastung der Färbemaschine wird daran gemessen, wie viele T-Shirts in der aktuellen Produktion produziert werden, im Verhältnis zu der maximalen Auslastung der Färbemaschine von 350 T-Shirts pro Schicht. Der Fortschritt von heute gibt Auskunft über den erledigten Teil des gesetzten Schichtpensums. Bei 100% ist die gesetzte Tagesproduktion erledigt. Der Privatkunden Anteil beschreibt fest den Anteil der Privatkundenaufträge zu den Gesamtaufträgen für die aktuelle Schicht."
          
        },
        {
          title: "Wie geht man bei der Produktionsplanung vor?",
          content: "Im Tab „Planung“ werden alle Aufträge, die vom Vertrieb und Versand kommen, aufgelistet. Dazu gehören Neubestellungen, Retouren, Neuproduktionen, welche durch die interne Qualitätskontrolle gefallen sind, sowie Vorproduktionen. Die Aufträge werden automatisch nach deren Priorität sortiert. 1 hat die höchste Priorität. Alle Spalten können zusätzlich beliebig sortiert werden. Über die Suche und die Filterfunktion können bestimmte Aufträge schnell angezeigt werden. Der User kann nun Aufträge auswählen und sich über den Button „In Färbung geben -CSV“ oder „In Druck geben“ einen oder zwei Produktionsschritte weiter leiten. In Färbung geben -CSV: Das System erstellt automatisch eine Tabelle mit den angewählten Aufträgen. Diese muss für die Färbemaschine bereitgestellt werden. In dieser Tabelle werden die Aufträge nach der T-Shirt-Helligkeit von hell nach dunkel angeordnet, um eine möglichst lange Maschinenlaufzeit pro Schicht zu erhalten. In Druck geben: Für die gängigsten T-Shirt-Farben müssen Aufträge, die diese Farbe zum Färben enthalten, nicht erst gefärbt werden. Über den eingebauten Filter der gängigsten Farben können diese leicht identifiziert werden, um sie direkt in den Druck zu schicken. Hinweis: Über die Summenfunktion oben rechts muss notiert werden, wie viele von den vorgefärbten T-Shirts für den Druck dann aus dem Lager bestellt werden müssen. (Siehe: Wie bestellt man Material aus dem Lager?)"
          
        },
        {
          title: "Was muss in der Färbung gemacht werden?",
          content: "Im Tab „Produktion“ unter dem Reiter „Färbeaufträge“ entscheidet der Mitarbeiter lediglich welche Bestellungen schon fertig gefärbt sind und welche davon direkt als produziert markiert werden können, da kein Aufdruck mehr geplant ist. Fertige T-Shirts gehen direkt in die Verpackung und anschließend ins Lager. Alle anderen T-Shirts gehen in den Druck."
        },
        {
          title: "Was muss nach dem Druck gemacht werden?",
          content: "Im Tab „Produktion“ unter dem Reiter „Druckaufträge“ kann erkannt werden, welches Motiv zu welchem Auftrag gehört. Nach dem Druck muss auch hier der Produktionsauftrag als fertig produziert markiert werden. Fertige T-Shirts gehen direkt in die Verpackung und anschließend ins Lager."
        },
        {
          title: "Gibt es eine Übersicht der produzierten Aufträge?",
          content: "Alle fertig produzierten Aufträge werden an die Materialwirtschaft übermittelt, stehen der Produktion jedoch im Tab „Produktion“ unter dem Reiter „Produzierten Aufträge“ zur Verfügung."
        },  
        {
          title: "Wie bestellt man Material aus dem Lager?",
          content: "Im Tab des Materialmanagements können die gewünschten Mengen an T-Shirts und Farben eingegeben und bestellt werden. Diese werden dann im Lager angefragt. Angefragte Mengen sind in der Tabelle „In Bestellung“ ersichtlich. Materialbestellungen, die aus dem Lager in die Produktion gebracht wurden, können unter dem Reiter „Aktueller Bestand“ eingesehen werden. Zu anzufragenden Materialien gehören Trägerstoffe, wie die weißen Grund-T-Shirts, Farben für die Maschinen und schon vorgefärbte T-Shirts direkt für den Druck."
        },
        {
          title: "Wie erkenne ich die Qualitätswerte der Rohmaterialien?",
          content: "Im Tab des Materialmanagements stehen unter dem Reiter aktuellem Bestand die Qualitätswerte zu jeder Materialbestellung und deren zugehörige Chargennummer."
        },
        {
          title: "Wie gebe ich Restmengen der Materialien an?",
          content: "Im Bereich des Materialmanagements stehen unter „Aktuellem Bestand“ die bestellten Gesamtmengen sowie die Restwerte. Der Restwert pro Materialbestellung kann manuell bearbeitet werden und sollte nach jeder Schicht aktualisiert werden, um eine optimale Übersicht der aktuell in der Produktion befindlichen Rohmaterialien zu haben."
        },
        {
          title: "Wie gelange ich zu den Bereichen Materialwirtschaft und Vertrieb / Versand?",
          content: "In der Seitenleiste befindet sich das YourShirt Logo, über das direkt zur Übersichtsseite navigiert werden kann. Dort kann in die jeweiligen Bereiche abgesprungen werden, falls die Berechtigung dazu vorhanden ist."
        },
      ]
    }
    
  const styles = {
      bgColor: '282828',
      titleTextColor: "white",
      rowTitleColor: "white",
      rowContentColor: 'white',
      arrowColor: "white",
  };

  const config = {
      animate: true,
      tabFocus: true
  };
  

  return (

    <div style={{ padding: '2px'}}>
      <Faq data={data} styles={styles} config={config} />
      <br></br>
    </div>
      
  );
}