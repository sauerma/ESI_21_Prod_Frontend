/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Dynamischer Spaltenfärber
/*-----------------------------------------------------------------------*/

import React, {Component} from "react";
import PropTypes from "prop-types";

class QualityCell extends Component {
    static propTypes = {
      value: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      change: PropTypes.func.isRequired
    };
    
    render() {
      const { value, index, change } = this.props;
      let backgroundColor = String(value);      
  
      //Update background colors dynamically
      return (
        <p
          value={value}
          onChange={event => change(event.target.value, index)}
          style={{ backgroundColor: backgroundColor, color: "rgb(0,0,0,0)"}}>{"."}</p>
      )
    }
  }
  export default QualityCell;