import Geocode from "react-geocode";
import "@reach/combobox/styles.css";
import Spinner from "../ui/Spinner";
import Map from "../location/Map";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)

export default function Places({location, setLocation, type, isLoaded, loadError}) {
  if (loadError) {
    return <div>Check your internet connection.</div>
  }

  if (!isLoaded) return <div className="d-flex justify-content-center"><Spinner /></div>;
  return(
    <Map location={location} setLocation={setLocation} type={type} />
  )
}



