import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";

const LocationSearchInput = ({ setLocation, location, classes }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});
  const [error, setError] = useState();

  const { ref } = usePlacesWidget({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    onPlaceSelected: async (place) => {
      setError(null);
      setLoading(true);
      setResult(place);
      setLoading(false);
    },
    options: {
      types: ["establishment"],
      componentRestrictions: { country: "gh" },
    },
  });

  useEffect(() => {
    if (ref) {
      if (result?.address_components) {
        setLocation({
          coordinates: {
            lat: result?.geometry?.location?.lat(),
            lng: result?.geometry?.location?.lng(),
          },
          address: ref.current.value,
          town: result?.address_components[1].long_name,
          municipality: result?.address_components[2].long_name,
          region: result?.address_components[3].long_name,
        });
      }
    } else {
      setError("There was an error");
      setLoading(false);
    }
  }, [result, ref]);

  useEffect(() => {
    //set existing location
    if (location && !result?.address_components) {
      ref.current.value = location?.address;
    }
  }, [location]);

  return (
    <>
      <input
        type="text"
        ref={ref}
        className={`form-control w-100 ${classes}`}
        placeholder="Store location"
      />
      {loading && (
        <p>
          <small>loading...</small>
        </p>
      )}
      {error && (
        <p>
          <small>There was an error</small>
        </p>
      )}
    </>
  );
};

export default LocationSearchInput;
