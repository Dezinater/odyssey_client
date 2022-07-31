<template>
    <div>
        <div id="my-map"></div>
    </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
    name: 'Map',
    props: ["hideCar", "addresses", "destination"],
    data() {
        return {
            routeLines: [],
            mapIcon:null,
            updateTimer: null,
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
    destroyed() {
        clearInterval(this.updateTimer);
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
        this.mapMarker = L.marker(goStation).addTo(this.map)
            .bindPopup('Go Station')
            .openPopup();

        let address = ["16 Linkdale Rd, Brampton", "21 Horne Dr, Brampton, Ontario",  "97 Kingswood Dr, Brampton"];
        if (this.addresses != undefined) { //if the prop is set then overwrite the example
            address = this.addresses;
        }
        let addressPromises = [];
        address.forEach(x => addressPromises.push(this.getLatLong(x)));

        Promise.all(addressPromises).then(x => {
            x.forEach(coord => {
                coord = [coord[1], coord[0]];
                L.marker(coord).addTo(this.map);
            });
            x = x.map(coord => [coord[1], coord[0]]);

            x.push([goStation[0], goStation[1]]);
            this.loadRoutes(x).then(loadedRoute => {
                this.drawRoutes(loadedRoute);
                if(this.hideCar !== true) {
                    this.startCar(loadedRoute);
                }
            });

        });

    },
    watch: {
    // whenever question changes, this function will run
    destination(newVal) {
        console.log(newVal);
        this.mapMarker.remove();
        this.mapMarker = L.marker(newVal).addTo(this.map)
            .bindPopup('Go Station')
            .openPopup();

        let goStation = newVal;
        let address = ["16 Linkdale Rd, Brampton", "21 Horne Dr, Brampton, Ontario",  "97 Kingswood Dr, Brampton"];
        if (this.addresses != undefined) { //if the prop is set then overwrite the example
            address = this.addresses;
        }
        let addressPromises = [];
        address.forEach(x => addressPromises.push(this.getLatLong(x)));

        Promise.all(addressPromises).then(x => {
            x.forEach(coord => {
                coord = [coord[1], coord[0]];
                L.marker(coord).addTo(this.map);
            });
            x = x.map(coord => [coord[1], coord[0]]);

            x.push([goStation[0], goStation[1]]);
            this.loadRoutes(x).then(loadedRoute => {
                this.drawRoutes(loadedRoute);
                if(this.hideCar !== true) {
                    this.startCar(loadedRoute);
                }
            });
        });
    }
  },
    methods: {
        loadRoutes(waypoints) {
            let waypointsString = "";
            waypoints.forEach(coord => {
                waypointsString += coord[0] + "," + coord[1] + "|";
            });
            waypointsString = waypointsString.substring(0, waypointsString.length - 1)
            let url = "https://api.geoapify.com/v1/routing?waypoints=" + waypointsString + "&mode=drive&apiKey=" + this.myAPIKey;
            return fetch(url).then(response => response.json()).then(data => {
                let fixedRoutes = [];
                for (let i = 0; i < data.features[0].geometry.coordinates.length; i++) {
                    let tempFix = [];
                    data.features[0].geometry.coordinates[i].forEach(coord => {
                        let newCoord = [coord[1], coord[0]];
                        tempFix.push(newCoord);
                    });
                    fixedRoutes.push(tempFix);
                }

                return fixedRoutes;
            });
        },
        startCar(loadedRoute) {
            let myIcon = L.icon({
                iconUrl: 'car_icon.png',
                iconSize: [22, 20],
                iconAnchor: [10, 10],
                popupAnchor: [-3, -76],
            });

            var car = L.marker(loadedRoute[0][0], {
                icon: myIcon
            }).addTo(this.map);

            let routeIndex = 0;
            let routeNumber = 0;
            this.updateTimer = setInterval(() => {
                if (routeNumber > loadedRoute.length - 1) {
                    return;
                }

                if (routeIndex > loadedRoute[routeNumber].length - 1) {
                    routeIndex = 0;
                    routeNumber++;
                }

                car.setLatLng(loadedRoute[routeNumber][routeIndex]);
                routeIndex++;
            }, 750);
        },
        drawRoutes(routes) {
            this.routeLines.forEach(x => x.remove());

            routes.forEach(route => {
                let polygon = L.polyline(route, {
                    color: 'red',
                    weight: 5,
                    opacity: 0.5,
                    smoothFactor: 1
                }).addTo(this.map);
                this.routeLines.push(polygon);
            });
        },
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
#my-map {
    width: 100%;
    height: 420px;
    border: 1px solid #ccc;
    border-radius: 10px;
}
</style>
