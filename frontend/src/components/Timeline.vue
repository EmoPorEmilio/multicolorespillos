<template>
  <v-timeline id="timeline" dense>
    <v-timeline-item
      v-for="event in events"
      :key="event.id"
      :color="getColorByPartido(event.partido)"
      small
    >
      <v-chip
        class="chip"
        :color="getColorByPartido(event.partido)"
        label
        text-color="white"
      >
        <v-icon left>
          mdi-calendar
        </v-icon>
        {{ event.date }}
      </v-chip>
      <v-card>
        <v-card-title
          :class="getColorByPartido(event.partido)"
          style="padding: 14px"
        >
          <h4 class="white--text font-weight-light">
            {{ event.title }}
          </h4>
        </v-card-title>
        <v-container style="margin: 0px;">
          <v-row>
            <v-col cols="12" class="text-body-2">
              <p v-for="(paragraph, index) in event.body" :key="index">
                {{ paragraph }}
              </p>
              Fuentes:
              <v-btn
                text
                icon
                v-for="(source, index) in event.sources"
                :key="index"
                :href="source"
                target="_blank"
              >
                <v-icon>{{ "mdi-numeric-" + index + 1 + "-box" }}</v-icon>
              </v-btn>
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
import { getColorByPartido } from "../utils/utils";
import EventBus from "../utils/eventbus";

@Component({
  components: {}
})
export default class Timeline extends Vue {
  @Prop() events!: Event[];

  getColorByPartido = getColorByPartido;
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
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
