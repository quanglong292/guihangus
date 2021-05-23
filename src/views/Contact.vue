<template>
  <v-main>
    <TopBar />
    <Banner :infoBanner="infoBanner" />
    <v-container>
      <div class="center mt-100 mb-60">
        <v-img :src="logo1" width="110" class="margin-auto" />
        <p class="head-line">We’d love to hear from you</p>
        <p class="text-base contact-subhead">
          We are experienced in handling the formalities and documentation required for your imports and exports. We work with all international station to guarantee that your load will safely reach without any delays.
        </p>
      </div>
    </v-container>
    <v-container>
      <v-row class="justify-space-between align-center officeInfo mb-12">
        <v-col class="p-12 border-gray mr-5 mb-5">
          <div class="center p-10">
            <p class="sub-header mb-0 center">Head Office</p>
            <p class="mt-30">1969 Upton Avenue, Brownville Maine</p>
            <p>Phone: +0 (123) 456-7890</p>
            <p>Email: info@guihang.us</p>
            <div class="center">
              <div class="btn-find">FIND US ON MAP</div>
            </div>
          </div>
        </v-col>
        <v-col class="p-12 border-gray mb-5">
          <div class="center p-10">
            <p class="sub-header mb-0 center">Head Office</p>
            <p class="mt-30">1969 Upton Avenue, Brownville Maine</p>
            <p>Phone: +0 (123) 456-7890</p>
            <p>Email: info@guihang.us</p>
            <div class="center">
              <div class="btn-find">FIND US ON MAP</div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="main-content pb-3">
      <v-container>
        <p class="text-bold pl-0 pl-sm-3 pl-sm-0 text-center text-sm-left">Have Any Question?</p>
        <div class="question mb-40 pl-0 pl-sm-3 pl-sm-0 text-center text-sm-left">
          If you would like to know more about our services, please contact us
          using this form
        </div>
        <v-card>
          <div class="p-50 contact-form">
            <v-form ref="form" v-model="valid" v-on:submit.prevent>
              <div class="row-filed d-block d-sm-flex justify-space-between">
                <div class="input-field mr-0 mr-sm-5">
                  <div>
                    <v-text-field
                      label="Full Name"
                      outlined
                      dense
                      v-model="dataMail.fullName"
                      :rules="rules.fullName"
                      v-on:keyup.enter="sendMail"
                    ></v-text-field>
                  </div>
                </div>
                <div class="input-field mr-0 mr-sm-5">
                  <div>
                    <v-text-field
                      label="Email"
                      outlined
                      dense
                      v-model="dataMail.email"
                      :rules="rules.email"
                      v-on:keyup.enter="sendMail"
                    ></v-text-field>
                  </div>
                </div>
                <div class="input-field">
                  <div>
                    <v-text-field
                      label="Phone Number"
                      placeholder="123-456-7890"
                      outlined
                      dense
                      v-model="dataMail.phone"
                      v-mask="'###-###-#####'"
                      :rules="rules.phone"
                      v-on:keyup.enter="sendMail"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div>
                <v-textarea
                  outlined
                  label="Content"
                  v-model="dataMail.body"
                  rows="12"
                  :rules="rules.content"
                  v-on:keyup.enter="sendMail"
                ></v-textarea>
              </div>
            </v-form>
            <v-btn elevation="0" class="primary" @click="sendMail" :disabled="loading">
              <span>SEND MESSAGE</span>
              <v-progress-circular
                v-if="loading"
                class="ml-2"
                :size="20"
                :width="3"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-btn>
          </div>
        </v-card>
      </v-container>
      <Toast :toast="toast" />
    </div>

    <v-row class="px-0 px-md-2 googleMap" justify="space-around">
      <v-col class="pa-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497068.32251369854!2d-95.76059596888268!3d29.744961433003343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640dd3b6efd39c7%3A0x553693326ae4c926!2s11210%20Bellaire%20Blvd%2C%20Houston%2C%20TX%2077072%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1620704267715!5m2!1svi!2s"
          width="100%"
          height="600"
          style="border:0;"
          allowfullscreen="false"
          loading="lazy"
        ></iframe>
      </v-col>
    </v-row>
    <Footer />
  </v-main>
</template>

<script>
import Vue from 'vue'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);
import { sendMail } from "@store/guest";

import TopBar from "../components/TopBar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Toast from "@component/Toast";

const logo1 = require("../assets/logo_1.svg");
const banner = require("../assets/images/banner/pic8.jpg");
export default {
  name: "Contact",
  components: { TopBar, Banner, Footer, Toast },
  data: () => ({
    logo1,
    valid: false,
    loading: false,
    dataMail: {
      fullName: null,
      email: null,
      phone: null,
      body: null,
    },
    infoBanner: {
      img: banner,
      title: "Get in touch with us",
      isContact: true,
      content:
        "Stop worrying about any shipping problems. Focus on your business. Let us provide the support you deserve.",
    },
    toast: {
      content: "",
      open: false,
    },
    rules: {
      fullname: [(value) => !!value || "Full name field is required"],
      content: [(value) => !!value || "Content field is required"],
      email: [
        (value) => !!value || "Email field is required",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "The email address entered is invalid";
        },
      ],
      phone: [
        (value) => !!value || "Phone field is required",
        (value) =>
          (value || "").length >= 10 ||
          "The phone number has minimum 10 characters",
        (value) => {
          const pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
          return pattern.test(value) || "The phone number entered is invalid";
        },
      ],
    },
  }),
  methods: {
    async sendMail() {
      this.loading = true;
      let infoToast = {
        color: "warning",
        content: "Successfull",
        open: true,
      };
      if (this.valid) {
        const result = await sendMail(this.dataMail);
        if (result?.statusCode === 201) {
          infoToast.content = result?.data?.message;
          infoToast.color = "success";
        } else {
          infoToast.content = "Sending of message failed!";
        }
        this.$refs.form.reset();
      } else {
        infoToast.content = "You have missed some fields!";
      }
      this.toast = infoToast;
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
.container {
  max-width: 1140px;
  @media screen and (max-width: 1024px) {
    max-width: 840px;
  }
  @media screen and (max-width: 768px) {
    max-width: 640px;
  }
  @media screen and (max-width: 425px) {
    max-width: 380px;
  }
}
</style>
<style lang="scss" scoped>
.mx-100 {
  margin: 50px;
}
.mb-60{
  margin-bottom: 60px;
}
.mb-40{
  margin-bottom: 40px;
}
.contact-subhead{
  width:85%;
  margin:0 auto;
}
.contact-form{
  box-shadow: 0px 10px 23px rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: 1;
}
.googleMap{
  background-color: #fff;
  position: relative;
  z-index: 2;
  margin-top: -50px;
}
.btn-find {
  background: #06b7b4;
  color: #fff;
  padding: 10px;
}
.question {
  font-size: 32px;
  line-height: 36px;
  padding-right: 35%;
}
.p-50 {
  padding: 60px;
}
.officeInfo {
  .col {
    margin: 0 20px;
    padding: 20px 80px;
    div {
      font-size: 16px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .p-50 {
    padding: 30px;
  }
  .question {
    padding-right: 20%;
    font-size: 35px;
  }
  .officeInfo {
    padding: 0 0 40px 0;
    .col {
      padding: 20px 50px;
    }
  }
  .mx-100 {
    margin: 0;
  }
}

@media only screen and (max-width: 600px) {
  .question {
    padding: 0;
  }
  .row-filed {
    .input-field {
      width: 100%;
    }
  }
}
</style>
