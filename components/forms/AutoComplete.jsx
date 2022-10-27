import React from 'react'
import usePlacesAutocomplete, { geoGeocode, getLatLng } from "use-places-autocomplete"
import {
  Combobox, ComboboxInput, ComboboxPopover,
  ComboboxList, ComboboxOption
} from "@reach/combobox"
import "@reach/combobox/styles.css";

function AutoComplete({ setSelected, loc }) {
  console.log(loc)
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions } = usePlacesAutocomplete()
  
   const handleSelect = async(address) => {
    setValue(address, false);
    clearSuggestions()

    const results = await geoGeocode({ address })
    const { lat, lng } = getLatLng(results[0])
    setSelected({lat, lng})
  }

  return (
    <div>
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
          placeholder="Search an address"
          className="combobox-input"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && 
              data.map((place_id, description) => {
              <ComboboxOption key={place_id} value={description} />
            })}
          </ComboboxList>
        </ComboboxPopover> 
      </Combobox>
      </div>
  )
}

export default AutoComplete