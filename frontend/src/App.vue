<template>
  <v-app
    style="
    background: rgba(0,0,0,0);"
  >
    <Header />
    <v-main>
      <div class="timeline">
        <v-timeline>
          <v-timeline-item
            v-for="(year, i) in years"
            :key="i"
            :color="year.color"
            small
          >
            <template v-slot:opposite>
              <span
                :class="`headline font-weight-bold ${year.color}--text`"
                v-text="year.year"
              ></span>
            </template>
            <div class="py-4">
              <h2
                :class="`headline font-weight-light mb-4 ${year.color}--text`"
              >
                Lorem ipsum
              </h2>
              <div>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando
                voluptatibus, vix an salutandi sententiae.
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </div></v-main
    >
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Header } from "./components";

@Component({
  components: { Header: Header },
})
export default class App extends Vue {
  show = false;

  years = [
    {
      color: "cyan",
      year: "1960",
    },
    {
      color: "green",
      year: "1970",
    },
    {
      color: "pink",
      year: "1980",
    },
    {
      color: "amber",
      year: "1990",
    },
    {
      color: "orange",
      year: "2000",
    },
  ];
}
</script>

<style>
.timeline {
  margin-top: 80px;
  padding: 0 10px 0px 10px;
}
#keep .v-navigation-drawer__border {
  display: none;
}
body {
  background-image: url("~@/assets/background.png");
  background-repeat: repeat;
}
</style>
