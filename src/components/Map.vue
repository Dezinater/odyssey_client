<template>
    <div>
        <div id="my-map" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
    name: 'Map',
    data() {
        return {
            map: null,
            markers: [],
            infoWindow: null,
            selectedStation: null,
            baseUrl: "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}",
            retinaUrl: "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}",
            geoCodeApi: "https://api.geoapify.com/v1/geocode/search?apiKey={apiKey}",
            myAPIKey: "4c2a5a2250d3448181ee281694b174ba",
        }
    },
    mounted() {
        this.map = L.map('my-map').setView([43.686836, -79.764626], 14);

        // The API Key provided is restricted to JSFiddle website
        // Get your own API Key on https://myprojects.geoapify.com

        // Retina displays require different mat tiles quality
        var isRetina = L.Browser.retina;

        L.tileLayer(isRetina ? this.retinaUrl : this.baseUrl, {
            attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors',
            apiKey: this.myAPIKey,
            maxZoom: 20,
            id: 'osm-bright',
        }).addTo(this.map);

        this.getLatLong("21 Horne Dr, Brampton, Ontario").then(x => {
            console.log(x);
        });
    },
    methods: {
        getLatLong(address) {
            var url = this.geoCodeApi.replace("{apiKey}", this.myAPIKey) + "&text=" + address;
            return fetch(url).then(response => response.json()).then(data => data.features[0].geometry.coordinates);
            //$.getJSON(url, function (data) {
              //  latlon.push(data.features[0].geometry.coordinates);
            //});
        },

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
