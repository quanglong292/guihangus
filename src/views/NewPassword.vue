<template>
  <v-layout>
    <v-main>
      <div class="main-login d-flex items-center justify-center form-login pa-5">
        <v-container>
          <div class="main-page-content relative">
          <div class="ico-back" @click="$router.go(-1)"
            ><img :src="back" width="60"
          /></div>
          <v-row
            class="d-block d-sm-none text-center pt-12 pb-2"
          >
            <router-link to="/">
              <img :src="logo" width="150" />
            </router-link>
          </v-row>
          <v-row class="no-margin d-flex h-full">
            <v-col class="left-login pa-5 px-sm-16 py-sm-10 ">
              <h2>New Password</h2>
              <p class="mb-4">
                Your password must have:
              </p>
              <p class="d-flex mb-2"
              :class="{
                'check-success': isChange && !!validate.checkLenght,
                'check-error': isChange && !validate.checkLenght,
              }">
                <span class="ico mr-2"
                  ><svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      :d="isChange && !validate.checkLenght ? 
                      'M8.31555 7.05263L3.26291 2M8.31555 7.05263L14.6313 13.3684M8.31555 7.05263L13.3682 2M5.94712 9.42105L1.99976 13.3684' 
                      : 'M14 4L8.66667 9.33333M5.75 12.25L2 8.5'"
                      stroke="#AEB7C2"
                      stroke-width="2"
                      stroke-linecap="round"
                    /></svg></span
                >At least 8 characters long.
              </p>
              <p class="d-flex align-center mb-2 "
              :class="{
                'check-success': isChange && validate.checkCharacters,
                'check-error': isChange && !validate.checkCharacters,
              }">
                <span class="ico mr-2"
                  ><svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      :d="isChange && !validate.checkCharacters ? 
                      'M8.31555 7.05263L3.26291 2M8.31555 7.05263L14.6313 13.3684M8.31555 7.05263L13.3682 2M5.94712 9.42105L1.99976 13.3684' 
                      : 'M14 4L8.66667 9.33333M5.75 12.25L2 8.5'"
                      stroke="#AEB7C2"
                      stroke-width="2"
                      stroke-linecap="round"
                    /></svg
                ></span>
                Characters from 3 different groups (lowercase, uppercase,
                numbers, symbols).
              </p>
              <p class="mb-16 d-flex align-center"
              :class="{
                'check-success': isChange && !!validate.checkMatch,
                'check-error': isChange && !validate.checkMatch,
              }">
                <span class="ico mr-2"
                  ><svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      :d="isChange && !validate.checkMatch ? 
                      'M8.31555 7.05263L3.26291 2M8.31555 7.05263L14.6313 13.3684M8.31555 7.05263L13.3682 2M5.94712 9.42105L1.99976 13.3684' 
                      : 'M14 4L8.66667 9.33333M5.75 12.25L2 8.5'"
                      stroke="#AEB7C2"
                      stroke-width="2"
                      stroke-linecap="round"
                    /></svg></span
                >Password and confirm password does not match.
              </p>
              <v-form ref="form" v-on:submit.prevent>
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
                      v-model="infoUser.pwd"
                      :rules="rules.pwd"
                      @click:append="showPwd = !showPwd"
                      @input="validatePwd"
                      v-on:keyup.enter="submit"
                      class="set-height"
                    ></v-text-field>
                  </div>
                </div>
                <div class="mt-6">
                  <div class="mb-0 relative">
                    <label class="d-block mb-0 mb-2">Repeat Password</label>
                    <v-text-field
                      :append-icon="showRePwd ? 'mdi-eye' : 'mdi-eye-off'"
                      hide-details="auto"
                      color="primary"
                      dense
                      chips
                      small-chips
                      :type="showRePwd ? 'text' : 'password'"
                      placeholder="Enter your password"
                      v-model="infoUser.repwd"
                      :rules="rules.repwd"
                      @click:append="showRePwd = !showRePwd"
                      @input="validateRePwd"
                      v-on:keyup.enter="submit"
                      class="set-height"
                    ></v-text-field>
                  </div>
                </div>
              </v-form>
              <Button 
                label="Confirm" 
                color="btn-primary mt-16"
                :disabled="disabledBtn"
                @submit:btnSubmit ="submit"
              />
            </v-col>
            <v-col class="right-login d-none d-sm-flex justify-center align-center">
              <router-link to="/">
                <img :src="logo" width="250"/>
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
import { changePass } from "@store/user";
import _ from "lodash";

import Toast from "@component/Toast";
import Button from "@component/shares/Button";

const logo = require("../assets/logo-black.png");
const back = require('../assets/images/common/back.png')

export default {
  name: "NewPassword",
  components: { Toast, Button },
  data: () => ({
    logo,
    back,
    showPwd: false,
    showRePwd: false,
    isChange: false,
    disabledBtn: false,
    validate:{
      checkLenght: false,
      checkCharacters: false,
      checkMatch: false
    },
    toast: {
      color: "",
      content: "",
      open: false,
    },
    infoUser:{
      pwd: '',
      repwd: '',
    },
    error: {
      identifier: "Email don't match!",
      pwd: "Please enter password!",
    },
    rules: {
      pwd: [
        value => !!value || 'Please enter your password',
      ],
      repwd: [
        value => !!value || 'Please enter re-password',
      ],
    },
  }),
  methods: {
    validatePwd(){
      this.isChange = true
      const checkCharacters = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/g
      this.validate.checkLenght = this.infoUser.pwd.length >= 8 ? true : false
      this.validate.checkCharacters = checkCharacters.test(this.infoUser.pwd) ? true : false
    },
    validateRePwd(){
      this.isChange = true
      this.validate.checkMatch = (this.infoUser.pwd === this.infoUser.repwd) ? true : false
    },
    async submit() {
      this.toast.open = false
      this.disabledBtn = true
      let infoToast = {
        color: "warning",
        content: "Password not match!",
        open: false
      }
      if(!_.findKey(this.validate,(o)=>{return o === false})){
        const result = await changePass({pass: this.infoUser.pwd, confirmPass: this.infoUser.repwd})
        if(result.data && result.statusCode == 201){
          localStorage.setItem('token', result.data)
          this.$router.push({ path: '/customer/orders' })
        }else{
          infoToast.content = result.message
          infoToast.open = true
          this.disabledBtn = false
        }
      }else{
        infoToast.open = true
        this.disabledBtn = false
      }
      this.toast = infoToast
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
    height: 800px;
    .left-login {
      margin-top: 70px;
      .v-text-field {
        input {
          border: none;
        }
      }
    }
    .right-login {
      background: linear-gradient(141.38deg, #eafafa 24.75%, #d5f6f5 73.56%);
      border-radius: 0 20px 20px 0;
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
  bottom: 0;
}
.set-height {
    height: 40px;
  }
@media only screen and (max-width: 600px) {
  .h-full {
    height: 0;
  }
  .main-login h2 {
    font-size: 40px;
  }
  .main-login .main-page-content .left-login {
      margin-top: 0;
  }
}
</style>
