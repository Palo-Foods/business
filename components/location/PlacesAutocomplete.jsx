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
  
   if (final) {
     if(final?.length === 5) final.pop()
     const finalData = {
       region: final[3]?.long_name,
       district: final[2]?.long_name,
       town: final[1]?.long_name,
       address: val,
       geometry: { lat: data?.lat, lng: data?.lng }
     }

     console.log(results, final, finalData)

    //finalData?.address && place.setLocation(finalData)

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