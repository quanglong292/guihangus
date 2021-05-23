<template>
  <div class="block recipient shipper-page" id="address-recipient">
    <h2
      :class="{
        'text-primary text-center': titleClass,
        'h2-custom': !titleClass,
      }"
    >
      {{ title }}
    </h2>
    <div class="top-shipper">
      <div v-if="token">
        <v-checkbox
          v-model="useSavedPlace"
          color="primary"
          label="Use previous sent addresses"
          v-if="!places"
        ></v-checkbox>
      </div>
      <!-- Input Search -->
      <!-- <div class="search-bar header-bar">
        <v-img
          :src="require('../../assets/images/common/customer/icon_search.svg')"
          width="20"
          class="mr-2"
        />
        <input type="text" placeholder="Enter to search" />
      </div> -->
    </div>
    <v-form ref="form" v-model="valid" v-if="!useSavedPlace">
      <div class="form-group">
        <label>Receiver’s name</label>
        <v-text-field
          v-model="infoRecipient.Contact.PersonName"
          outlined
          dense
          :rules="rules.personName"
        ></v-text-field>
      </div>
      <div class="row-filed d-flex flex-rss justify-space-between">
        <div class="input-field">
          <div class="form-group">
            <label>Email</label>
            <v-text-field
              v-model="infoRecipient.Contact.EMailAddress"
              outlined
              dense
              :rules="rules.email"
            ></v-text-field>
          </div>
        </div>
        <div class="input-field">
          <div class="form-group">
            <label>Phone</label>
            <v-text-field
              class="br-0"
              v-model="infoRecipient.Contact.PhoneNumber"
              outlined
              dense
              v-mask="'###-###-#####'"
              :rules="rules.phone"
            ></v-text-field>
          </div>
        </div>
      </div>
      <div class="row-filed d-flex flex-rss justify-space-between">
        <div class="input-field">
          <div class="form-group">
            <label>Address</label>
            <v-text-field
              class="br-0"
              outlined
              dense
              v-model="infoRecipient.Address.line"
              :rules="rules.line"
            ></v-text-field>
          </div>
        </div>
        <div class="input-field">
          <div class="form-group">
            <label>City or Province</label>
            <v-select
              class="br-0"
              v-model="province"
              return-object
              :items="listProvinces"
              outlined
              item-text="name"
            ></v-select>
          </div>
        </div>
      </div>
      <div class="row-filed d-flex flex-rss justify-space-between">
        <div class="input-field form-group">
          <label>District</label>
          <v-select
            class="br-0"
            v-model="district"
            return-object
            :items="listDistricts"
            outlined
            item-text="name"
            :disabled="province == null"
          ></v-select>
        </div>
        <div class="input-field form-group">
          <label>Ward</label>
          <v-select
            class="br-0"
            v-model="ward"
            return-object
            :items="listWards"
            outlined
            item-text="name"
            :disabled="district == null"
          ></v-select>
        </div>
      </div>
    </v-form>
    <div v-else>
      <div v-if="listRecipients.length > 0">
        <!-- UI New -->
        <!-- <div class="list-address">
          <div v-if="!progress">
            <div
              class="item-address"
              v-for="(place, index) of listRecipients"
              :key="index"
            >
              <div class="left-item-address">
                <v-checkbox color="primary" label=""></v-checkbox>

                <h3 class="mb-2">{{ place.fullName }}</h3>
              </div>
              <div class="right-item-address">
                <p>
                  {{ place.address.line }}, {{ place.address.ward }},
                  {{ place.address.district }}, {{ place.address.city }}
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            <v-progress-circular
              indeterminate
              :size="20"
              :width="3"
              color="primary"
            ></v-progress-circular>
          </div>
        </div> -->
        <v-row class="row-filed d-flex flex-rss justify-space-between" v-if="!progress">
          <v-col v-for="(place, index) of listRecipients" :key="index" md="4">
            <div
              class="center border-gray py-5 px-5 choose-place"
              :class="{
                'active-choose': indexChoosePlace === index
              }"
              @click="choosePlace(index)"
            >
              <h3 class="mb-2">{{ place.fullName }}</h3>
              <p>
                {{ place.address.line }}, {{ place.address.ward }},
                {{ place.address.district }}, {{ place.address.city }}
              </p>
            </div>
          </v-col>
        </v-row>
        <div v-else>
          <v-progress-circular
            indeterminate
            :size="20"
            :width="3"
            color="primary"
          ></v-progress-circular>
        </div>
      </div>
      <div v-else class="text-danger">
        You have never shipped out a package before!
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

