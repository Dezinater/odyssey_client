<template>
    <div id="listContainer">
        <div class="title">
            <h2>{{ name }}</h2>
        </div>
        <div id="list">
            <div class="listItem" v-for="(value, index) in data" :key="index">
                <div class="itemInfo">
                    <h3>{{ value.name }}</h3>
                    <p>{{ value.time }}</p>
                </div>
                <div class="action" @click="openRide(index, false)">
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderLogo',
    props: ["name", "data"],
    methods: {
        openRide(index, isPreviousRide) {
            this.$router.push({ name: 'View Ride', params: { rideIndex:index, isPreviousRide } })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
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
    background-color: #3ab346;
    transition: all 140ms;
    display: flex;
    justify-content: center;
    align-items: center;
}

.action:hover {
    background-color: #249D30;
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
