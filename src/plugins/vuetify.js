import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ArrowIcon from "@/components/custom/ArrowIcon.vue";
import CloseLgIcon from "@/components/custom/CloseLgIcon.vue";
import ArrowRightCircle from "@/components/custom/ArrowRightCircle.vue";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#06b7b4",
        secondary: "#b0bec5",
      },
    },
  },
  icons: {
    values: {
      arrow_down: {
        component: ArrowIcon,
      },
      close_lg: {
        component: CloseLgIcon,
      },
      arrow_right_circle: {
        component: ArrowRightCircle,
      },
    },
  },
});
