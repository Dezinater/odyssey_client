<template>
    <div id="main">
        <div id="logoContainer">
            <HeaderLogo></HeaderLogo>
        </div>
        <div id="selectStation">
            <select @change="onChange($event)">
                <option v-for="(value, key) in $store.getters.getGoStations" :key="key" :value="key">{{ value.name }}
                </option>
            </select>
            <select v-if="selectedStation != null">
                <option v-for="(value, index) in $store.getters.getGoStationTimes(selectedStation.id)" :key="index"
                    :value="index">{{ value }}</option>
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
    },
    mounted() {
        this.selectedStation = this.$store.getters.getGoStations[0];
    },
    data() {
        return {
            selectedStation: null,
        }
    },
    methods: {
        onChange(event) {
            this.selectedStation = this.$store.getters.getGoStations[event.target.value];
            console.log(this.selectedStation);
            console.log(this.$store.getters.getGoStationTimes('00005'))
        }
    }
}
</script>
