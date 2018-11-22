import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux'


import GoogleMap from 'google-map-react';

// import { googleMapsAPI } from '../server/config.js';
import { googleMapsAPI } from './config2.js';

import store from './index.js';
import Pointer from './Pointer.js';
import Current from './Current.js';
import Polyline from './Polyline.js';


class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 37.77,
        lng: -122.41
      },
      path: [],
      zoom: 11,
      speed: 0,
      signal: 0,
      map: null,
      maps: null,
      mapLoaded: false,
      range: []
    }
    store.subscribe(() => {
      let range = store.getState().data.range;
      let currentIndex = store.getState().updateTime.index;
      let current = range[currentIndex];
      let lat = current ? current.lat : this.state.center.lat;
      let lng = current ? current.long : this.state.center.lng;
      let speed = current ? current.speed : this.state.speed;
      let rssi = current ? current.rssi : this.state.signal;
      let visited = range.slice(0, Number(currentIndex) + 1);

      if (range.length !== this.state.range.length) {
        this.setState({
          center: {
          lat: range.length !== 0 ? range[0].lat : 37.77,
          lng: range.length !== 0 ? range[0].long : -122.41
        },
          path: range.length !== 0 ? [range[0]] : [{lat: 37.77, long: -122.41}],
          range: range,
          speed: 0,
          signal: 0
        })
      } else {
        this.setState({
          center: {
            lat: lat,
            lng: lng
          },
          path: visited,
          range: range,
          speed: speed,
          signal: rssi
        });
      }
    })

  }
  // componentDidMount() {
  // }

  addMaps(map, maps) {
    // console.log('only add once');
    this.setState({
      map: map,
      maps: maps,
      mapLoaded: true
    })
  }
 
  render() {
    // console.log('CURRENT', this.props.data.current);
    let markers = [];
    let current;
    if (this.props.data.current) {
      // let center = {
      //   lat: this.props.data.current.lat,
      //   lng: this.props.data.current.long
      // }
      if (this.state.path.length === 1 && this.state.path[0].lat === 37.77 && this.state.path[0].long === -122.41) {
        markers = null;
        current = null;
      } else {
        markers = this.state.path.slice(0, -1).map((entry, index) => {
          // console.log('entry', entry);
          return (
            <Pointer lat={entry.lat} lng={entry.long} key={index}/>
          )
        })
        current = this.state.path.slice(-1);
      }
      // console.log('markers', markers);
      // console.log('current', current);
    }
    // if (this.state.set) {
    //   this.renderPolylines(this.state.map, this.state.maps);
    // }
    // console.log('this.state.path', this.state.path);
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMap
          bootstrapURLKeys={{ key: googleMapsAPI }}
          defaultCenter={{lat: 59.95, lng: 30.33}}
          center={this.state.center}
          // defaultCenter={this.props.data.current}
          // center={center}
          defaultZoom={this.state.zoom}
          onGoogleApiLoaded={({map, maps}) => this.addMaps(map, maps)}
        >

        {markers}
        {
          (this.state.path.length > 0 && current && current.length === 1) ? <Current lat={current[0].lat} lng={current[0].long}/> : null
        }

        {
          this.state.mapLoaded ? 
            <Polyline map={this.state.map} maps={this.state.maps} path={this.state.path} /> :
            null

        }

        </GoogleMap>
        <div className="map-details">
          <div className="map-speed">
            Speed: {this.state.speed} mph 
          </div>
          <div className="map-signal">
            Signal Strength: {this.state.signal} rssi
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.data,
  updateTime: state.updateTime
})

export default connect(mapStateToProps)(SimpleMap);

// export default SimpleMap;
