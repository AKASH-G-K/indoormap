import React, { useMemo,useState } from 'react';
import useOfflineSearch from '../common/useOfflineSearch';
import { Mappedin,MappedinLocation, MapView} from '@mappedin/mappedin-js';
import useSelectedLocation from "../common/useSelectedLocation";

type Props = {
    venue:Mappedin | undefined,
    mapview:MapView | undefined
}
const Search = ({venue, mapview}:Props) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const results = useOfflineSearch(venue, searchQuery);
    const { selectedLocation, setSelectedLocation } = useSelectedLocation(
        mapview
      );


    const searchResults = useMemo(
        () =>
          results
            .filter((result) => result.type === "MappedinLocation")
            .map((result) => (
              <div
                id="search-result"
                key={(result.object as MappedinLocation).name}
                onClick={() => {
                  setSelectedLocation(result.object as MappedinLocation);
                  setSearchQuery("");
                }}
              >
                {`${result.object.name}`}
              </div>
            )),
        [results]
      );

  return (
    <>
       <div id="ui">
        <div>{`Selected: ${selectedLocation?.name ?? "None"}`}</div>
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search..."
        />
        <div id="results">{searchResults}</div>
      </div>
    </>
  )
}

export default Search
