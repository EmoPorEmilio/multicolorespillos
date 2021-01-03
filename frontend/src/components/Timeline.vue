<template>
  <v-timeline id="timeline" dense>
    <v-timeline-item color="red lighten-1" small>
      <v-chip class="chip" color="red lighten-1" label text-color="white">
        <v-icon left>
          mdi-calendar
        </v-icon>
        01/07/2020
      </v-chip>
      <v-card>
        <v-card-title class="red lighten-1">
          <h4 class="white--text font-weight-light">
            Talvi renuncia a su cargo
          </h4>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" class="text-body-2">
              El enano ronco renunció a los meses de prometer que iba a
              revolucionar la educación del país. "No era lo de él". Un sorete
              bárbaro.
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Event } from "../models/Event";

@Component({
  components: {}
})
export default class Timeline extends Vue {
  @Prop() events!: Event[];
}
</script>

<style scoped>
#timeline {
  margin-top: 80px;
  margin-left: 0px;
  width: calc(100% - 30px);
}
.chip {
  margin-bottom: 3px;
}
</style>
