<template>
  <v-layout>
    <v-main>
      <div class="main-login pa-8 p-sm-0 d-flex items-center justify-center form-login">
        <v-container>
          <div class="main-page-content relative">
          <div class="ico-back" @click="$router.go(-1)"
            ><img :src="require('../assets/images/common/back.png')" width="60"
          /></div>
            <v-row
            class="d-block d-sm-none text-center pt-12 pb-2"
          >
            <router-link to="/">
              <img :src="logoBlack" width="150" />
            </router-link>
          </v-row>
          <v-row class="no-margin d-flex h-full">
            <v-col class="left-login pa-5 px-sm-16 py-sm-10 ">
              <h2>Verification code</h2>
              <p>Please enter the vertification code we sent to your email:</p>
              <div class="mt-16">
                <div class="mb-0 relative">
                  <v-text-field
                    color="primary"
                    hide-details="auto"
                    dense
                    chips
                    small-chips
                    type="text"
                    placeholder="Enter verification code"
                    :rules="rules.code"
                    v-model="code"
                    v-on:keyup.enter="submitVerifi"
                    class="set-height"
                  ></v-text-field>
                </div>
              </div>
              <div class="d-flex justify-space-between mt-8">
                <p class="font-italic">Your code will expire in 0{{this.timeExpireMinutes}}:{{this.timeExpireSeconds > 10 ? '' : 0}}{{this.timeExpireSeconds}}</p>
                <router-link to="">Resend vertification code</router-link>
              </div>
              <!-- <v-btn class="btn-primary mt-16" height="50" @click="submitVerifi">Submit</v-btn> -->
              <Button 
                label="Submit" 
                color="btn-primary mt-12"
                :disabled="disabledBtn"
                @submit:btnSubmit ="submitVerifi"
              />
            </v-col>
            <v-col class="right-login d-none d-sm-flex justify-center align-center">
              <router-link to="/">
                <img :src="logoBlack" width="250"/>
              </router-link>
            </v-col>
          </v-row>
          </div>
        </v-container>
      </div>
    </v-main>
    <Toast :toast="toast"/>
  </v-layout>
</template>
<script>
import { verifyCode } from "@store/user";

import Toast from "@component/Toast";
import Button from "@component/shares/Button";

const logoBlack = require('../assets/logo-black.png')

export default {
  name: "Login",
  components: { Toast, Button },
  data: () => ({
    logoBlack,
    timeExpire: 180,
    timeExpireSeconds: 0,
    timeExpireMinutes: 0,
    code: null,
    email: null,
    disabledBtn: false,
    toast:{
      content: '',
      open: false
    },
    rules:{
      code: [
        value => !!value || 'Code field is required',
        (value) => (value || "").length == 4 || "Code has 4 characters",
      ]
    }
  }),
  created() {
    const time = setInterval(() => {
      this.timeExpire -= 1
      this.timeExpireSeconds = this.timeExpire%60
      this.timeExpireMinutes = Math.floor(this.timeExpire/60)
    }, 1000);
    setTimeout(() => {
      clearInterval(time)
    }, 180000);
    this.email = localStorage.getItem('emailForgot')
    if(!this.email) this.$router.push({path: '/forgot-password'})
  },
  methods:{
    async submitVerifi(){
      this.disabledBtn = true
      this.toast.open = false
      let infoToast = {
        color: "success",
        content: "Vertify code successful!",
        open: true
      } 
      if(this.email){
        if(this.timeExpire > 0 && this.code){
          const result = await verifyCode({email: this.email, code: this.code})
          if(result.statusCode === 200){
            localStorage.removeItem('emailForgot');
            this.$router.push({path: `/new-password?token=${result.data}`})
          }else {
            this.disabledBtn = false
            infoToast.color = 'warning'
            infoToast.content = 'Code is not match'
          }
        }else{
          this.disabledBtn = false
          infoToast.color = 'warning'
          infoToast.content = 'Code have expired'
        }
        this.toast = infoToast
      }
    }
  }
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
.ico-back {
  position: absolute;
  top: 40px;
  left: -30px;
}
@media only screen and (max-width: 600px) {
  .h-full {
    height: 0;
  }
  .set-height {
    height: 40px;
  }
}
</style>
