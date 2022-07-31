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


        var goStation = [43.686836, -79.764626]
        L.marker(goStation).addTo(this.map)
            .bindPopup('Go Station')
            .openPopup();

        let address = ["21 Horne Dr, Brampton, Ontario", "16 Linkdale Rd, Brampton", "97 Kingswood Dr, Brampton"];
        let addressPromises = [];
        address.forEach(x => addressPromises.push(this.getLatLong(x)));

        let waypoints = "";
        Promise.all(addressPromises).then(x => {
            x.forEach(coord => {
                coord = [coord[1], coord[0]];
                L.marker(coord).addTo(this.map);
                waypoints += coord[0] + "," + coord[1] + "|";
            });

            waypoints += goStation[0] + "," + goStation[1];
            let url = "https://api.geoapify.com/v1/routing?waypoints=" + waypoints + "&mode=drive&apiKey=" + this.myAPIKey;
            fetch(url).then(response => response.json()).then(data => {
                //console.log(data.features[0].geometry.coordinates);
                //let routes = data.features[0].geometry.coordinates;
                let fixedRoutes = [];
                for (let i = 0; i < data.features[0].geometry.coordinates.length; i++) {
                    let tempFix = [];
                    data.features[0].geometry.coordinates[i].forEach(coord => {
                        let newCoord = [coord[1], coord[0]];
                        tempFix.push(newCoord);
                    });
                    fixedRoutes.push(tempFix);
                }

                console.log(fixedRoutes);
                fixedRoutes.forEach(route => {
                    L.polyline(route, {
                        color: 'red',
                        weight: 5,
                        opacity: 0.5,
                        smoothFactor: 1
                    }).addTo(this.map);
                });

                let myIcon = L.icon({
                    iconUrl: 'car_icon.png',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                    popupAnchor: [-3, -76],
                });

                var car = L.marker(fixedRoutes[0][0], {
                    icon: myIcon
                }).addTo(this.map);

                let routeIndex = 0;
                let routeNumber = 0;
                setInterval(() => {
                    if (routeNumber > fixedRoutes.length - 1) {
                        return;
                    }

                    if (routeIndex > fixedRoutes[routeNumber].length - 1) {
                        routeIndex = 0;
                        routeNumber++;
                    }

                    //if (routeNumber < fixedRoutes.length - 1) {
                    //    return;
                    //}
                    //console.log(this.getDistance(fixedRoutes[routeNumber][routeIndex], fixedRoutes[routeNumber][routeIndex + 1]));
                    console.log(fixedRoutes[routeNumber][routeIndex], fixedRoutes[routeNumber][routeIndex + 1]);
                    car.setLatLng(fixedRoutes[routeNumber][routeIndex]);
                    routeIndex++;
                }, 1000);
                //car.setLatLng(fixedRoutes[0][route]);
            });
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
        getDistance(firstPoint, secondPoint) {
            if (secondPoint == undefined) {
                return 0;
            }
            return Math.sqrt((firstPoint[1] - secondPoint[1]) ** 2 + (firstPoint[1] - secondPoint[1]) ** 2);
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
