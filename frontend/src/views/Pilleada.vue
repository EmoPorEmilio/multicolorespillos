<template>
  <div id="suggestionForm">
    <v-text-field
      filled
      v-model="title"
      :rules="titleRules"
      label="Título de la Noticia"
      required
    ></v-text-field>

    <v-textarea filled v-model="body" label="Cuerpo de la Noticia">
      <template v-slot:label> </template>
    </v-textarea>

    <div id="formButtons">
      <v-btn @click="undo()" color="#ff658b" dark style="margin-right: 10px;"
        >LIMPIAR <v-icon right dark>mdi-eraser</v-icon></v-btn
      >
      <v-btn
        @click="sendSuggestion()"
        color="success"
        dark
        style="margin-right: 10px;"
        >SUGERIR <v-icon right dark>mdi-email-check</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Pilleada extends Vue {
  title = "";
  body = "";

  titleRules = [(v: any) => !!v || "Título requerido"];

  undo() {
    this.title = "";
    this.body = "";
  }
}
</script>

<style scoped>
#suggestionForm {
  margin-top: 100px;
  padding: 25px;
  display: flex;
  flex-direction: column;
}

#formButtons {
  width: 100%;
  text-align: right;
}
</style>
