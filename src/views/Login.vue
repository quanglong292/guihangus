<template>
  <v-layout>
    <v-main>
      <div class="main-login pa-8 pa-md-0 d-flex items-center justify-center form-login">
        <v-container>
          <div class="main-page-content">
          <v-row class="d-block d-sm-none text-center pt-12">
            <router-link to="/">
              <img :src="logoBlack" width="150" />
            </router-link>
          </v-row>
          <v-row class="d-block d-sm-flex h-full mt-sm-0">
            <v-col class="left-login pa-7 px-md-16 py-md-10">
              <h2>Sign In</h2>
              <p class="mb-12">Welcome, we missed you!</p>
              <v-form ref="form" v-on:submit.prevent>
                <div class="mt-4">
                  <div class="mb-0">
                    <label class="d-block mb-0 mb-2">Your Email</label>
                    <div class="relative">
                      <v-text-field
                        color="primary"
                        hide-details="auto"
                        dense
                        chips
                        small-chips
                        type="text"
                        placeholder="Enter your email"
                        v-model="infoUser.email"
                        :rules="rules.email"
                        @input="validateEmail"
                        v-on:keyup.enter="submit"
                        class="set-height"
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
                <div class="mt-4">
                  <div class="mb-0 relative">
                    <label class="d-block mb-0 mb-2">Password</label>
                    <v-text-field
                      :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                      hide-details="auto"
                      color="primary"
                      dense
                      chips
                      small-chips
                      :type="showPwd ? 'text' : 'password'"
                      placeholder="Enter your password"
                      v-model="infoUser.password"
                      :rules="rules.password"
                      @click:append="showPwd = !showPwd"
                      v-on:keyup.enter="submit"
                      class="set-height"
                    ></v-text-field>
                  </div>
                </div>
              </v-form>
              <div class="d-flex align-center justify-space-between mt-4">
                <div class="mb-0 d-flex align-center">
                  <v-checkbox
                    v-model="remember"
                    color="primary"
                    label="Remember me"
                  ></v-checkbox>
                </div>
                <router-link to="/forgot-password" class=""
                  >Forgot Password?</router-link
                >
              </div>
              <Button
                label="Sign In"
                color="btn-primary"
                :disabled="disabledBtn"
                @submit:btnSubmit="submit"
              />
              <div class="d-flex justify-center mt-4">
                Don’t have an account?
                <router-link to="/register" class="ml-2"
                  >Click here.</router-link
                >
              </div>
            </v-col>
            <v-col
              class="right-login d-none d-sm-flex justify-center align-center"
            >
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
import { Login } from "@store/auth";
import { getInfoUser } from "@store/user";
import _ from "lodash";

import Toast from "@component/Toast";
import Button from "@component/shares/Button";

const logoBlack = require("../assets/logo-black.png");

export default {
  name: "Login",
  components: { Toast, Button },
  data: () => ({
    logoBlack,
    showPwd: false,
    checkEmail: false,
    isChange: false,
    disabledBtn: false,
    remember: false,
    toast: {
      content: "",
      open: false,
    },
    role: "",
    infoUser: {
      email: "",
      password: "",
    },
    error: {
      email: "Email don't match!",
      password: "Please enter password!",
    },
    rules: {
      password: [(value) => !!value || "Please enter your password"],
      email: [
        (value) => !!value || "Email field is required",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "The email address entered is invalid";
        },
      ],
    },
  }),
  created() {
    const email = window["emailExisted"];
    if (email) this.infoUser.email = email;
  },
  methods: {
    async submit() {
      this.toast.open = false;
      this.disabledBtn = true;
      const check = _.findKey(this.infoUser, function (o) {
        return o === "";
      });
      let infoToast = {
        color: !check && this.$refs.form.validate() ? "success" : "warning",
        content: "Login Successfull !",
        open: true,
      };
      if (!check && this.$refs.form.validate()) {
        const result = await Login(this.infoUser);
        if (result.statusCode == 201) {
          localStorage.setItem("token", result.data);
          // console.log(this.remember);
          // this.$cookies.set("token", result.data, null, null, process.env.VUE_APP_API_URL);
          // if(this.remember) this.$cookies.set("token", result.data)
          this.checkRole();
        } else {
          infoToast.content = "Login Fails !";
          infoToast.color = "warning";
          this.disabledBtn = false;
        }
      } else {
        infoToast.content = `${this.error[check] || this.error.phone}`;
        this.disabledBtn = false;
      }
      this.toast = infoToast;
    },
    async checkRole() {
      const result = await getInfoUser();
      if (result.statusCode === 200) {
        const user = _.pick(result?.data, [
          "address",
          "avatar",
          "email",
          "fullName",
          "phone",
          "_id",
          "role",
        ]);
        localStorage.setItem("user", JSON.stringify(user));
        this.role = result?.data?.role || null;
        if (this.role) {
          let url = "/customer";
          if (this.role !== "Customer") url = "/admin";
          this.$router.push({ path: url });
        }
      }
    },
    validateEmail() {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.isChange = true;
      if (pattern.test(this.infoUser.email)) {
        this.checkEmail = false;
      } else this.checkEmail = true;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
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
        margin: auto 0;
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
  .relative {
    position: relative;
  }
  .absolute {
    position: absolute;
  }
  .ico-right {
    position: absolute;
    right: 0;
    top: 0px;
  }
}
.set-height {
  height: 30px;
}
@media only screen and (max-width: 600px) {
  // .h-full {
  //   height: 0;
  // }
}
</style>
