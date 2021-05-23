<template>
  <div class="password-page">
    <v-form ref="form">
      <v-row>
        <v-col>
          <!-- <v-card> -->
            <div class="mb-8">
              <div class="mb-0 relative">
                <label class="d-block mb-0 mb-2">Current Password</label>
                <v-text-field
                  :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  hide-details="auto"
                  color="primary"
                  dense
                  chips
                  small-chips
                  outlined
                  :type="showPwd ? 'text' : 'password'"
                  v-model="currentPwd"
                  :rules="rules.currentPwd"
                  placeholder="Enter your password"
                  @click:append="showPwd = !showPwd"
                ></v-text-field>
              </div>
            </div>
            <div class="mb-8">
              <div class="mb-0 relative">
                <label class="d-block mb-0 mb-2">New Password</label>
                <v-text-field
                  :append-icon="showNewPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  hide-details="auto"
                  color="primary"
                  dense
                  chips
                  small-chips
                  outlined
                  :type="showNewPwd ? 'text' : 'password'"
                  placeholder="Enter your password"
                  :rules="rules.newpwd"
                  v-model="infoUser.pwd"
                  @click:append="showNewPwd = !showNewPwd"
                  @input="validatePwd"
                ></v-text-field>
              </div>
            </div>
            <div class="mb-8">
              <div class="mb-0 relative">
                <label class="d-block mb-0 mb-2">Repeat Password</label>
                <v-text-field
                  :append-icon="showRePwd ? 'mdi-eye' : 'mdi-eye-off'"
                  hide-details="auto"
                  color="primary"
                  dense
                  chips
                  small-chips
                  outlined
                  :type="showRePwd ? 'text' : 'password'"
                  placeholder="Enter your password"
                  :rules="rules.repwd"
                  v-model="infoUser.repwd"
                  @click:append="showRePwd = !showRePwd"
                  @input="validateRePwd"
                ></v-text-field>
              </div>
            </div>
            <div class="btn-bottom">
              <Button
                label="Change Password"
                color="px-10 btn-primary mR0"
                :disabled="
                  disabledBtn ||
                  !validate.checkCharacters ||
                  !validate.checkMatch ||
                  !validate.checkLenght
                "
                :progress="disabledBtn"
                @submit:btnSubmit="submit"
              />
              <!-- <Button label="Cancel" color="px-10 btn-grey" /> -->
            </div>
          <!-- </v-card> -->
        </v-col>
        <v-col>
          <!-- <v-card> -->
            <p class="title-noted">Your password must have:</p>
            <p
              class="d-flex mb-2"
              :class="{
                'check-success': isChange && !!validate.checkLenght,
                'check-error': isChange && !validate.checkLenght,
              }"
            >
              <span class="ico mr-2"
                ><svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    :d="
                      isChange && !validate.checkLenght
                        ? 'M8.31555 7.05263L3.26291 2M8.31555 7.05263L14.6313 13.3684M8.31555 7.05263L13.3682 2M5.94712 9.42105L1.99976 13.3684'
                        : 'M14 4L8.66667 9.33333M5.75 12.25L2 8.5'
                    "
                    stroke="#AEB7C2"
                    stroke-width="2"
                    stroke-linecap="round"
                  /></svg></span
              >At least 8 characters long.
            </p>
            <p
              class="d-flex align-center mb-2"
              :class="{
                'check-success': isChange && !!validate.checkCharacters,
                'check-error': isChange && !validate.checkCharacters,
              }"
            >
              <span class="ico mr-2"
                ><svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    :d="
                      isChange && !validate.checkCharacters
                        ? 'M8.31555 7.05263L3.26291 2M8.31555 7.05263L14.6313 13.3684M8.31555 7.05263L13.3682 2M5.94712 9.42105L1.99976 13.3684'
                        : 'M14 4L8.66667 9.33333M5.75 12.25L2 8.5'
                    "
                    stroke="#AEB7C2"
                    stroke-width="2"
                    stroke-linecap="round"
                  /></svg
              ></span>
              Characters from 3 different groups (lowercase, uppercase, numbers,
              symbols).
            </p>
            <p
              class="mb-16 d-flex align-center"
              :class="{
                'check-success': isChange && !!validate.checkMatch,
                'check-error': isChange && !validate.checkMatch,
              }"
            >
              <span class="ico mr-2"
                ><svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    :d="
                      isChange && !validate.checkMatch
                        ? 'M8.31555 7.05263L3.26291 2M8.31555 7.05263L14.6313 13.3684M8.31555 7.05263L13.3682 2M5.94712 9.42105L1.99976 13.3684'
                        : 'M14 4L8.66667 9.33333M5.75 12.25L2 8.5'
                    "
                    stroke="#AEB7C2"
                    stroke-width="2"
                    stroke-linecap="round"
                  /></svg></span
              >Password and confirm password does not match.
            </p>
            <div class="img-noted">
            <img src="../../assets/images/common/note-password.svg" />

            </div>
          <!-- </v-card> -->
        </v-col>
        <Toast :toast="toast" />
      </v-row>
    </v-form>
  </div>
