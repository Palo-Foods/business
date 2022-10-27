import axios from "axios"

const place = {
    getLocationData(payload) {
        const session = localStorage.getItem(payload)
        if (session !== "undefined") {
         return JSON.parse(session)
        } else {
         return []
        }
    },

    getLocations() {
        const session = localStorage.getItem("locations")
        if (session !== "undefined") {
            const data = JSON.parse(session)
         return data
        } else {
         return []
        }
    },

    setLocation(key, payload) {
        localStorage.setItem(key, JSON.stringify(payload))
    },

    setLocations(key, payload) {
        const loc = this.getLocations() || []
        loc?.push(payload)
        let locations = [...new Set(loc)];
        loc?.length > 0 && localStorage.setItem(key, JSON.stringify(locations))
    },

    async getDistance(origin, destination) {
        const config = { origin, destination }
        console.log(config)

        const {data} = await axios.post("/api/services/maps/getDistance", config)
        return data
    },

    calculatePrices(region, data) {
        console.log(region, data?.distance?.value)
        const dist = data?.distance?.value / 1000
        let total;
        

        switch (region) {
            case "Western Region":
                total = dist * 1.5
                return total + 3
            
             case "Eastern Region":
                total = dist * 1.2
                return total + 3
        
            default:
                break;
        }
    },

    getCurrentLocation() {
        const successCallback = (position) => {
        return position?.GeoLocationPosition?.coords
        };

        const errorCallback = (error) => {
        return error
        };

        const data = navigator.geolocation.getCurrentPosition(successCallback, errorCallback); 
        return data?.GeoLocationPosition?.coords
    }

}

export default place