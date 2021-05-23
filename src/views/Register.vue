<template>
  <v-layout>
    <v-main>
      <div
        class="main-login pa-8 d-flex items-center justify-center form-login"
      >
        <v-container>
          <div class="main-page-content relative">
            <div class="ico-back" @click="$router.go(-1)">
              <img :src="back" width="60" />
            </div>
            <v-row class="no-margin d-flex h-full tablet-d-flex">
              <v-col class="left-login pa-7 px-sm-16 py-sm-10">
                <h2>Sign Up</h2>
                <p>Don't have an account?</p>
                <v-form ref="form" v-on:submit.prevent>
                  <div class="mt-2">
                    <div class="mb-0 relative">
                      <label class="d-block">Full Name</label>
                      <v-text-field
                        class="reg-input"
                        color="primary"
                        hide-details="auto"
                        dense
                        chips
                        small-chips
                        type="text"
                        placeholder="Enter full name"
                        v-model="formRegister.fullName"
                        :rules="rules.fullName"
                        v-on:keyup.enter="submitSignUp"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="mt-2">
                    <div class="mb-0">
                      <label class="d-block">Your Email</label>
                      <div class="relative">
                        <v-text-field
                          color="primary"
                          class="reg-input"
                          hide-details="auto"
                          dense
                          chips
                          small-chips
                          type="text"
                          placeholder="Enter your email"
                          v-model="formRegister.email"
                          :rules="rules.email"
                          @input="validateEmail"
                          v-on:keyup.enter="submitSignUp"
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
                  <div class="mt-2">
                    <div class="mb-0 relative">
                      <label class="d-block">Your Phone</label>
                      <v-text-field
                        color="primary"
                        class="reg-input"
                        hide-details="auto"
                        dense
                        chips
                        small-chips
                        type="text"
                        placeholder="Enter your phone"
                        v-model="formRegister.phone"
                        v-mask="'###-###-#####'"
                        :rules="rules.phone"
                        v-on:keyup.enter="submitSignUp"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="mt-2">
                    <div class="mb-0 relative">
                      <label class="d-block">Password</label>
                      <v-text-field
                        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                        hide-details="auto"
                        class="reg-input"
                        color="primary"
                        dense
                        chips
                        small-chips
                        :type="showPwd ? 'text' : 'password'"
                        placeholder="Enter your password"
                        v-model="formRegister.password"
                        :rules="rules.password"
                        @click:append="showPwd = !showPwd"
                        @input="validatePwd"
                        v-on:keyup.enter="submitSignUp"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="mt-2">
                    <div class="mb-0 relative">
                      <label class="d-block">Repeat Password</label>
                      <v-text-field
                        :append-icon="showRePwd ? 'mdi-eye' : 'mdi-eye-off'"
                        hide-details="auto"
                        class="reg-input"
                        color="primary"
                        dense
                        chips
                        small-chips
                        :type="showRePwd ? 'text' : 'password'"
                        placeholder="Enter your password"
                        v-model="formRegister.rePwd"
                        :rules="rules.rePassword"
                        @click:append="showRePwd = !showRePwd"
                        @input="validatePwd"
                        v-on:keyup.enter="submitSignUp"
                      ></v-text-field>
                      <span
                        class="validateRePassword"
                        v-if="validateMatchPassword"
                        >Password and confirm password does not match.</span
                      >
                    </div>
                  </div>
                </v-form>
                <Button
                  label="Sign Up"
                  color="btn-primary mt-10"
                  :disabled="disabledBtn"
                  @submit:btnSubmit="submitSignUp"
                />
                <div class="d-flex justify-center mt-4">
                  Already have an account?
                  <router-link to="/login" class="ml-2"
                    >Click here.</router-link
                  >
                </div>
              </v-col>
              <v-col
                class="right-login text-center d-sm-flex justify-center align-center"
              >
                <router-link to="/">
                  <img class="login-logo" :src="logoBlack" />
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
import Vue from "vue";
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);
import { createCustomer } from "@store/user";
import _ from "lodash";

import Toast from "@component/Toast";
import Button from "@component/shares/Button";

const logoBlack = require("../assets/logo-black.png");
const back = require("../assets/images/common/back.png");

export default {
  name: "Register",
  components: { Toast, Button },
  data: () => ({
    logoBlack,
    back,
    showPwd: false,
    showRePwd: false,
    validateMatchPassword: false,
    isChange: false,
    checkEmail: false,
    disabledBtn: false,
    formRegister: {
      fullName: null,
      email: null,
      phone: null,
      password: null,
      rePwd: null,
    },
    toast: {
      content: "",
      open: false,
    },
    rules: {
      fullName: [(value) => !!value || "Full name field is required"],
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
      password: [
        (value) => !!value || "Please enter your password",
        (value) => {
          const checkCharacters = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/g;
          return (
            checkCharacters.test(value) ||
            "Password much have 8 characters, lowercase, uppercase, numbers, symbols !"
          );
        },
      ],
      rePassword: [(value) => !!value || "Please enter re-password"],
    },
  }),
  methods: {
    validatePwd() {
      if (
        this.formRegister.rePwd &&
        this.formRegister.rePwd !== this.formRegister.password
      ) {
        this.validateMatchPassword = true;
      } else this.validateMatchPassword = false;
    },
    validateEmail() {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.isChange = true;
      if (pattern.test(this.formRegister.email)) {
        this.checkEmail = false;
      } else this.checkEmail = true;
    },
    async submitSignUp() {
      this.disabledBtn = true;
      this.toast.open = false;
      if (!this.validateMatchPassword && this.$refs.form.validate()) {
        const body = _.omit(this.formRegister, ["rePwd"]);
        const result = await createCustomer(body);
        if (result.statusCode === 201) {
          localStorage.setItem("token", result.data);
          this.$router.push({ path: "/customer/orders" });
        } else {
          let infoToast = {
            color: "warning",
            content: result.message,
            open: true,
          };
          this.disabledBtn = false;
          this.toast = infoToast;
        }
      } else this.disabledBtn = false;
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
    @media screen and (max-width: 768px) {
      font-size: 34px;
    }
    @media screen and (max-width: 425px) {
      font-size: 28px;
      text-align: center;
    }
  }
  p {
    color: #5d6e85;
    @media screen and (max-width: 425px) {
      text-align: center;
    }
  }
  .main-page-content {
    background: #fff;
    min-width: 80%;
    box-shadow: 30px 30px 60px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    //height: 80vh;

    .tablet-d-flex {
      @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
      }
    }
    .left-login {
      .reg-input {
        height: 44px;
      }
      .v-text-field {
        input {
          border: none;
        }
      }
      @media screen and (max-width: 1024px) {
        padding: 30px 40px !important;
      }

      @media screen and (max-width: 425px) {
      }
    }
    .right-login {
      background: linear-gradient(141.38deg, #eafafa 24.75%, #d5f6f5 73.56%);
      border-radius: 0 20px 20px 0;
      @media screen and (max-width: 768px) {
        border-radius: 20px 20px 0 0;
        background: #fff;
        padding-top: 20px;
        padding-bottom: 0px;
      }
      .login-logo {
        width: 250px;
        @media screen and (max-width: 768px) {
          width: 200px;
        }
        @media screen and (max-width: 425px) {
          width: 150px;
        }
      }
    }
    .validateRePassword {
      font-size: 14px;
      color: red;
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
.eye {
  position: absolute;
  right: 0;
  bottom: 0;
}
.ico-right {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