</template>

<script>
import Button from "@component/shares/Button";
import Toast from "@component/Toast";

import { changePwd } from "@store/auth";
import _ from "lodash";

export default {
  name: "PasswordComponent",
  props: {},
  components: {
    Button,
    Toast
  },
  data: () => ({
    role: null,
    showPwd: false,
    showNewPwd: false,
    showRePwd: false,
    isChange: false,
    disabledBtn: false,
    validate:{
      checkLenght: false,
      checkCharacters: false,
      checkMatch: false
    },
    currentPwd: null,
    infoUser:{
      pwd: null,
      repwd: null,
    },
    toast: {
      color: "",
      content: "",
      open: false,
    },
    error: {
      identifier: "Email don't match!",
      pwd: "Please enter password!",
    },
    rules: {
      currentPwd: [
        value => !!value || 'Please enter current password!.',
      ],
      newpwd: [
        value => !!value || 'Please enter new password!.',
      ],
      repwd: [
        value => !!value || 'Please enter repeat password!.',
      ],
    },
  }),
  created(){
    this.role = JSON.parse(localStorage.getItem("user"))?.role;
  },
  methods:{
   validatePwd(){
      this.isChange = true
      const checkCharacters = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/g
      this.validate.checkLenght = this.infoUser?.pwd?.length >= 8 ? true : false || false
      this.validate.checkCharacters = checkCharacters.test(this.infoUser?.pwd) ? true : false
    },
     validateRePwd(){
      this.isChange = true
      this.validate.checkMatch = false
      if(this.infoUser.pwd){
        this.validate.checkMatch = (this.infoUser.pwd === this.infoUser.repwd) ? true : false
      }
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
        const result = await changePwd({oldPassword: this.currentPwd, newPassword: this.infoUser.pwd})
        if(result.data && result.statusCode == 201){
          this.$refs.form.reset()
          infoToast.color = "success",
          infoToast.content = result.message
          infoToast.open = true
        }else{
          infoToast.content = result.message
          infoToast.open = true
        }
      }else{
        infoToast.open = true
      }
      this.disabledBtn = false
      this.toast = infoToast
    },
    gotoProfilePage(){
      this.$router.push({path: `/${this.role !== 'Customer' ? 'admin' : 'customer'}/profile`})
    }
  }
};
</script>
<style lang="scss" >
.password-page {
  .title-noted{
    font-weight: 300;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.1px;
    color: #696A6C;
  }
  .img-noted{
    text-align: center;
    margin: 0 auto;
  }
  .v-card {
    padding: 50px !important;
    height: 570px;
  }
  .btn-bottom {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-top: 120px;
    .v-btn {
      display: inline-block;
      width: auto !important;
      height: 50px !important;
      text-transform: inherit !important;
      font-weight: bold;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      letter-spacing: 0.1px;
      padding: 0 15px !important;
      &:first-child {
        margin-right: 50px;
      }
      &.btn-primary {
        color: #fff !important;
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .row {
    display: block;
  }
}
</style>
