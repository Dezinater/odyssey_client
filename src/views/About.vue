<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  methods: {
    testReceive(data) {
      console.log(data);
    },
  },
  created() {
    let networkClient = this.$store.getters.getNetworkClient;

    let testPacket = {
      type: "test",
      testValue: "0",
    };

    networkClient.send(testPacket);
    networkClient.addEvent("onTestMessage", this.testReceive);
  },
  destroyed() {
    let networkClient = this.$store.getters.getNetworkClient;
    networkClient.removeEvent("onTestMessage", this.testReceive);
  },
}
</script>