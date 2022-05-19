import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";

const LocationSearchInput = ({ setLocation }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});
  const [error, setError] = useState();

  const { ref } = usePlacesWidget({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    onPlaceSelected: async (place) => {
      setError(null);
      setLoading(true);
      await place;
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
      setLocation(ref.current.value);
    } else {
      setError("There was an error");
      setLoading(false);
    }
    console.log(result);
  }, [result, ref]);

  return (
    <>
      <input
        type="text"
        ref={ref}
        className="form-control w-100"
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
