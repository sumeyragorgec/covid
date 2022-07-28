import papa from "papaparse";
//import legendItems from "../entities/LegendItems";
import features from "../data/countries.json";
//import * as features from '../data/countries.json';

class LoadCountriesTasks {

    covid19Url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv"

    setState = null;
    mapCountries = features.features;

    load = (setState) => {
        this.setState = setState;

        papa.parse(this.covid19Url, {
            download: true,
            header: true,
            complete: (result) => {
                console.log(result);
                this.#processCovidData(result.data)
            },
        });
        //setState(mapDataFromCountries);
    }

    #processCovidData = (covidCountries) => {
        for (let i = 0; i < this.mapCountries.length; i++) {
            const mapCountry = this.mapCountries[i];
            const covidCountry = covidCountries.find(
                (covidCountry) => covidCountry.ISO3 === mapCountry.properties.ISO_A3
            );

            mapCountry.properties.comfirmed = 0;
            mapCountry.properties.confirmedText = "0";

            if (covidCountry != null) {
                const confirmed = Number(covidCountry.Confirmed);
                mapCountry.properties.confirmed = confirmed;
                mapCountry.properties.confirmedText = this.#formatNumberWithCommas(
                    confirmed,
                )
            }
        }
        this.setState(this.mapCountries);
    };
    #formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
}

export default LoadCountriesTasks;
