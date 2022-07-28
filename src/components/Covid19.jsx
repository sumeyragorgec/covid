import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import FirstApp from "./FirstApp";
import LoadCountriesTasks from '../tasks/LoadCountriesTasks';

const Covid19 = () => {
    const [countries, setCountries] = useState([]);

    const load = () => {
        const loadCountriesTask = new LoadCountriesTasks();
        loadCountriesTask.load(setCountries);
    };

    useEffect(load, []);


    return <div>
        {countries.length === 0 ?
            <Loading />
            :
            <div>
                <FirstApp />
            </div>
        }
    </div>;
};
export default Covid19;