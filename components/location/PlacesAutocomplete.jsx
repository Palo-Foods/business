import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import { useEffect } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const PlacesAutocomplete = ({ setSelected, addressForInput, setLocation, location }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    if (location?.address) {
      setValue(location?.address || addressForInput, false)
    }
  }, [addressForInput, location, setValue])
  

 const handleSelect = async (val) => {

    setValue(val, false);

    clearSuggestions();

   const results = await getGeocode({ address: val });

   const data = getLatLng(results[0]);
   const final = results[0]?.address_components
  
   let finalData;
      if (final[3]) {
        if (final?.length >= 6) {
            final.pop()
            finalData = {
              district: final[3]?.long_name,
              region: final[4]?.long_name,
              town: final[2]?.long_name,
              address: results[0]?.formatted_address,
              geometry: { lat: loc?.lat, lng: loc?.lng }
            }
        } else {
          finalData = {
            district: final[2]?.long_name,
            region: final[3]?.long_name,
            town: final[1]?.long_name,
            address: results[0]?.formatted_address,
            geometry: { lat: loc?.lat, lng: loc?.lng }
          }
        }

        setSelected({ lat: data?.lat, lng: data?.lng });
        setLocation(finalData)
      }
  };

  return (
  <div>
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="form-control combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default PlacesAutocomplete