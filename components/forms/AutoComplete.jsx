import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import SmallSpinner from "../ui/Spinner";

const PlaceAutoComplete = ({ setLocation }) => {
  const [loading, setLoading] = useState("");
  const [result, setResult] = useState({});
  const [error, setError] = useState("");
   const [loc, setLoc] = useState("");

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: async (place) => {
      setLoading(true);
      setResult(place);
      setLoading(false);
    },
    options: {
      types: [],
      componentRestrictions: { country: "gh" },
    },
  });

  useEffect(() => {
    if (ref.current.value?.length > 6) {
      setLoading(true);
      if (result) {
        console.log(result)
        setLoading(false);
        setLocation({
          loc: ref.current.value,
          info: result?.address_components,
        });
        setLoc(ref);
        if (loc.length >= 4) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 10000);
        }
      } else {
        setLoading(false); //location not found
        setError("Location not found");
      }
    }
  }, [result, ref]);

  return (
    <>
      <input
        type="text"
        ref={ref}
        className="form-control w-100 mb-3"
        placeholder="Location"
      />
      <small>
        {loading && !error && <SmallSpinner />}
        {error ? "Location not found" : ""}
      </small>
    </>
  );
};

export default PlaceAutoComplete;