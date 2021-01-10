<template>
  <div>
    <Timeline :events="eventsFiltered" />
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
    <div id="messageWrapper" v-show="eventsFiltered.length == 0 && !loading">
      <div id="noEvents">
        <h3>No hay eventos que cumplan esas condiciones! :(</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Timeline } from "../components";
import { Filters } from "../models/Event";
import { filterEvents } from "../utils/utils";
import { Component, Vue } from "vue-property-decorator";
import { mockedEvents } from "../mock/Event";
import { Event } from "../models/Event";
import EventBus from "../utils/eventbus";
import axios from "axios";

@Component({
  components: { Timeline: Timeline }
})
export default class Inicio extends Vue {
  events: Event[] = [];
  eventsFiltered: Event[] = [];
  loading = true;

  requestPilleadas() {
    axios
      .get("http://multicolorespillos.uy/api/pilleadas")
      .then(response => {
        this.events = response.data.pilleadas;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        setTimeout(() => this.requestPilleadas(), 10000);
      });
  }

  mounted() {
    if (process.env.NODE_ENV == "development") {
      this.loading = false;
      this.events = mockedEvents;
    } else {
      this.requestPilleadas();
    }
    EventBus.$on("APPLY_FILTER", this.filter);
    EventBus.$on("UNDO_FILTER", this.undoFilter);
    this.eventsFiltered = [...this.events];
  }

  filter(filters: Filters) {
    this.loading = true;
    this.eventsFiltered = [...this.events];
    this.eventsFiltered = filterEvents(this.eventsFiltered, filters);
    this.loading = false;
  }

  undoFilter() {
    this.eventsFiltered = [...this.events];
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
#messageWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
#noEvents {
  background-color: #777777;
  background-image: linear-gradient(
    90deg,
    #5ed3e2,
    #f47d77,
    #fdbd5f,
    #bd74ca,
    #8bc88f
  );
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
