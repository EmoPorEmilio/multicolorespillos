<template>
  <div id="header">
    <div id="banner">
      <div id="logo" @click="goToHome()">
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
              <span>¿Falta algún evento importante?</span>
              <v-btn
                @click="goToPilleada()"
                outlined
                rounded
                color="primary"
                dark
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
                  v-model="dateFromFormatted"
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
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuFrom.save(dateFrom)"
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
                  v-model="dateToFormatted"
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
                :min="dateFrom"
                @change="save"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="cancelMenu2()"
                  >Cancelar</v-btn
                >
                <v-btn text color="primary" @click="$refs.menuTo.save(dateTo)"
                  >OK</v-btn
                ></v-date-picker
              >
            </v-menu>
          </div>

          <div
            class="optionsMenu"
            style="justify-content: center; padding-top:5px;"
          >
            <v-chip-group
              ref="tags-group"
              :show-arrows="true"
              active-class="primary--text"
              multiple
              v-model="partidos"
            >
              <v-chip filter outlined>Partido Nacional</v-chip>
              <v-chip filter outlined>Partido Colorado</v-chip>
              <v-chip filter outlined>Cabildo Abierto</v-chip>
              <v-chip filter outlined>Partido Independiente</v-chip>
              <v-chip filter outlined>Partido de la Gente</v-chip>
            </v-chip-group>
          </div>

          <div
            class="optionsMenu"
            style="padding-top: 2px; padding-left: 20px; padding-right: 20px;"
          >
            <v-text-field
              v-model="textFilter"
              label="Filtrar por Texto"
            ></v-text-field>
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Filters, PartidoEnum } from "../models/Event";
import EventBus from "../utils/eventbus";

@Component
export default class Header extends Vue {
  @Prop() text!: string;
  expand = false;
  dateFrom: string | null = null;
  dateFromFormatted: string | null = null;
  dateTo: string | null = null;
  dateToFormatted: string | null = null;
  menuFrom = false;
  menuTo = false;
  filterApplied = false;
  textFilter = "";
  partidos = [];

  formatDate(date: string | null) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  @Watch("dateFrom")
  formatDateFrom() {
    this.dateFromFormatted = this.formatDate(this.dateFrom);
  }

  @Watch("dateTo")
  formatDateTo() {
    this.dateToFormatted = this.formatDate(this.dateTo);
  }

  parseDate(date: string) {
    if (!date) return null;

    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  applyFilter() {
    this.filterApplied = true;
    this.expand = false;
    const partidos: PartidoEnum[] = [];
    for (let i = 0; i < this.partidos.length; i++) {
      switch (this.partidos[i]) {
        case 0:
          partidos.push("PN");
          break;
        case 1:
          partidos.push("PC");
          break;
        case 2:
          partidos.push("CA");
          break;
        case 3:
          partidos.push("PI");
          break;
        case 4:
          partidos.push("PG");
          break;
      }
    }

    const filters: Filters = {
      dateFrom: this.dateFromFormatted,
      dateTo: this.dateToFormatted,
      filterText: this.textFilter,
      partidos: partidos
    };
    EventBus.$emit("APPLY_FILTER", filters);
  }

  save() {
    return true;
  }

  cancelFilter() {
    this.partidos = [];
    this.dateFrom = null;
    this.dateTo = null;
    this.filterApplied = false;
    this.textFilter = "";
    EventBus.$emit("UNDO_FILTER");
  }

  goToTwitter() {
    window.location.href = "https://twitter.com/coloridospillos";
  }

  goToHome() {
    this.expand = false;
    this.$router.push("/");
  }

  goToPilleada() {
    this.expand = false;
    this.$router.push("/pilleada");
  }

  cancelMenu1() {
    this.menuFrom = false;
    this.dateFrom = null;
  }

  cancelMenu2() {
    this.menuTo = false;
    this.dateTo = null;
  }

  updated() {
    const element: any = this.$refs["tags-group"];
    element.onResize();
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
  min-height: 80px;
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

#suggest {
  height: 60px;
}

@media screen and (max-width: 493px) {
  #suggest {
    height: 90px;
  }
  #actions {
    justify-content: center;
  }
}

#logo {
  cursor: pointer;
  margin-top: 19px;
}

#social {
  margin-left: 5px;
  margin-top: 20px;
  height: 30px;
}

img {
  width: 379px;
}

@media only screen and (max-width: 440px) {
  img {
    width: 300px;
  }
  #logo {
    margin-top: 25px;
  }
}

span {
  margin: 10px;
}
</style>
