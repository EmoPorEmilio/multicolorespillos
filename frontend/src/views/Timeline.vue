<template>
  <div class="timeline">
    <v-timeline>
      <v-timeline-item
        v-for="(event, i) in events"
        :key="i"
        :color="event.color"
        small
      >
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-bold ${event.color}--text`"
            v-text="event.date"
          ></span>
        </template>
        <div class="py-4">
          <h2 :class="`headline font-weight-light mb-4 ${event.color}--text`">
            {{ event.title }}
          </h2>
          <div>
            {{ event.body }}
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Timeline extends Vue {
  events = [
    {
      date: "12/07/1994",
      color: "cyan",
      year: "1960",
      title: "Ejemplo",
      body:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaa aa a a a aaaaaa aaaaaa a a aaaa",
    },
    {
      date: "12/07/1994",
      color: "green",
      year: "1960",
      title: "Ejemplo",
      body:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaa aa a a a aaaaaa aaaaaa a a aaaa",
    },
    {
      date: "12/07/1994",
      color: "purple",
      year: "1960",
      title: "Ejemplo",
      body:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaa aa a a a aaaaaa aaaaaa a a aaaa",
    },
    {
      date: "12/07/1994",
      color: "red",
      year: "1960",
      title: "Ejemplo",
      body:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaa aa a a a aaaaaa aaaaaa a a aaaa",
    },
    {
      date: "12/07/1994",
      color: "orange",
      year: "1960",
      title: "Ejemplo",
      body:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaa aa a a a aaaaaa aaaaaa a a aaaa",
    },
  ];
}
</script>

<style>
.timeline {
  margin-top: 80px;
  padding: 0 10px 0px 10px;
}
</style>
