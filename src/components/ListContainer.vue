<template>
    <div id="listContainer">
        <div class="title">
            <h2>{{ name }}</h2>
        </div>
        <div id="list">
            <div class="listItem" v-for="(value, index) in data" :key="index" :class="{upcomingRideItem: !isPreviousRide}" >
                <div class="itemInfo">
                    <h3>{{ value.name }}</h3>
                    <p>{{ value.time }}</p>
                </div>
                <div class="action" :class="{upcomingRideAction: !isPreviousRide, previousRideAction: isPreviousRide}" @click="openRide(index)">
                    <i class="material-icons">keyboard_arrow_right</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderLogo',
    props: ["name", "data", "isPreviousRide"],
    methods: {
        openRide(index) {
            console.log(this.isPreviousRide);
            this.$router.push({ name: 'View Ride', params: { rideIndex: index, isPreviousRide: this.isPreviousRide } })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    color:#333;
    padding: 0;
    margin: 0;
}

.title {
    text-align: left;
}

.listItem {
    display: flex;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 1em 1em;
}

.upcomingRideItem {
    border: 1px solid #aaf0b1 !important;
}

.itemInfo {
    flex: 1;
    text-align: left;
    margin-left: 1em;
    margin-top: 1em;
}

.action {
    width: 5em;
    color: white;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    transition: all 140ms;
    display: flex;
    justify-content: center;
    align-items: center;
}



.upcomingRideAction {
    background-color: #3ab346;
}
.upcomingRideAction:hover {
    background-color: #148f20;
}

.previousRideAction {
    background-color: #75d87f;
}
.previousRideAction:hover {
    background-color: #60bd69;
}

#listContainer {
    margin-top: 2em;
    margin-bottom: 3em;
}

input {
    margin-top: 15px;
    width: 150px;
}

.css-input {
    padding: 5px;
    font-size: 20px;
    border-width: 2px;
    border-color: #CCCCCC;
    background-color: #FFFFFF;
    color: #000000;
    border-style: solid;
    border-radius: 14px;
    box-shadow: 0px 0px 5px rgba(66, 66, 66, .75);
    text-shadow: 0px 0px 5px rgba(66, 66, 66, .75);
}

.css-input:focus {
    outline: none;
}

.css-input:focus {
    outline: none;
}
</style>
