<template>
    <div id="main">
        <div id="logoContainer">
            <HeaderLogo></HeaderLogo>
        </div>
        <div id="back">
            <button id="backButton" @click="back">Back</button>
        </div>
        <div id="selectStation">
            <h2>Select Destination</h2>
            <select @change="onChange($event)">
                <option v-for="(value, key) in $store.getters.getGoStations" :key="key" :value="key">{{ value.name }}
                </option>
            </select>
            <select v-if="selectedStation != null" ref="selectedTime">
                <option v-for="(value, index) in $store.getters.getGoStationTimes(selectedStation.id)" :key="index"
                    :value="index">{{ value }}</option>
            </select>
        </div>
        <div id="mapContainer">
            <Map :addresses="addresses" :destination="[this.selectedStation.lat, this.selectedStation.lng]" :hideCar="true"></Map>
        </div>
        <div id="receipt">
            <div class="receiptItem">
                <div class="receiptTitle">Deposit</div>
                <div class="divider"></div>
                <div class="receiptPrice">$5.00</div>
            </div>
            <div class="receiptItem">
                <div class="receiptTitle">Tax</div>
                <div class="divider"></div>
                <div class="receiptPrice">$1.00</div>
            </div>
            <div class="receiptItem">
                <div class="receiptTitle"><b>Total</b></div>
                <div class="divider"></div>
                <div class="receiptPrice"><b>$6.00</b></div>
            </div>
        </div>
        <div id="purchase">
            <button id="purchaseButton" @click="purchase">Authorize Purchase</button>
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
    mounted() {
        this.selectedStation = this.$store.getters.getGoStations[0];
    },
    data() {
        return {
            //addresses: ["12 Jay St, Brampton, Ontario", "144 Wexford Rd, Brampton, Ontario", "137 Richvale Dr S, Brampton, Ontario"],
            addresses: ["4446 Castlemore Rd, Brampton, Ontario"],
            selectedStation: null,
        }
    },
    methods: {
        back() {
            this.$router.push("/");
        },
        purchase() {
            this.$router.push("/");
            let times = this.$store.getters.getGoStationTimes(this.selectedStation.id);
            this.$store.commit("addUpcomingRide", { name: this.selectedStation.name, time: times[this.$refs.selectedTime.value] });
            console.log(this.$store.getters.getUpcomingRides);
        },
        onChange(event) {
            this.selectedStation = this.$store.getters.getGoStations[event.target.value];
        }
    }
}
</script>

<style scoped>
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

#purchaseButton {
    margin-top: 2em;
    width: 420px;
    height: 50px;
    font-size: 24px;
    border-radius: 20px;
    border: none;
    color: whitesmoke;
    background-color: #3ab346;
    transition: all 140ms;
    cursor: pointer;
}

#purchaseButton:hover {
    background-color: #249D30;
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

