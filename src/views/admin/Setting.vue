<template>
  <div class="main-cutoms settings-page">
    <v-row v-if="loading">
      <v-col class="col-12">
        <div class="mb-12">
          <div>
            <v-row>
              <v-col>
                <div class="setting">
                  <div class="setting__header">
                    <h2>API ShipEvery</h2>
                    <img :src="iconSave" />
                  </div>
                  <div class="setting__content">
                    <v-form ref="form" v-model="checkShipE">
                      <div class="form-group">
                        <label>Name</label>
                        <v-text-field
                          v-model="apiShipevery.name"
                          outlined
                          dense
                          :rules="rules.nameApiShipEveryRules"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <label>API ID</label>
                        <v-text-field
                          v-model="apiShipevery.publicKey"
                          outlined
                          dense
                          :rules="rules.idApiShipEveryRules"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <label>API Value</label>
                        <v-text-field
                          v-model="apiShipevery.privateKey"
                          outlined
                          dense
                          type="password"
                          :rules="rules.apiValueShipEveryRules"
                        ></v-text-field>
                      </div>
                    </v-form>
                  </div>
                  <div class="pa-3 text-right pt-0">
                    <Button
                      label="Save ShipE"
                      color="primary"
                      :disabled="disabledBtnShipE || !checkShipE"
                      :progress="disabledBtnShipE"
                      @submit:btnSubmit="updateShipE"
                    />
                  </div>
                </div>
              </v-col>
              <v-col>
                <div class="setting">
                  <div class="setting__header">
                    <h2>API Square</h2>
                    <img :src="iconNoSave" />
                  </div>
                  <div class="setting__content">
                    <v-form ref="form" v-model="checkSquare">
                      <div class="form-group">
                        <label>Name</label>
                        <v-text-field
                          v-model="apiSquare.name"
                          outlined
                          dense
                          :rules="rules.nameAPISquareRules"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <label>API ID</label>
                        <v-text-field
                          v-model="apiSquare.locationId"
                          outlined
                          dense
                          :rules="rules.idAPISquareRules"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <label>API Token</label>
                        <v-text-field
                          v-model="apiSquare.token"
                          type='password'
                          outlined
                          dense
                          :rules="rules.apiValueSquareRules"
                        ></v-text-field>
                      </div>
                    </v-form>
                    <!-- <p>Pharetra arcu, amet, bibendum donec</p>
                    <p>Id est, sed viverra lacus</p>
                    <p>Turpis parturient malesuada molestie scelerisque</p> -->
                  </div>
                  <div class="pa-3 text-right pt-0">
                    <Button
                      label="Save Square"
                      color="primary"
                      :disabled="disabledBtnSquare || !checkSquare"
                      :progress="disabledBtnSquare"
                      @submit:btnSubmit="updateSquare"
                    />
                  </div>
                </div>
                <!-- <div class="setting mt-13">
                  <div class="setting__header">
                    <h2>Setting 4</h2>
                  </div>
                  <div class="setting__content">
                    <p>Integer velit amet, ipsum amet</p>
                    <p>A diam habitasse scelerisque faucibus</p>
                    <p>Malesuada in dui ut id</p>
                  </div>
                </div> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="setting">
                  <div class="setting__header">
                    <h2>Mailgun</h2>
                    <img :src="iconSave" />
                  </div>
                  <div class="setting__content">
                    <v-form ref="form" v-model="checkMailgun">
                      <div class="form-group">
                        <label>Email Sender</label>
                        <v-text-field
                          v-model="mailGun.sender"
                          outlined
                          dense
                          :rules="rules.nameMailgunRules"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <label>API ID</label>
                        <v-text-field
                          v-model="mailGun.keyId"
                          outlined
                          dense
                          type='password'
                          :rules="rules.idMailgunRules"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <label>API Domain</label>
                        <v-text-field
                          v-model="mailGun.baseUrl"
                          outlined
                          dense
                          :rules="rules.apiValueMailgunRules"
                        ></v-text-field>
                      </div>
                    </v-form>
                  </div>
                  <div class="pa-3 text-right pt-0">
                    <Button
                      label="Save Mailgun"
                      color="primary"
                      :disabled="disabledBtnMailgun || !checkMailgun"
                      :progress="disabledBtnMailgun"
                      @submit:btnSubmit="updateMailgun"
                    />
                  </div>
                </div>
              </v-col>
              <v-col>
                <div class="setting">
                  <div class="setting__header">
                    <h2>Guihang.us Info</h2>
                    <img :src="iconNoSave" />
                  </div>
                  <div class="setting__content">
                    <v-form ref="form" v-model="checkGHUSinfo">
                      <div class="form-group">
                        <label>System mail</label>
                        <v-text-field
                          v-model="guihangInfo.sysEmail"
                          outlined
                          dense
                          :rules="rules.systemMailRules"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <label>Telephone</label>
                        <v-text-field
                          v-model="guihangInfo.telephone"
                          outlined
                          dense
                          v-mask="'###-###-#####'"
                          :rules="rules.telephoneRules"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <label>Hotline</label>
                        <v-text-field
                          v-model="guihangInfo.hotline"
                          outlined
                          dense
                          v-mask="'###-###-#####'"
                          :rules="rules.hotlineRules"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <label>Address</label>
                        <v-text-field
                          v-model="guihangInfo.address"
                          outlined
                          dense
                          :rules="rules.addressRules"
                        ></v-text-field>
                      </div>
                    </v-form>
                  </div>
                  <div class="pa-3 text-right pt-0">
                    <Button
                      label="Save Info"
                      color="primary"
                      :disabled="disabledBtnGHUSinfo || !checkGHUSinfo"
                      :progress="disabledBtnGHUSinfo"
                      @submit:btnSubmit="updateGHUSInfo"
                    />
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- <div v-else cla> -->
    <div class="text-center" v-else>
      <v-progress-circular
        indeterminate
        :size="20"
        :width="3"
        color="primary"
      ></v-progress-circular>
    </div>
    <Toast :toast="toast" />
  </div>
