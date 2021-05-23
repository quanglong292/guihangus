<template>
  <div class="place-page">
    <div class="top-address">
      <h3 class="mb-4">Sender’s Address</h3>
      <div @click="openDialogAddress(true)" class="cursor-pointer text-center">
        <img :src="iconAdd" />
      </div>
    </div>
    <div class="list-address">
      <div
        class="address-item text-center relative px-4 py-4"
        v-for="(address, index) of user.address"
        :key="index"
      >
        <!-- <img :src="iconLocation" class="mb-4" /> -->
        <h3 class="mb-2">{{ address.StreetLines }}</h3>
        <p>
          {{ address.City }}, {{ address.StateOrProvinceCode }},
          {{ address.PostalCode }}
        </p>
        <!-- <p>Billing address</p> -->
        <p class="ico_close">
          <span class="pa-1 cursor-pointer" @click="removeAddress(index)">
            <img :src="iconClose" />
          </span>
        </p>
      </div>
    </div>
    <!-- <v-row class="mb-6 align-center"> -->
    <!-- <v-col md="3" >
       
      </v-col> -->

    <!-- <div class="address-item text-center px-4 py-4 relative mr-10 mb-10"
        v-for="(address, index) of user.address" :key="index">
        <img :src="iconLocation" class="mb-4" />
        <h3 class="mb-2 text-white">{{address.StreetLines}}</h3>
        <p class="mb-4">{{address.City}}, {{address.StateOrProvinceCode}}, {{address.PostalCode}}</p>
        <p>Billing address</p>
        <p class="ico_close">
          <span class="pa-1 cursor-pointer" @click="removeAddress(index)">
            <img :src="iconClose" />
          </span>
        </p>
      </div> -->

    <!-- <v-col
        md="3"
      >
       
      </v-col> -->
    <v-dialog v-model="dialogAddress" max-width="800">
      <v-card>
        <v-card-actions class="justify-end mb-0">
          <v-btn text @click="dialogAddress = false"
            ><v-icon>$close_lg</v-icon></v-btn
          >
        </v-card-actions>
        <div class="px-10">
          <div v-if="isShipper">
            <Shipper
              title="Add new address"
              :place="true"
              :titleClass="true"
              :shipper="shipper"
              @update:shipper="handleUpdate"
            />
          </div>
          <div v-else>
            <Recipient
              title="Add new address"
              :recipient="recipient"
              :places="true"
              :titleClass="true"
              @update:recipient="handleUpdate"
            />
          </div>
        </div>
        <div class="text-center">
          <Button
            label="Save"
            color="my-4 primary"
            :disabled="disabledBtn || !valSave"
            :progress="disabledBtn"
            @submit:btnSubmit="addAddress"
          />
        </div>
      </v-card>
    </v-dialog>
    <!-- </v-row> -->
    <div class="top-address">
      <h3 class="mb-4">Receiver’s Address</h3>
      <div @click="openDialogAddress(false)" class="cursor-pointer text-center">
        <img :src="iconAdd" />
      </div>
    </div>
    <div v-if="!loading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <!-- <v-row  class="mb-6 align-center">
      <v-col md="3" v-for="(reci, index) of recipients" :key="index"> -->
    <div class="list-address" v-else>
      <div
        class="address-item text-center px-4 py-4 relative text-white"
        v-for="(reci, index) of recipients"
        :key="index"
      >
        <!-- <img :src="iconLocation" class="mb-4" /> -->
        <h3 class="mb-2 text-white">{{ reci.fullName }}</h3>
        <p>
          <span>{{ reci.address.line }}</span>
          <br />
          <span
            >{{ reci.address.ward }}, {{ reci.address.district }},
            {{ reci.address.city }}</span
          >
        </p>
        <!-- <p>Billing address</p> -->
        <p class="ico_close">
          <span
            class="pa-1 cursor-pointer"
            @click="removeAddressRecipient(index)"
          >
            <img :src="iconClose" />
          </span>
        </p>
      </div>
    </div>
    <!-- </v-col>
      <v-col md="3"> -->
    <!-- <div
          @click="openDialogAddress(false)"
          class="cursor-pointer text-center"
        >
          <img :src="iconAdd" />
        </div>
      </v-col>
    </v-row> -->
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline text-primary border-gray">
          Are you sure?
        </v-card-title>

        <v-card-text class="pt-5">
          You want to delete this sender address:
          <br>
          <strong>
          {{addressRemove && addressRemove.StreetLines}}, 
          {{addressRemove && addressRemove.City}}, 
          {{addressRemove && addressRemove.StateOrProvinceCode}}, 
          {{addressRemove && addressRemove.PostalCode}}
          </strong>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn
            color="error"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <Button
            label="I Accept"
            color="my-4 primary"
            :disabled="disabledBtn"
            @submit:btnSubmit ="removedAddressShipper"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogRecipient"
      width="500"
    >
      <v-card>
        <v-card-title class="headline text-primary border-gray">
          Are you sure?
        </v-card-title>

        <v-card-text class="pt-5">
          You want to delete this recipient address:
          <br>
          <h3>{{recipientRemove && recipientRemove.fullName}}</h3>
          <strong>
          {{recipientRemove && recipientRemove.address.line}}, 
          {{recipientRemove && recipientRemove.address.ward}}, 
          {{recipientRemove && recipientRemove.address.district}}, 
          {{recipientRemove && recipientRemove.address.city}}
          </strong>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="dialogRecipient = false"
          >
            Cancel
          </v-btn>
          <Button
            label="I Accept"
            color="my-4 primary"
            :disabled="disabledBtn"
            @submit:btnSubmit ="removedAddressRecipient"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Toast :toast="toast"/>
  </div>
