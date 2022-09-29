import React, { useMemo, useState } from 'react'
import Spinner from "./ui/Spinner"
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

function MapAutoComplete() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  });

  !isLoaded && <Spinner />

  return (
    <Map  />
  )
}

const Map = () => {
    const center = useMemo(() => ({ lat: 44, lng: -80}), [])
    const [selected, setSelected] = useState("")
    return (
        <>
            <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
                {selected && <Marker position={selected} />}
            </GoogleMap>
        </>
    )
}


export default MapAutoComplete