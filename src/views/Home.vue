<template>
    <div id="main">
        <div id="logoContainer">
            <HeaderLogo></HeaderLogo>
        </div>
        <div id="findRide">
        </div>
        <div id="mapContainer">
        </div>
        <div id="myRides">
        </div>
        <div id="previousRides">
        </div>
    </div>
</template>

<script>
import HeaderLogo from '../components/HeaderLogo.vue';
// @ is an alias to /src

export default {
    name: 'Home',
    components: {
    HeaderLogo
}
}
</script>
