<template>
  <v-layout>
    <v-main>
      <div
        class="main-login d-flex items-center justify-center pa-0 pa-sm-12 form-login"
      >
      <v-container>
        <div class="main-page-content relative">
          <div class="ico-back" @click="$router.go(-1)">
            <img :src="back" width="60" />
          </div>
          <v-row
            class="d-block d-sm-none text-center py-12"
          >
            <router-link to="/">
              <img :src="logoBlack" width="150" />
            </router-link>
          </v-row>
          <v-row class="d-block d-sm-flex h-full mt-0">
            <v-col class="left-login py-0 px-7 px-sm-16 py-sm-10">
              <h2>Forgot Password?</h2>
              <p class="mb-0 mb-sm-12">Enter the phone number associated with your account.</p>
              <v-form ref="form" v-on:submit.prevent>
                <div class="mt-4">
                  <div class="mb-0 relative">
                    <label class="d-block mb-0 mb-2">Your Email</label>
                    <div class="relative">
                      <v-text-field
                        color="primary"
                        type="text"
                        placeholder="Enter your email"
                        v-model="emailForgot"
                        :rules="rules.email"
                        @input="validEmail"
                        v-on:keyup.enter="submitForgotPwd"
                      ></v-text-field>
                      <span
                        class="ico-right"
                        :class="{
                          'check-success': isChange && !checkEmail,
                          'check-error': isChange && checkEmail,
                        }"
                        ><svg
                          width="20"
                          height="20"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            :d="
                              isChange && checkEmail
                                ? 'M8.31555 7.05263L3.26291 2M8.31555 7.05263L14.6313 13.3684M8.31555 7.05263L13.3682 2M5.94712 9.42105L1.99976 13.3684'
                                : 'M14 4L8.66667 9.33333M5.75 12.25L2 8.5'
                            "
                            stroke="#AEB7C2"
                            stroke-width="2"
                            stroke-linecap="round"
                          /></svg
                      ></span>
                    </div>
                  </div>
                </div>
              </v-form>
              <Button
                label="Submit"
                color="btn-primary mt-10"
                :disabled="submitBtn"
                @submit:btnSubmit="submitForgotPwd"
              />
            </v-col>
            <v-col class="right-login d-none d-sm-flex justify-center align-center">
              <router-link to="/">
                <img :src="logoBlack" width="250" />
              </router-link>
            </v-col>
          </v-row>
        </div>
      </v-container>
      </div>
    </v-main>
    <Toast :toast="toast" />
  </v-layout>
</template>

<script>
const back = require("../assets/images/common/back.png");
const logoBlack = require("../assets/logo-black.png");

import { forgotPwd } from "@store/user";

import Toast from "@component/Toast";
import Button from "@component/shares/Button";

export default {
  name: "ForgotPassword",
  components: { Toast, Button },
  data: () => ({
    back,
    logoBlack,
    isChange: false,
    checkEmail: false,
    submitBtn: false,
    val: false,
    emailForgot: "",
    toast: {
      content: "",
      open: false,
    },
    rules: {
      email: [
        (value) => !!value || "Email field is required",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "The email address entered is invalid";
        },
      ],
    },
  }),
  methods: {
    validEmail() {
      this.isChange = true;
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (pattern.test(this.emailForgot)) {
        this.checkEmail = false;
      } else this.checkEmail = true;
    },
    async submitForgotPwd() {
      this.submitBtn = true;
      this.toast.open = false;
      if (this.emailForgot != "" && this.$refs.form.validate()) {
        const result = await forgotPwd(this.emailForgot);
        if (result.statusCode == 200) {
          localStorage.setItem("emailForgot", `${this.emailForgot}`);
          this.$router.push({ path: "/verify-code" });
        } else {
          let infoToast = {
            color: "warning",
            content:
              "We can't find your email address. Please create new account with this email!",
            open: true,
          };
          this.submitBtn = false;
          this.toast = infoToast;
        }
      } else this.submitBtn = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.main-login {
  .container {
    max-width: 1140px;
  }
  min-height: 100%;
  background: linear-gradient(141.38deg, #354a67 24.75%, #176867 73.56%);
  align-items: center;
  h2 {
    color: #354a67;
    font-size: 44px;
  }
  p {
    color: #5d6e85;
  }
  .main-page-content {
    background: #fff;
    min-width: 80%;
    box-shadow: 30px 30px 60px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    height: 700px;
    .left-login {
      .v-text-field {
        input {
          border: none;
        }
      }
    }
    .right-login {
      background: linear-gradient(141.38deg, #eafafa 24.75%, #d5f6f5 73.56%);
      border-radius: 0 20px 20px 0;
      height: 100%;
    }
  }
}
.textfield-login {
  border: none;
  border-bottom: 2px solid #aeb7c2;
}

.line {
  border-top: 1px solid #ebedf0;
}
.relative {
  position: relative;
}
.ico-right {
  position: absolute;
  right: 0;
  top: 0px;
}
.ico-back {
  position: absolute;
  top: 40px;
  left: -30px;
}
@media only screen and (max-width: 600px) {
  .main-login {
    .main-page-content {
      .right-login {
        background: none;
        height: 0;
        img {
          width: 250px;
        }
      }
      .left-login {
        margin-bottom: 35%;
      }
    }
  }
  .h-full {
    height: 0;
  }
}
</style>