import { Recipients, Provinces, District, Ward } from "@store/recipient";
export default {
  name: "Package",
  props: {
    recipient: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: "Who is recipient?",
    },
    titleClass: {
      type: Boolean,
      default: false,
    },
    places: {
      type: Boolean,
      default: false,
    },
    orderEdit:{
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    valid: false,
    useSavedPlace: false,
    indexChoosePlace: -1,
    place: null,
    token: null,
    province: null,
    district: null,
    ward: null,
    progress: false,
    listRecipients: [],
    listProvinces: [],
    listDistricts: [],
    listWards: [],
    rules: {
      personName: [(value) => !!value || "Name field is required"],
      line: [(value) => !!value || "Address field is required"],
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
  watch: {
    valid(val) {
      if (this.infoRecipient.Address.ward != "") {
        this.$emit("update:recipient", val);
      }
    },
    province() {
      this.infoRecipient.Address.city = this.province.name;
      this.infoRecipient.Address.ward = "";
      this.infoRecipient.Address.district = "";
      this.$emit("update:recipient", false);
      this.getDistrict(this.province.code);
    },
    district() {
      if (!this.useSavedPlace) {
        this.infoRecipient.Address.district = this.district.name;
      }
      this.infoRecipient.Address.ward = "";
      this.$emit("update:recipient", false);
      this.getWard(this.district.code);
    },
    ward() {
      if (!this.useSavedPlace) {
        this.infoRecipient.Address.ward = this.ward.name;
      }
      this.$emit("update:recipient", this.valid);
    },
  },
  computed: {
    infoRecipient() {
      return this.$props.recipient
    },
    editOrder(){
      return this.$props.orderEdit || false
    }
  },
  created() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getRecipients();
    }
    this.getProvinces();
  },
  methods: {
    async getRecipients() {
      const result = await Recipients();
      if (result.statusCode === 200) {
        this.listRecipients = result.data;
      }
    },
    choosePlace(index) {
      this.progress = true
      this.indexChoosePlace = index;
      this.place = this.listRecipients[index];
      this.infoRecipient.Address.line = this.place.address.line;
      this.listProvinces.map((item) => {
        if (item.name === this.place.address.city) this.province = item;
      });
      const contact = {
        EMailAddress: this.place.email,
        PersonName: this.place.fullName,
        PhoneNumber: this.place.phone,
      };
      this.infoRecipient.Contact = contact;
      this.$emit("update:recipient", true);
    },
    async getProvinces() {
      this.listProvinces = [];
      this.listDistricts = [];
      const result = await Provinces();
      if (result.statusCode === 200) {
        this.listProvinces = result?.data || [];
        if(this.editOrder){
          this.checkEditOrder()
        }
      }
    },
    async getDistrict(provinceCode) {
      this.listDistricts = [];
      this.listWards = [];
      const result = await District(provinceCode);
      if (result.statusCode === 200) {
        this.listDistricts = result?.data || [];
        if (this.useSavedPlace || this.editOrder) {
          this.listDistricts.map((item) => {
            if (this.place.address.district === item.name) {
              this.infoRecipient.Address.district = item.name;
              this.district = item;
            }
          });
        }
      }
    },
    async getWard(districtCode) {
      const result = await Ward(districtCode);
      if (result.statusCode === 200) {
        this.listWards = result?.data || [];
        if (this.useSavedPlace || this.editOrder) {
          this.listWards.map((item) => {
            if (this.place.address.ward === item.name){
              this.infoRecipient.Address.ward = item.name;
              this.ward = item;
            } 
          });
          this.useSavedPlace = false;
          this.progress = false
        }
      }
    },
    checkEditOrder(){
      this.listProvinces.map((item) => {
        if (item.name === this.infoRecipient.Address.city) this.province = item;
      });
      this.place = {
        address:{
          district: this.infoRecipient.Address.district,
          ward: this.infoRecipient.Address.ward
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.top-shipper {
  display: flex;
  justify-content: space-between;
  div {
    align-self: center;
  }
  .search-bar {
    display: block !important;
    align-items: center;
    align-content: flex-start;
    font-size: 15px;
    font-weight: 500;
    color: #5d6e85 !important;
    position: relative;
    input {
      border: 1px solid #06b7b4;
      padding: 6px 20px 6px 40px;
    }
    .v-image {
      width: 20px !important;
      position: absolute;
      top: 8px;
      left: 10px;
    }
  }
}
.list-address {
  border: 1px solid #d7dbe1;
  padding: 15px 20px;
  height: 180px;
  overflow-y: auto;
  .item-address {
    display: flex;
    margin-bottom: 5px;
  }
  .left-item-address {
    display: flex;
    align-self: center;
    .v-input--checkbox {
      height: 16px;
      float: left;
      margin-top: 0 !important;
      padding-top: 0 !important;
      align-self: center;
    }
    h3 {
      margin-bottom: 0 !important;
      white-space: nowrap;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      letter-spacing: 0.1px;
      color: #354a67;
      align-self: center;
      padding-top: 8px;
    }
  }
  .right-item-address {
    margin-left: 15px;
    align-self: center;
    padding-top: 10px;
    p {
      font-size: 11px;
      line-height: 14px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #354a67;
      margin-bottom: 0 !important;
    }
  }
}
.h2-custom {
  color: #5d6e85 !important;
}
.flex-rss {
  @media screen and (max-width: 768px) {
    flex-direction: column !important;
  }
}
.row-filed {
  .input-field {
    @media screen and (max-width: 768px) {
      width: 100% !important;
    }
  }
}
.active-choose {
  border-color: #06b7b4 !important;
}
.choose-place {
  cursor: pointer;
  &:hover {
    @extend .active-choose;
  }
}
.custom-selected {
  margin: 0;
  min-height: 39px;
}
::v-deep {
  .v-text-field {
    .v-input__control {
      .v-input__slot {
        min-height: unset;
        .v-select__slot {
          padding: 4px 0;
          .v-select__selections {
            padding: unset;
          }
          .v-input__append-inner {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
