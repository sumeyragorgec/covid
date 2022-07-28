import React, { Component } from 'react';
import mapDataFromCountries from "./../data/countries.json";
import "leaflet/dist/leaflet.css";
import { MapContainer, GeoJSON } from "react-leaflet";
import "./CovidMap.css";
import LoadCountriesTasks from '../tasks/LoadCountriesTasks';

class FirstApp extends Component {
    state = {}

    componentDidMount() {
        console.log(mapDataFromCountries);
    }

    onEachCountry = (country, layer) => {
        const name = country.properties.ADMIN;
        const confirmedText = country.properties.confirmedText;
        layer.bindPopup(`${name} ${confirmedText}`);
    };

    countryStyle = {
        fillColor: "rgb(46, 46, 104)",
        fillOpaciy: 0.00000000000005,
        color: "black",
        weight: 1,
        fillOpacity: 1,
    }

    render() {
        return (
            <div>
                <h1>
                    MILITARY BIG DATA
                </h1>
                <MapContainer style={{ height: "80vh" }} zoom={2.5} center={[20, 100]}>
                    <GeoJSON data={mapDataFromCountries.features} onEachFeature={this.onEachCountry} />
                </MapContainer>
            </div>
        );
    }
}

export default FirstApp;
