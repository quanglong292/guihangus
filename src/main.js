import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import dotenv from "dotenv";
import "./assets/css/styles.scss";

dotenv.config();

router.beforeEach((to, from, next ) => {
  const authUser = localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && !authUser) {
    next({path: '/login'})
  } else if(authUser){
    switch (to.name) {
      case 'Login': 
      case 'Register': 
      case 'ForgotPassword': 
      case 'NewPassword': 
      case 'VerifyCode': 
      case 'HomePage': 
      case 'CreateLabelPage':
        if(JSON.parse(localStorage.getItem('user'))?.role !== 'Customer'){
          next({path: '/admin'})
        } else next({path: `/customer`})
        break;
      default:
        next();
        break;
    }
  }
  else next()
})

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
