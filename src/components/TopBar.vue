<template>
  <div class="top-header">
    <v-container>
      <v-row class="d-flex justify-space-between pt-2 pb-4">
        <v-col class="text-left">
          <img
            class="info-icon"
            src="../assets/images/order-detail/ico_calling.png"
          />
          <span class="info-text">Call Us Now: </span>
          <a class="email-text" href="tel:+0(123)4567890">+0(123)4567890</a>
        </v-col>
        <v-col class="text-center">
          <img
            class="info-icon"
            src="../assets/images/order-detail/ico_message.png"
          />
          <span class="info-text">Email: </span>
          <a class="email-text" href="mailto:info@guihang.us">
            info@guihang.us</a
          >
        </v-col>
        <v-col class="text-right">
          <v-flex>
            <router-link to="/login" class="mr-2 log-in">Log In</router-link> |
            <router-link to="/register" class="ml-2 sign-up"
              >Sign Up</router-link
            >
          </v-flex>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="mx-10 main-menu elevation-2 rounded">
      <v-container>
        <v-row class="d-flex align-center topbar-space">
          <v-col class="text-left logo-img" cols="3" md="3" sm="3" xs="5">
            <a class="logo" href="/"
              >
              <img
                  :src="require('../assets/logo.svg')"
                  height="80"
                />
              </a>
          </v-col>
          <v-col class="toggle-menu" cols="6" md="4" sm="4" xs="2">
            <v-menu :offset-y="true">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="white"
                  class="icon-menu px-4 rounded"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-img
                    :src="
                      require('../assets/images/common/icon/arrow_down.png')
                    "
                    width="15"
                  />
                </v-btn>
              </template>
              <v-list class="v-list-p0">
                <v-list-item
                  v-for="(route, index) of routes"
                  :key="index"
                  :to="route.href"
                  custom
                >
                  <v-list-item-title>{{ route.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>

          <v-col class="text-center menu-container" cols="6" md="6" sm="6">
            <div class="main-menu d-flex text-right main-menu-rss text-route">
              <router-link
                v-for="(route, index) of routes"
                :key="index"
                :to="route.href"
                custom
                >{{ route.name }}</router-link
              >
            </div>
          </v-col>

          <v-col class="text-right-rss text-right" cols="6" md="3" sm="3" xs="5">
            <v-flex class="justify-end align-center get-a-quote">
              <a href="#" class="mr-4 get-a-quote-icon"
                ><img
                  :src="require('../assets/images/common/menu-right.svg')"
                  width="20"
                />
              </a>
              <router-link class="router-txt" to="/create-label"
                ><v-btn class="uppercase uppercase-custom"
                  >CREATE LABEL</v-btn
                ></router-link
              >
            </v-flex>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "TopBar",

  data: () => ({
    routes: [
      {
        name: "Home",
        href: "/",
      },
      {
        name: "About",
        href: "/about",
      },
       {
        name: "Create Label",
        href: "/create-label",
      },
      {
        name: "Tracking",
        href: "/tracking",
      },
      {
        name: "Contact",
        href: "/contact",
      },
    ],
  }),
};
</script>
<style>
.v-app-bar {
  /* height: 100px !important; */
}
.top-header {
  position: relative;
  z-index: 9999;
  width: 100%;
}

.v-toolbar__content {
  /* height: auto !important; */
}
</style>

<style lang="scss" scoped>
.logo-img {
  
  @media screen and (max-width: 768px) {
    max-width: 100% !important;
    .logo img{
      height: 50px;
    }
  }
  @media screen and (max-width: 600px) {
    display: none;
    .logo img{
      height: 40px;
    }
  }
}
.v-list-p0{
  padding: 0 !important;
}
.router-txt {
  padding-left: 0px;
  padding-right: 0px;
  a {
    text-decoration: none !important;
  }
  text-decoration: none !important;
  :hover {
    text-decoration: none !important;
  }
  :focus {
    text-decoration: none !important;
  }
}
.info-icon {
  max-width: 20px;
  max-height: 15px;
  margin-right: 6px;
  padding-top: 4px;
  @media screen and (max-width: 17769px) {
    display: none;
  }
  @media screen and (max-width: 769px) {
    display: inline-block;
  }
  @media screen and (max-width: 408px) {
    width: 25px;
    max-height: 20px !important;
    height: 20px;
  }
}
.contact {
  display: flex;
}
.info-text {
  margin-right: 6px;
  @media screen and (max-width: 769px) {
    display: none;
  }
}
.email-text {
  font-size: 16px;
  color: black !important;
  border-bottom: 2px solid #06b7b4;
  @media screen and (max-width: 454px) {
    font-size: 12px;
  }
  @media screen and (max-width: 478px) {
    display: none;
  }
}
.log-in:hover,.sign-up:hover{
  color: #06b7b4;
    border-bottom: 2px solid #06b7b4;
}
.log-in {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2px;
  color: #354a67;
  @media screen and (max-width: 769px) {
    font-size: 16px;
    line-height: 20px;
  }
  @media screen and (max-width: 478px) {
    font-size: 10px;
  }
  @media screen and (max-width: 320px) {
    font-size: 8px;
  }
}
.sign-up {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2px;
  color: #354a67;
  @media screen and (max-width: 769px) {
    font-size: 16px;
    line-height: 20px;
  }
  @media screen and (max-width: 478px) {
    font-size: 10px;
  }
  @media screen and (max-width: 320px) {
    font-size: 8px;
  }
} .v-menu{
    border-radius: 0px;
  }
.toggle-menu {
 
  justify-content: center;
  @media screen and (max-width: 7769px) {
    display: none;
  }
  @media screen and (max-width: 769px) {
    display: flex;
  }
  @media screen and (max-width: 394px) {
    margin-left: 10px;
  }
  .v-image {
    width: 20px;
  }
}
.icon-menu {
  min-width: 0px !important;
}
.menu-container {

  @media screen and (max-width: 769px) {
    display: none;
  }
}
.topbar-space{
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    flex-wrap: nowrap;

  }
}
.main-menu-rss{
  justify-content: space-between !important;
}
.text-route a {
  width: max-content;

  @media screen and (max-width: 1265px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  @media screen and (max-width: 1024px) {
    padding-left: 9px;
    padding-right: 9px;
    font-size: 15px;
  }
  @media screen and (max-width: 865px) {
    padding-left: 8px;
    padding-right: 8px;
    font-size: 13px;
  }
  @media screen and (max-width: 791px) {
    padding-left: 7px;
    padding-right: 7px;
  }
  @media screen and (max-width: 769px) {
    font-size: 13px;
  }
  @media screen and (max-width: 768px) {
    display: none;
    width: min-content;
  }
}
.text-right .justify-end a {
  @media screen and (max-width: 860px) {
    margin-right: 5px;
  }
}
.text-right{
  padding-left: 0px;
}
.get-a-quote-icon {
  margin-right: 0px !important;
  padding-left: 0px;
  @media screen and (max-width: 493px) {
    display: none;
  }
}
.uppercase-custom {
  margin-right: 2px;
  @media screen and (max-width: 1030px) {
    padding: 0px 10px !important;
    font-size: 13px !important;
  }
  @media screen and (max-width: 854px) {
    padding: 0px 6px !important;
    font-size: 11px !important;
  }
  @media screen and (max-width: 791px) {
    padding: 0px 8px !important;
    font-size: 10px !important;
  }
  @media screen and (max-width: 768px) {
    padding: 0px 8px !important;
    font-size: 10px !important;
  }@media screen and (max-width: 707px) {
    padding: 0px 8px !important;
    font-size: 9px !important;
  }
  @media screen and (max-width: 680px) {
    padding: 0px 3px !important;
    font-size: 8px !important;
  }
  @media screen and (max-width: 614px) {
    padding: 0px 3px !important;
    font-size: 8px !important;
  }
  @media screen and (max-width: 603px) {
    padding: 0px 2px !important;
    font-size: 7px !important;
  }
  @media screen and (max-width: 600px) {
    padding: 0px 5px !important;
    font-size: 12px !important;
  }
  @media screen and (max-width: 574px) {
    padding: 0px 4px !important;
    font-size: 10px !important;
  }
  @media screen and (max-width: 445px) {
    padding: 0px 5px !important;
    font-size: 11px !important;
  }
}
@media only screen and (max-width: 768px) {
  .toggle-menu {
    justify-content: center;
  }
  .v-menu__content {
    max-width: 100%;
    width: 100%;
    left: 0;
  }
}

@media only screen and (max-width: 600px) {
  .top-header {
    .container {
      &:first-child {
        margin-bottom: 10px;
      }
    }
  }
  .toggle-menu {
    justify-content: flex-start;
    text-align: left;
    padding: 12px 0 12px 12px;
    margin-left: 0;
  }
  .text-right-rss {
    text-align: right;
  }
  .v-menu__content {
    max-width: 100%;
    width: 100%;
    left: 0;
  }
}
</style>
