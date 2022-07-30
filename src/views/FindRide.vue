<template>
    <div id="main">
        <div id="logoContainer">
            <HeaderLogo></HeaderLogo>
        </div>
        <div id="selectStation">
            <select>
                <option v-for="(key, value) in $store.getters.getGoStations" value="volvo">Volvo</option>
            </select>
        </div>
    </div>
</template>

<script>
import HeaderLogo from '../components/HeaderLogo.vue';

export default {
    name: 'FindRide',
    components: {
        HeaderLogo,
    }
}
</script>
