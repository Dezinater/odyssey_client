<template>
    <div id="main">
        <div id="logoContainer">
            <HeaderLogo></HeaderLogo>
        </div>
        <div id="findRide">
            <router-link to="/findRide"><button>Find Ride</button></router-link>
        </div>
        <div id="mapContainer">
            <Map></Map>
        </div>
        <div id="myRides">
            <ListContainer></ListContainer>
        </div>
        <div id="previousRides">
            <ListContainer></ListContainer>
        </div>
    </div>
</template>

<script>
import HeaderLogo from '../components/HeaderLogo.vue';
import ListContainer from '../components/ListContainer.vue';
import Map from '../components/Map.vue';
// @ is an alias to /src

export default {
    name: 'Home',
    components: {
    HeaderLogo,
    ListContainer,
    Map
}
}
</script>
