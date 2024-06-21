import './App.css';
import CountryInfo from './components/CountryInfo/CountryInfo';
import { useCallback, useEffect, useState } from 'react';
import { ApiCountry, country } from './types';
import axios from 'axios';
import { ALLCOUNT_URL, BASE_URL } from './constantas';
import Country from './components/Country/Country';

function App() {
  const [selectCountry, setSelectCountry] = useState<null | string>(null);
  const [countries, setCountries] = useState<country[]>([]);

  const fetchCount = useCallback(async () => {
    const { data: allCountries } = await axios.get<ApiCountry[]>(
      BASE_URL + ALLCOUNT_URL,
    );

    const country = allCountries.map(async (country) => {
      return {
        name: country.name,
        alphaCode: country.alpha3Code,
      };
    });

    const newCountries = await Promise.all(country);
    setCountries(newCountries);
  }, []);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  return (
    <div className="mainBlock">
      <div className="ScrollDiv">
        {countries.map((country) => (
          <Country
            key={country.alphaCode}
            country={country}
            onClick={() => setSelectCountry(country.alphaCode)}
          />
        ))}
      </div>
      <CountryInfo alphaCode={selectCountry} />
    </div>
  );
}

export default App;
