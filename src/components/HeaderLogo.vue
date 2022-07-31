<template>
    <div class="logo">
        <span class="go">GO</span> <span>Pool</span>
    </div>
</template>

<script>
export default {
    name: 'HeaderLogo',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
    font-size: 50px;
    font-weight:300px ;
    color: #7DCE13;
    padding-top:0.3em;
    padding-bottom:0.8em;
}
.go {
    background-color: #7DCE13;
    color:#f6f6f6;
    padding:0 5px;
    border-radius: 7px;
}
</style>
