const { GoogleMap, LoadScript } = require("../../");

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = {
  lat: 38.685,
  lng: -115.234,
};

const onLoad = (ref) => (searchBox = ref);

const onPlacesChanged = () => console.log(searchBox.getPlaces());

function getLocation() {
  if (navigator.geolocation) {
    const location = navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    const error = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;

  const lng = position.coords.longitude;
}

<GoogleMap
  id="searchbox-example"
  mapContainerStyle={mapContainerStyle}
  zoom={2.5}
  center={center}>
  <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
    <input
      type="text"
      placeholder="Customized your placeholder"
      style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        padding: `0 12px`,
        borderRadius: `3px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `14px`,
        outline: `none`,
        textOverflow: `ellipses`,
        position: "absolute",
        left: "50%",
        marginLeft: "-120px",
      }}
    />
  </StandaloneSearchBox>
</GoogleMap>;
