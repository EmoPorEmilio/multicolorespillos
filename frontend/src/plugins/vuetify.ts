import Vue from "vue";
import Vuetify from "vuetify/lib";
import es from "vuetify/src/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#6a6a6a",
        secondary: "#a3a3a3",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
});
