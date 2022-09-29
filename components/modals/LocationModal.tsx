import dynamic from 'next/dynamic'
import React from 'react'
import { Suspense } from 'react'
const PlaceAutoComplete = dynamic(() => import('../forms/AutoComplete'), {
  suspense: true,
})


function LocationModal() {
  return (
    <div className="modal fade" id="locationModal" tab-index="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Location search</h5>
              <button type="button" className="close btn rounded-pill btn-primary" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div className="modal-body">
            <Suspense fallback={`Loading...`}>
              </Suspense>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationModal