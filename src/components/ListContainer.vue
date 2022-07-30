<template>
    <div id="listContainer">
        <div class="title">
                     <h4>Upcoming Rides</h4>
        </div>
        <div id="list">
            <div class="listItem">
                <div class="itemInfo">
                    <h2>Bramalea GO Station</h2>
                    <p>Today at 5 PM</p>
                </div>
                <div class="action">
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderLogo',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#listContainer{
background-color: #249D30;
color: white;
margin:50px;
}

input{
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
     box-shadow: 0px 0px 5px rgba(66,66,66,.75);
     text-shadow: 0px 0px 5px rgba(66,66,66,.75);
}
 .css-input:focus {
     outline:none;
}
 .css-input:focus {
     outline:none;
}

</style>
