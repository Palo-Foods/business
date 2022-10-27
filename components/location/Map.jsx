import { useEffect, useMemo, useState } from "react";
import place from "../../functions/locations";
import Geocode from "react-geocode";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { MdClose } from "react-icons/md";
import { GoogleMap, Marker } from "@react-google-maps/api";

export default function Map({ location, setLocation, type }) {
  const [addressForInput, setAddressForInput] = useState("")
  const center = useMemo(() => ({ lat: location?.geometry?.lat || 5.5912087, lng: location?.geometry?.lng || -0.1797294 }), [location]);
  
  const [selected, setSelected] = useState(center);

  useEffect(() => {
    const data = place.getCurrentLocation()
    console.log(data)
  }, [])
  

  const handledragEnd = async(e) => {
    console.log(e)
    const latlng = e.latLng
    const loc = {
      lat: latlng?.lat(),
      lng: latlng?.lng(),
    }
    if(loc?.lat){
      setSelected(loc)
      const response = await Geocode.fromLatLng(loc?.lat, loc?.lng)
      const results = response?.results[0]
      const final = results?.address_components

      if (final[3]) {
        if(final?.length === 5) final.pop()
        const finalData = {
          district: final[2]?.long_name,
          region: final[3]?.long_name,
          town: final[1]?.long_name,
          address: results?.formatted_address,
          geometry: { lat: loc?.lat, lng: loc?.lng }
        }
        console.log(final, finalData)
        //finalData?.address && place.setLocation(finalData)

        setAddressForInput(results?.formatted_address)
        setLocation(finalData)
      } 
    }
  }

  return (
    <>
      <div className="modal fade" id="location" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex align-items-start">
                          <div className="w-100">
                            <h5 className="modal-title text-dark mb-2">{type} location</h5>
                            <PlacesAutocomplete setSelected={setSelected} addressForInput={addressForInput} setLocation={setLocation} location={location} />
                          </div>
                          <button type="button" className="close btn rounded-circle ms-3 p-0" data-bs-dismiss="modal" aria-label="Close" style={{marginRight: "-10"}}>
                              <MdClose size={30} />
                          </button>
                        </div>
                        <div className="modal-body">
                            <GoogleMap
                              zoom={selected ? 15 : 10}
                              center={selected || location?.geometry}
                              mapContainerClassName="map-container"
                            >
                              {selected && <Marker position={selected || location?.geometry} onDragEnd={handledragEnd} draggable={true} />}
                            </GoogleMap>
                        </div>
                    <div className="modal-footer">
                      <div className="w-100">
                        <button className="btn btn-primary w-100" disabled={!location?.address} data-bs-dismiss="modal">Select {type} location</button>
                      </div>
                      </div>
                    </div>
                </div>
    </div>
    </>
  );
}