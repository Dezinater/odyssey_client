<template>
    <div id="main">
        <div id="logoContainer">
            <HeaderLogo></HeaderLogo>
        </div>
        <div id="findRide">
            <router-link to="/findRide" ><button class="bn632-hover bn22">Find Ride</button></router-link>
        </div>
        <div id="mapContainer">
            <Map v-if="$store.getters.getUpcomingRides.length > 0"></Map>
        </div>
        <div id="myRides">
            <ListContainer name="Upcoming Rides" :data="$store.getters.getUpcomingRides"></ListContainer>
        </div>
        <div id="previousRides">
            <ListContainer :isPreviousRide="true" name="Previous Rides" :data="$store.getters.getPreviousRides"></ListContainer>
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

<style scoped>
.bn632-hover {

  width: 160px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 55px;
  text-align:center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.bn632-hover:hover {
  background-position: 100% 0;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.bn632-hover:focus {
  outline: none;
}

.bn632-hover.bn22 {
  background-image: linear-gradient(
    to right,
    #0ba360,
    #3cba92,
    #30dd8a,
    #2bb673
  );
  box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
</style>


