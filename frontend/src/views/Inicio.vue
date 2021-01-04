<template>
  <div>
    <Timeline :events="events" />
    <div id="loaders" v-if="loading">
      <v-progress-circular
        :size="60"
        :width="7"
        color="red"
        indeterminate
      ></v-progress-circular>

      <v-progress-circular
        :size="60"
        :width="7"
        color="orange"
        indeterminate
      ></v-progress-circular>

      <v-progress-circular
        :size="60"
        :width="7"
        color="cyan"
        indeterminate
      ></v-progress-circular>

      <v-progress-circular
        :size="60"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>

      <v-progress-circular
        :size="60"
        :width="7"
        color="green"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts">
import { Timeline } from "../components";
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: { Timeline: Timeline }
})
export default class Inicio extends Vue {
  events = [];
  loading = true;

  requestPilleadas() {
    axios
      .get("/api/pilleadas")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        setTimeout(() => this.requestPilleadas(), 10000);
      });
  }

  mounted() {
    this.requestPilleadas();
  }
}
</script>

<style>
#loaders {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 500px;
}
</style>
