import { Component } from 'react';


class Line extends Component {
  componentWillUpdate() {
    this.line.setMap(null)
  }

  componentWillUnmount() {
    this.line.setMap(null)
  }

  render() {
    // console.log('HERERRER', this.props.maps);
    // const Polyline = this.props.maps.Polyline

    // const renderedPolyline = this.renderPolyline()
    // const paths = { path: this.getPaths() }

    // this.line = new Polyline(Object.assign({}, renderedPolyline, paths))
    // console.log('polyline path', this.props.path);
    let path = this.props.path.map((path) => {
      return {
        lat: path.lat,
        lng: path.long
      }
    })
    this.line = new this.props.maps.Polyline({
      path: path,
      geodesic: false,
      strokeColor: 'blue',
      strokeOpacity: 0.7,
      strokeWeight: 3
    })

    this.line.setMap(this.props.map)

    return null
  }

}

export default Line;