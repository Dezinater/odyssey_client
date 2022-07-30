<template>
    <div id="main">
        <div id="logoContainer">
            <HeaderLogo></HeaderLogo>
        </div>

        <div id="rideInfo">
            <h3>Bramalea Go Station</h3>
            <h5>Today at 5 PM</h5>
        </div>

        <span>Back</span>

        <div id="mapContainer">
        </div>

        <button v-if="!isPreviousRide">Cancel Ride</button>
    </div>
</template>

<script>
import HeaderLogo from '../components/HeaderLogo.vue';

export default {
    name: 'ViewRide',
    components: {
        HeaderLogo,
    },
    props: ["isPreviousRide"],
}
</script>
