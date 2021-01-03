<template>
  <Timeline :events="events" />
</template>

<script lang="ts">
import { Timeline } from "../components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { Timeline: Timeline }
})
export default class Inicio extends Vue {
  events = [
    {
      date: new Date(),
      color: "#00bcd4",
      title: "Ejemplo",
      id: "4332"
    }
  ];
}
</script>

<style></style>
