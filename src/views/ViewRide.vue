<template>
    <div id="main">
        <div id="logoContainer">
            <HeaderLogo></HeaderLogo>
        </div>
        <div id="back">
            <button id="backButton" @click="back">Back</button>
        </div>
        <div id="stationInfo">
            <h1 v-if="!isPreviousRide">{{ $store.getters.getUpcomingRides[rideIndex].name }}</h1>
            <h1 v-if="isPreviousRide">{{ $store.getters.getPreviousRides[rideIndex].name }}</h1>

            <h3 v-if="!isPreviousRide">{{ $store.getters.getUpcomingRides[rideIndex].time }}</h3>
            <h3 v-if="isPreviousRide">{{ $store.getters.getPreviousRides[rideIndex].time }}</h3>
        </div>
        <div id="mapContainer">
            <Map :addresses="addresses" :hideCar="true"></Map>
        </div>

        <div id="cancel" v-if="!isPreviousRide">
            <button id="cancelButton" @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import HeaderLogo from '../components/HeaderLogo.vue';
import Map from '../components/Map.vue';

export default {
    name: 'FindRide',
    components: {
        HeaderLogo,
        Map,
    },
    props: ["isPreviousRide", "rideIndex"],
    data() {
        return {
            addresses: ["4446 Castlemore Rd, Brampton, Ontario"],
        }
    },
    methods: {
        back() {
            this.$router.push("/");
        },
        cancel() {
            this.$router.push("/");
            //let times = this.$store.getters.getGoStationTimes(this.selectedStation.id);
            this.$store.commit("removeUpcomingRide", this.rideIndex);
            console.log(this.$store.getters.getUpcomingRides);
        },
    }
}
</script>

<style scoped>
h1 {
    margin:0;
    padding:0;
}

#stationInfo {
    text-align: center;
}
#main {
    position: relative;
}

#back {
    position: absolute;
    display: flex;
    margin-bottom: 3em;
    top: 20px;
}

#backButton {
    background: white;
    color: #249D30;
    border: 1px solid #3ab346;
    font-size: 16px;
    width: 128px;
    height: 32px;
    border-radius: 15px;
    transition: all 200ms;
    cursor: pointer;
}

#backButton:hover {
    background-color: #3ab346;
    color: white;
    border: 1px solid #309c3b;
}

#cancelButton {
    margin-top: 2em;
    width: 420px;
    height: 50px;
    font-size: 24px;
    border-radius: 20px;
    border: none;
    color: #b33756;
    border: 1px solid #b33756;
    transition: all 140ms;
    cursor: pointer;
}

#cancelButton:hover {
    background-color: #c41642;
    color: white;
}

h2 {
    text-align: left;
    padding: 0;
    margin: 0 2em;
}

select {
    padding: 0.6em;
    font-size: 16px;
    margin-top: 1em;
}

#selectStation {
    padding: 1em 1em;
}

#receipt {
    padding-top: 1.6em;
    font-size: 20px;
    width: 300px;
    margin: auto auto;
}

.receiptItem {
    display: flex;
    margin: 0.6em;
}

.divider {
    flex: 1;
    margin: 0 0.6em;
}
</style>

