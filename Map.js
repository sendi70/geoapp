import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    markers = JSON.parse(this.props.navigation.state.params.a)
    console.log("punkty" + markers)
    arr = []
    markers.map((val, i) => {
      let temp = <MapView.Marker
        coordinate={{
          latitude: val.coords.latitude,
          longitude: val.coords.longitude,
        }}
        title={"point"}
        description={"timestamp: " + val.timestamp}
        key={i}
      />
      arr.push(temp)
    })
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: markers[0].coords.latitude,
          longitude: markers[0].coords.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {arr}
      </MapView>
    );
  }
}

export default Map;
