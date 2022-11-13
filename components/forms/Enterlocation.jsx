import React, { useEffect, useState } from 'react'
import { MdLocationPin, MdSearch } from 'react-icons/md'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Spinner from '../ui/Spinner'
import Places from '../../components/location/Places'
import { useLoadScript } from '@react-google-maps/api'

const Locations = dynamic(() => import('../../components/location/MapPlacesModal'), {
  suspense: true,
})

function EnterLocation({location, setLocation}) {
  //load map and location data
  const { isLoaded, loadError  } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [type, setType] = useState("")

  return (
    <>
                <div className="mt-3 row">
                      <div className="mb-3 mb-md-0">
                        <div className="mb-2 mb-md-3 position-relative">
                          <div className="input-group my-3" onClick={() => setType("Destination")} data-bs-toggle={!loadError && `dropdown`} data-bs-auto-close="true">
                            <span className="input-group-text bg-white px-2" id="basic-addon1"><MdLocationPin size={20} /></span>
                              <input type="text" value={location?.address} className="form-control bg-white ps-0 border-start-0" name="destination" id="destination"
                              aria-describedby="helpId" placeholder="Enter location" autoComplete="false" disabled={loadError}
                              />
                          </div>
                          <Places type={type} locations={[]} setLocation={setLocation} />
                        </div>
                    </div>
                    </div>
                    
                    {type && <Suspense fallback={<Spinner />}>
                      <Locations type={type} setLocation={setLocation} location={location} isLoaded={isLoaded} loadError={loadError} />
                    </Suspense>}
    </>
  )
}

export default EnterLocation