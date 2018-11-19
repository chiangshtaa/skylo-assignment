import React, { Component } from 'react';
import Controls from './Controls.js';
import SimpleMap from './SimpleMap.js';

// import Map from './Map.js';

class Main extends Component {
  render() {
    return (
      <div className='main-container'> 
        <div className="title"> Vehicle Statistics</div>
        <div className="map-container">
          {/*<Map/>*/}
          <SimpleMap/>
        </div>
        <div className="controls">
          <Controls/>
        </div>
      </div>
    )
  }
}

export default Main;
          // <MapWithAMarker
          //   googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
          //   loadingElement={<div style={{ height: `100%` }} />}
          //   containerElement={<div style={{ height: `400px` }} />}
          //   mapElement={<div style={{ height: `100%` }} />}
          // />