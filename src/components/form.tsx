import React, { FormEvent, useEffect, useState } from 'react';
import { MapView, Mappedin, MappedinLocation } from '@mappedin/mappedin-js';

type Props = {
  venue: Mappedin |undefined;
  mapview: MapView | undefined;
};

const Form = ({ venue, mapview }: Props) => {
  const [startLocation, setStartLocation] = useState<string>("");
  const [endLocation, setEndLocation] = useState<string>("");
  const [filteredLocationsFrom, setFilteredLocationsFrom] = useState<string[]>([]);
  const [filteredLocationsTo, setFilteredLocationsTo] = useState<string[]>([]);
  const [isDropdownVisibleFrom, setIsDropdownVisibleFrom] = useState<boolean>(false);
  const [isDropdownVisibleTo, setIsDropdownVisibleTo] = useState<boolean>(false);

  const locationNames = venue?.locations.map((location) => location.name) || [];

  console.log(venue?.nodes)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (venue && mapview) {
      const direction1 = venue.locations.find((l) => l.name === startLocation);
      const direction2 = venue.locations.find((l) => l.name === endLocation);

      if (direction1 && direction2) {
        const directions = direction1.directionsTo(direction2);
        mapview.Journey.draw(directions, {
          pathOptions: {
            color: "orange",
          },
        });
      }
    }
  };

  const handleInputChange = (input: string, setFilteredLocations: React.Dispatch<React.SetStateAction<string[]>>, setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>, setLocation: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    const filtered = locationNames.filter((name) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);
    setDropdownVisible(true);
  };

  const handleDropdownClick = (location: string, setLocation: React.Dispatch<React.SetStateAction<string>>, setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLocation(location);
    setDropdownVisible(false);
  };
  
  return (
    <>
    <form onSubmit={handleSubmit} id='ul'>
      <label htmlFor="input-from">From:</label>
      <div className='from-div'>
        <input
          type="text"
          id="input-from"
          placeholder='Enter Your Location'
          value={startLocation}
          onChange={handleInputChange("from", setFilteredLocationsFrom, setIsDropdownVisibleFrom, setStartLocation)}
          onFocus={() => setIsDropdownVisibleFrom(true)}
        />
        {isDropdownVisibleFrom && (
          <div className= {isDropdownVisibleFrom?'dropdown-content show':'dropdown-content'}>
            {filteredLocationsFrom.map((dropdown, index) => (
              <div key={index} onClick={() => handleDropdownClick(dropdown, setStartLocation, setIsDropdownVisibleFrom)}>
                {dropdown}
              </div>
            ))}
          </div>
        )}
      </div>
      <label htmlFor="input-to">To:</label>
      <div className='dropdown'>
        <input
          type="text"
          id="input-to"
          placeholder='Enter Your Destination'
          value={endLocation}
          onChange={handleInputChange("to", setFilteredLocationsTo, setIsDropdownVisibleTo, setEndLocation)}
          onFocus={() => setIsDropdownVisibleTo(true)}
        />
        {isDropdownVisibleTo && (
          <div className= {isDropdownVisibleTo?'dropdown-content show':'dropdown-content'}>
            {filteredLocationsTo.map((dropdown, index) => (
              <div key={index} onClick={() => handleDropdownClick(dropdown, setEndLocation, setIsDropdownVisibleTo)} >
                {dropdown}
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="submit">Direction</button>
    </form>
    </>
  );
};

export default Form;
