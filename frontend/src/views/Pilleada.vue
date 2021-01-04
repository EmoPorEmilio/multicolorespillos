<template>
  <div id="suggestionForm">
    <v-btn color="success" @click="goToHome()" fab depressed dark>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <br />
    <v-text-field
      filled
      v-model="title"
      :rules="titleRules"
      label="Título de la Noticia"
      placeholder="Título conciso y descriptivo del hecho."
      required
    ></v-text-field>

    <v-textarea
      filled
      v-model="body"
      :rules="titleRules"
      placeholder="Cuanto más detallado, más fácil será añadirla. Información útil: links a noticias, fecha, descripción del hecho, etc."
      label="Cuerpo de la Noticia"
    >
      <template v-slot:label> </template>
    </v-textarea>

    <div id="formButtons">
      <v-btn @click="undo()" color="#ff658b" dark style="margin-right: 10px;"
        >LIMPIAR <v-icon right dark>mdi-eraser</v-icon></v-btn
      >
      <v-btn
        @click="postSugerencia()"
        color="success"
        dark
        style="margin-right: 10px;"
        >SUGERIR <v-icon right dark>mdi-email-check</v-icon></v-btn
      >
    </div>
    <div class="popup">
      <v-alert v-model="alertSuccess" dismissible type="success"
        >Sugerencia enviada con éxito!</v-alert
      >
      <v-alert v-model="alertError" dismissible type="error"
        >Ha ocurrido un error!</v-alert
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {}
})
export default class Pilleada extends Vue {
  title = "";
  body = "";
  alertSuccess = false;
  alertError = false;

  titleRules = [(v: any) => !!v || "Título requerido"];
  bodyRules = [(v: any) => !!v || "Cuerpo requerido"];

  undo() {
    this.title = "";
    this.body = "";
  }

  goToHome() {
    this.$router.push("/");
  }

  postSugerencia() {
    this.alertSuccess = false;
    this.alertError = false;
    axios
      .post("/api/pilleadas", {
        title: this.title,
        body: this.body
      })
      .then(response => {
        this.undo();
        this.alertSuccess = true;
      })
      .catch(error => {
        console.log(error);
        this.alertError = true;
      });
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

.popup {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 10px;
}
</style>