</template>

<script>
import Vue from 'vue'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

import { 
  configData, 
  updateSquare, 
  updateMailGun, 
  updateGHUSInfo, 
  updateShipE 
} from "@store/setting";

import Button from "@component/shares/Button";
import Toast from "@component/Toast";

const iconSave = require("../../assets/images/common/customer/save.svg");
const iconNoSave = require("../../assets/images/common/customer/no-save.svg");
export default {
  name: "Setting",
  components: { Button, Toast },
  data: () => ({
    iconSave,
    iconNoSave,
    loading: false,
    checkShipE: false,
    checkSquare: false,
    checkMailgun: false,
    checkGHUSinfo: false,
    disabledBtnShipE: false,
    disabledBtnSquare: false,
    disabledBtnMailgun: false,
    disabledBtnGHUSinfo: false,
    stepper: {
      package: false,
      from: false,
      to: false
    },
    apiShipevery: {
      name: "",
      publicKey: "",
      privateKey: "",
    },
    apiSquare:{
      locationId: "",
      token: "",
      name: ""
    },
    guihangInfo:{
      sysEmail: "",
      telephone: "",
      hotline: "",
      address: "",
    },
    mailGun:{
      keyId: "",
      sender: "",
      baseUrl: ""
    },
    toast: {
      color: "",
      content: "",
      open: false,
    },
    rules: {
      nameApiShipEveryRules: [value => !!value || "Name field is required"],
      idApiShipEveryRules: [value => !!value || "API ID field is required"],
      apiValueShipEveryRules: [
        value => !!value || "API Value field is required"
      ],
      nameMailgunRules: [value => !!value || "Name field is required"],
      idMailgunRules: [value => !!value || "API ID field is required"],
      apiValueMailgunRules: [
        value => !!value || "API Value field is required"
      ],
      nameAPISquareRules: [value => !!value || "Name field is required"],
      idAPISquareRules: [value => !!value || "API ID field is required"],
      apiValueSquareRules: [value => !!value || "API Value field is required"],
      systemMailRules: [
        value => !!value || "Email field is required",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "The email address entered is invalid";
        }
      ],
      telephoneRules: [
        value => !!value || "Telephone field is required",
        value =>
          (value || "").length >= 10 ||
          "The telephone number has minimum 10 characters",
        value => {
          const pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
          return (
            pattern.test(value) || "The telephone number entered is invalid"
          );
        }
      ],
      hotlineRules: [
        value => !!value || "Hotline field is required",
        value =>
          (value || "").length >= 10 ||
          "The hotline number has minimum 10 characters",
        value => {
          const pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
          return pattern.test(value) || "The hotline number entered is invalid";
        }
      ],
      addressRules: [value => !!value || "Address field is required"]
    }
  }),
  created(){
    this.getData()
  },
  methods:{
    async getData(){
      const result = await configData()
      if(result.statusCode === 200){
        if(result.data.api) this.apiShipevery = result?.data?.api
        if(result.data.apiSquare) this.apiSquare = result?.data?.apiSquare
        if(result.data.info) this.guihangInfo = result?.data?.info
        if(result.data.apiMailgun) this.mailGun = result?.data?.apiMailgun
      }
      this.loading = true
    },
    async updateShipE(){
      this.toast.open = false
      this.disabledBtnShipE = true
      const infoToast = {
        color: "success",
        content: "Updated API ShipEvery successfully!",
        open: true,
      }
      if(this.checkSquare){
        const result = await updateShipE(this.apiShipevery)
        if(result.statusCode !== 200){
          infoToast.color = "warning"
          infoToast.content = "Update API ShipEvery failed!"
        }
        this.toast = infoToast
        this.disabledBtnShipE = false
      }
    },
    async updateSquare(){
      this.toast.open = false
      this.disabledBtnSquare = true
      const infoToast = {
        color: "success",
        content: "Updated API Square successfully!",
        open: true,
      }
      if(this.checkSquare){
        const result = await updateSquare(this.apiSquare)
        if(result.statusCode !== 200){
          infoToast.color = "warning"
          infoToast.content = "Update API Square failed!"
        }
        this.toast = infoToast
        this.disabledBtnSquare = false
      }
    },
    async updateMailgun(){
      this.toast.open = false
      this.disabledBtnMailgun = true
      const infoToast = {
        color: "success",
        content: "Updated Mailgun successfully!",
        open: true,
      }
      if(this.checkMailgun){
        const result = await updateMailGun(this.mailGun)
        if(result.statusCode !== 200){
          infoToast.color = "warning"
          infoToast.content = "Update Mailgun failed!"
        }
        this.toast = infoToast
        this.disabledBtnMailgun = false
      }
    },
    async updateGHUSInfo(){
      this.toast.open = false
      this.disabledBtnGHUSinfo = true
      const infoToast = {
        color: "success",
        content: "Updated Info successfully!",
        open: true,
      }
      if(this.checkGHUSinfo){
        const result = await updateGHUSInfo(this.guihangInfo)
        if(result.statusCode !== 200){
          infoToast.color = "warning"
          infoToast.content = "Update Info failed!"
        }
        this.toast = infoToast
        this.disabledBtnGHUSinfo = false
      }
    }
  }
};
</script>
<style lang="scss">
.breadcrumns {
  span {
    color: #8692a4;
    font-size: 18px;
    font-weight: 700;
  }
  a {
    color: #5d6e85 !important;
    font-size: 18px;
  }
}
.setting {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  background: #ffffff;
  h2 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.2px;
    color: #5d6e85;
  }
  .setting__header {
    border-bottom: 1px solid #eafafa;
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .setting__content {
    padding: 30px 30px 10px 30px;
    p {
      border-bottom: 1px solid #d5f6f5;
      padding-top: 20px;
      padding-bottom: 20px;
      margin: 0;

      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.1px;
      color: #354a67;
    }
    p:nth-last-child(1) {
      border: none;
    }
  }
}
</style>