</template>

<script>
import Shipper from "@component/label/LabelShipper";
import Recipient from "@component/label/LabelRecipient";
import Toast from "@component/Toast";
import Button from "@component/shares/Button";

import { update } from "@store/user";

import { createRecipient, Recipients, removeRecipient } from "@store/recipient";
import _ from "lodash";

const iconClose = require("../../assets/images/common/icon/close_lg.png");
const iconLocation = require("../../assets/images/common/icon/location.png");
const iconAdd = require("../../assets/images/common/customer/icon-plus.svg");

export default {
  name: "SavePlaceComponent",
  components: {
    Shipper,
    Recipient,
    Toast,
    Button
  },
  data: () => ({
    iconClose,
    iconLocation,
    iconAdd,
    user: null,
    dialog: false,
    dialogAddress: false,
    valSave: false,
    disabledBtn: false,
    isShipper: false,
    dialogRecipient: false,
    indexRemoveRecipient: false,
    loading: false,
    indexRemove: -1,
    addressRemove: null,
    recipientRemove: null,
    recipients: [],
    shipper: {
      Contact: {
        PersonName: "",
        CompanyName: "",
        PhoneNumber: "",
        EMailAddress: "",
      },
      Address: {
        StreetLines: "",
        City: "",
        StateOrProvinceCode: "",
        PostalCode: "",
        CountryCode: "US",
      },
    },
    recipient:{
      Contact: {
        PersonName: "",
        PhoneNumber: "",
        EMailAddress: "",
      },
      Address: {
        line: "",
        city: "",
        district: "",
        ward: ""
      }
    },
    toast:{
      content: '',
      open: false
    }
  }),
  created(){
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user){
      this.shipper.Contact.PersonName = this.user.fullName
      this.shipper.Contact.EMailAddress = this.user.email
    }else this.$router.push({path: '/login'})
    this.getRecipients()
  },
  methods:{
    handleUpdate(val){
      this.valSave = val
    },
    removeAddress(index){
      this.indexRemove = index
      this.addressRemove = this.user.address[index]
      this.dialog = true
    },
    removeAddressRecipient(index){
      this.indexRemoveRecipient = index
      this.recipientRemove = this.recipients[index]
      this.dialogRecipient = true
    },
    async removedAddressShipper(){
      if(this.indexRemove > -1){
        this.disabledBtn = true
        this.user.address.splice(this.indexRemove, 1)
        const dataUpdate = _.omit(this.user, ['_id', 'role', 'email'])
        const result = await update(dataUpdate)
        let infoToast = {
          color: "success",
          content: "Removed address successful!",
          open: true
        }
        if(result.statusCode === 200){
          localStorage.setItem('user', JSON.stringify(this.user))
        }else{
          infoToast.color = 'warning'
          infoToast.content = "Removed address fails!"
          this.user.address[this.indexRemove] = this.addressRemove
        }
        this.toast = infoToast
        this.dialog = false
        this.indexRemove = -1
        this.addressRemove = null
        this.disabledBtn = false
      }
    },
    async removedAddressRecipient(){
      this.disabledBtn = true
      let infoToast = {
        color: "success",
        content: "Removed address recipient successful!",
        open: true
      }
      const result = await removeRecipient(this.recipientRemove._id)
      if(result.statusCode === 200){
        this.recipients.splice(this.indexRemoveRecipient, 1)
        this.indexRemoveRecipient = -1
      }else{
        infoToast.color = 'warning'
        infoToast.content = "Removed address fails!"
      }
      this.toast = infoToast
      this.recipientRemove = null
      this.dialogRecipient = false
      this.disabledBtn = false
    },
    addAddress(){
      this.disabledBtn = true
      if(this.isShipper){
        this.addAddressShipper()
      } else{
        this.addAddressRecipient()
      }
    },
    async addAddressShipper(){
      const dataUpdate = _.omit(this.user, ['_id', 'role', 'email'])
      const address = {
        City: this.shipper.Address.City,
        CountryCode: this.shipper.Address.CountryCode,
        PostalCode: this.shipper.Address.PostalCode,
        StateOrProvinceCode: this.shipper.Address.StateOrProvinceCode,
        StreetLines: this.shipper.Address.StreetLines,
        companyName: this.shipper.Contact.CompanyName,
      }
      dataUpdate.address.push(address)
      const result = await update(dataUpdate)
      let infoToast = {
        color: "success",
        content: "Add address successful!",
        open: true
      }
      if(result.statusCode === 200){
        localStorage.setItem('user', JSON.stringify(this.user))
        this.dialogAddress = false
      }else{
        infoToast.color = 'warning'
        infoToast.content = "Add address fails!"
        this.user.address[this.indexRemove] = this.addressRemove
      }
      this.toast = infoToast
      this.disabledBtn = false
    },
    async addAddressRecipient(){
      const recipient = {
        fullName: this.recipient.Contact.PersonName,
        phone: this.recipient.Contact.PhoneNumber,
        email: this.recipient.Contact.EMailAddress,
        address: this.recipient.Address,
        shipperId: this.user._id
      }
      const result = await createRecipient(recipient)
      let infoToast = {
        color: "success",
        content: "Add recipient successful!",
        open: true
      }
      if(result.statusCode !== 201){
        infoToast.color = 'warning'
        infoToast.content = "Add address fails!"
        this.user.address[this.indexRemove] = this.addressRemove
      }else {
        this.dialogAddress = false
        this.getRecipients()
        // this.recipients.push(recipient)
      }
      this.toast = infoToast
      this.disabledBtn = false
    },
    async getRecipients(){
      this.loading = false
      const result = await Recipients()
      this.recipients = result?.data
      this.loading = true
    },
    openDialogAddress(check){
      this.isShipper = check
      this.dialogAddress = true
    }
  }
};
</script>
<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
.top-address {
  display: flex;
  justify-content: space-between;
}
.list-address {
  display: flex;
  margin-bottom: 50px;
  width: 90%;
  overflow-y: hidden;
  overflow-x: scroll;
}
.address-item {
  color: #5d6e85;
  border: 1px solid #d7dbe1;
  background: #fff;
  margin-right: 50px;
  min-width: 180px;
  width: 180px;
  margin-bottom: 28px;
  h3 {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #354a67;
  }
  p {
    margin-bottom: 0 !important;
  }
}
.ico_close {
  position: absolute;
  top: 5px;
  right: 5px;
  img{
    width: 10px;
    height: 10px;
    max-width: 100%;
  }
}
.block {
  margin: 0 !important;
}
.btn-primary.v-btn.v-btn--has-bg {
  width: 64px;
}
</style>
