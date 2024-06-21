import React, { useCallback, useEffect, useState } from 'react';
import { alphaCountry } from '../../types';
import axios from 'axios';
import { ALPHA_URL, BASE_URL } from '../../constantas';

interface Props {
  alphaCode: null | string;
}

const CountryInfo: React.FC<Props> = ({ alphaCode }) => {
  const [countryAlpha, setCountryAlpha] = useState<null | alphaCountry>();

  const fetchCountry = useCallback(async () => {
    const { data: country } = await axios.get(BASE_URL + ALPHA_URL + alphaCode);

    const getBorders = async () => {
      if (country.borders) {
        const promise = country.borders.map(
          async (borderCountryCode: string) => {
            const { data: borderCountry } = await axios.get(
              BASE_URL + ALPHA_URL + borderCountryCode,
            );

            return borderCountry.name;
          },
        );

        return await Promise.all(promise);
      }

      return ['not border countries'];
    };

    const borders = await getBorders();
    const coun = {
      name: country.name,
      alphaCode: country.alpha3Code,
      capital: country.capital,
      population: country.population,
      borders: borders,
      flag: country.flag,
    };
    setCountryAlpha(coun);
  }, [alphaCode]);

  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);

  return countryAlpha ? (
    <div className="mainInfoBlock">
      <div className="subBlock">
        <h2>{countryAlpha.name}</h2>
        <p>Capital: {countryAlpha.capital}</p>
        <p>Population: {countryAlpha.population}</p>
      </div>
      <img src={countryAlpha.flag} className="countryFlag" />
      <p>Borders: {countryAlpha.borders.join(', ')}</p>
    </div>
  ) : (
    <div>No country information available.</div>
  );
};

export default CountryInfo;
