<template>
  <v-container fluid>
    <v-card prepend-icon="mdi-book-open-page-variant">
      <template #title>
        IO page
        <v-card-subtitle>Web socket connection</v-card-subtitle>
      </template>
      <v-divider />
      <v-card-text> Some test content </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
/* imports */
const ctx = useNuxtApp();
console.log(ctx);
// const socket = this.$nuxtSocket({ channel: "/index" });
/* middleware */
definePageMeta({ middleware: "auth" });
/* data */
/* computed */
/* methods */
/* hooks */
onMounted(async () => {
  // socket.on("someEvent", (msg, cb) => {
  //   console.log(msg);
  // });
});
</script>

<!--<template>-->
<!--  <v-row>-->
<!--    <v-col cols="12">-->
<!--      <v-card>-->
<!--        <v-card-title>-->
<!--          IO page-->
<!--          <v-spacer />-->
<!--          <v-tooltip bottom :color="connected ? 'green' : 'danger'">-->
<!--            <template #activator="{ on, attrs }">-->
<!--              <v-icon-->
<!--                :color="connected ? 'green' : 'danger'"-->
<!--                v-bind="attrs"-->
<!--                v-on="on"-->
<!--                >mdi-circle-medium-->
<!--              </v-icon>-->
<!--            </template>-->
<!--            <span>WS connect</span>-->
<!--          </v-tooltip>-->
<!--        </v-card-title>-->
<!--        <v-card-subtitle>Example of IO page</v-card-subtitle>-->
<!--        <v-card-text>-->
<!--          <v-btn color="primary" @click="sendMessage">Send message</v-btn>-->
<!--        </v-card-text>-->
<!--      </v-card>-->
<!--    </v-col>-->
<!--  </v-row>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "IO",-->
<!--  data() {-->
<!--    return {-->
<!--      connected: false,-->
<!--      socket: this.$nuxtSocket({ timeout: 5000 }),-->
<!--    };-->
<!--  },-->
<!--  beforeMount() {-->
<!--    this.socket.on("hello", (message, cb) => {-->
<!--      if (message.status === "connected") {-->
<!--        this.connected = true;-->
<!--      }-->
<!--    });-->
<!--    this.socket.on("tick", (tickId) => {-->
<!--      console.log("tickId");-->
<!--      console.log(tickId);-->
<!--    });-->
<!--  },-->
<!--  beforeUnmount() {-->
<!--    // this.socket.emit('disconnect');-->
<!--  },-->
<!--  methods: {-->
<!--    sendMessage() {-->
<!--      console.log("Button pressed");-->
<!--      console.log(this.socket);-->
<!--      this.socket.emit("test_message", "LALA MSG");-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
