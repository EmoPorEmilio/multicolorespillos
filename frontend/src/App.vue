<template>
  <v-app
    style="
    background: rgba(0,0,0,0);"
  >
    <Header />
    <v-main> <router-view /></v-main>
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
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
body {
  background-image: url("~@/assets/background.png");
  background-repeat: repeat;
}
</style>
