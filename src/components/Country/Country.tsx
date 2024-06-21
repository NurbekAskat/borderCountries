import React, { MouseEventHandler } from 'react';
import { country } from '../../types';

interface Props {
  country: country;
  onClick: MouseEventHandler;
}

const Country: React.FC<Props> = ({ country, onClick }) => {
  return (
    <div id={country.alphaCode} onClick={onClick} className="CountryBox">
      {country.name}
    </div>
  );
};

export default Country;
