<template>
  <div id="header">
    <div id="banner">
      <div id="logo">
        <img src="~@/assets/logo.png" />
      </div>
      <v-icon id="social" color="#1DA1F2" @click="goToTwitter()"
        >mdi-twitter</v-icon
      >
    </div>
    <div id="options">
      <v-expand-transition>
        <div v-show="expand">
          <div
            class="optionsMenu"
            id="suggest"
            style="
  justify-content: center;
  padding: 12px;"
          >
            <center>
              ¿Falta algún evento importante?
              <v-btn outlined rounded color="primary" dark
                >Sugerí una pilleada</v-btn
              >
            </center>
          </div>

          <div
            class="optionsMenu"
            style="padding-top: 2px; padding-left: 20px; padding-right: 20px;"
          >
            <v-menu
              ref="menuFrom"
              v-model="menuFrom"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFrom"
                  label="Desde"
                  prepend-icon="mdi-calendar-arrow-right"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="dateFrom"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="cancelMenu1()"
                  >Cancelar</v-btn
                >
                <v-btn text color="primary" @click="$refs.menuFrom.save(date)"
                  >OK</v-btn
                ></v-date-picker
              >
            </v-menu>

            <v-menu
              ref="menuTo"
              v-model="menuTo"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateTo"
                  label="Hasta"
                  prepend-icon="mdi-calendar-arrow-right"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="dateTo"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="cancelMenu2()"
                  >Cancelar</v-btn
                >
                <v-btn text color="secondary" @click="$refs.menuTo.save(date)"
                  >OK</v-btn
                ></v-date-picker
              >
            </v-menu>
          </div>

          <div
            class="optionsMenu"
            style="
  justify-content: center;"
          >
            <v-slide-group v-model="tags" column multiple show-arrows>
              <v-slide-item
                v-for="n in 25"
                :key="n"
                v-slot:default="{ active, toggle }"
              >
                <v-chip
                  style="margin: 10px; margin-top: 13px"
                  :color="active ? 'primary' : 'grey lighten-1'"
                  filter
                  outlined
                  @click="toggle"
                  >Partido Colorado</v-chip
                >
              </v-slide-item>
            </v-slide-group>
          </div>

          <div
            class="optionsMenu"
            id="actions"
            style=" padding-right: 20px; padding-top: 12px;"
          >
            <v-btn
              v-show="!filterApplied"
              depressed
              disabled
              style="margin-right: 10px;"
              >DESHACER FILTRO <v-icon right dark>mdi-cancel</v-icon></v-btn
            ><v-btn
              v-show="filterApplied"
              @click="cancelFilter()"
              color="#ff658b"
              dark
              style="margin-right: 10px;"
              >DESHACER FILTRO <v-icon right dark>mdi-cancel</v-icon></v-btn
            >
            <v-btn @click="applyFilter()" color="success" dark>FILTRAR</v-btn>
          </div>
        </div>
      </v-expand-transition>
      <div id="floatingButtons">
        <v-btn
          style="display: block;  margin-top: 0px"
          depressed
          small
          color="secondary"
          @click="expand = !expand"
        >
          <v-icon v-show="!expand">mdi-arrow-down-thick</v-icon>
          <v-icon v-show="expand">mdi-arrow-up-thick</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop() text!: string;
  expand = false;
  dateFrom = null;
  dateTo = null;
  menuFrom = false;
  menuTo = false;
  filterApplied = false;

  tags = [];

  applyFilter() {
    this.filterApplied = true;
  }

  cancelFilter() {
    this.filterApplied = false;
  }

  goToTwitter() {
    window.location.href = "https://twitter.com/coloridospillos";
  }

  cancelMenu1() {
    this.menuFrom = false;
    this.dateFrom = null;
  }

  cancelMenu2() {
    this.menuTo = false;
    this.dateTo = null;
  }
}
</script>

<style scoped>
#header {
  display: flex;
  flex-direction: column;
  z-index: 1000;
  position: fixed;
  text-align: center;
  width: 100%;
  height: 80px;
  margin: 0px;
  background-image: url("~@/assets/background-2.png");
  background-repeat: repeat;
}
#banner {
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  justify-content: center;
}
#options {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#floatingButtons {
  display: flex;
  justify-content: center;
}
.optionsMenu {
  background-image: url("~@/assets/background-3.png");
  background-repeat: repeat;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  width: 100%;
  height: 60px;
}

#actions {
  justify-content: flex-end;
}

@media screen and (max-width: 1079px) {
  #suggest {
    height: 90px;
  }
  #actions {
    justify-content: center;
  }
}

#logo {
  margin-top: 18px;
}

#social {
  margin-left: 5px;
  margin-top: 30px;
  height: 30px;
}

img {
  width: 337px;
}
</style>