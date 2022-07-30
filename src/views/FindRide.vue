<template>
    <div id="main">
        <div id="logoContainer">
            <HeaderLogo></HeaderLogo>
        </div>
        <div id="selectStation">
            <select>
                <option v-for="(value, key) in $store.getters.getGoStations" :key="key" :value="key">{{value.name}}</option>
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
