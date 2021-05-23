<template>
  <div class="block shipper-page">
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
          label="Use saved place"
          v-if="!place"
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
      <div id="address-shipper" class="shipper">
        <div>
          <div class="row-filed d-flex flex-rss justify-space-between">
            <div class="input-field field-email">
              <div>
                <label>Email</label>
                <v-text-field
                  class="br-0"
                  outlined
                  dense
                  v-model="infoShipper.Contact.EMailAddress"
                  :rules="rules.email"
                  @input="emailExisted"
                  :disabled="place"
                ></v-text-field>
                <span
                  class="email-existed"
                  @click="loginWithExistEmail"
                  :class="{
                    'd-none': !isEmailExisted,
                  }"
                >
                  Login with {{ isEmailExisted }}
                </span>
              </div>
            </div>
            <div class="input-field">
              <div>
                <label>Full Name</label>
                <v-text-field
                  class="br-0"
                  outlined
                  dense
                  v-model="infoShipper.Contact.PersonName"
                  :rules="rules.personName"
                  :disabled="place"
                ></v-text-field>
              </div>
            </div>
          </div>
          <div class="row-filed d-flex flex-rss justify-space-between">
            <div class="input-field">
              <div>
                <label>Phone</label>
                <v-text-field
                  class="br-0"
                  outlined
                  dense
                  v-mask="'###-###-#####'"
                  v-model="infoShipper.Contact.PhoneNumber"
                  :rules="rules.phone"
                  placeholder="123-456-7890"
                ></v-text-field>
              </div>
            </div>
            <div class="input-field">
              <div>
                <label>Company</label>
                <v-text-field
                  class="br-0"
                  outlined
                  dense
                  v-model="infoShipper.Contact.CompanyName"
                  placeholder="Viet Ship"
                ></v-text-field>
              </div>
            </div>
          </div>
          <div class="row-filed d-flex flex-rss justify-space-between">
            <div class="input-field">
              <div>
                <label>Address</label>
                <v-text-field
                  class="br-0"
                  outlined
                  dense
                  v-model="infoShipper.Address.StreetLines"
                  :rules="rules.streetLine"
                ></v-text-field>
              </div>
            </div>
            <div class="input-field">
              <div>
                <label>Zipcode</label>
                <div class="position-relative">
                  <v-text-field
                    class="br-0"
                    :disabled="reSearchZipcode"
                    outlined
                    dense
                    v-model="infoShipper.Address.PostalCode"
                    @input="searchCode"
                    :rules="rules.PostalCode"
                  ></v-text-field>
                  <v-progress-circular
                    v-if="reSearchZipcode"
                    color="primary"
                    class="mr-2 progress-zipcode"
                    :size="15"
                    :width="2"
                    indeterminate
                  ></v-progress-circular>
                </div>
              </div>
            </div>
          </div>
          <div class="row-filed d-flex flex-rss justify-space-between">
            <div class="input-field">
              <div>
                <label>City</label>
                <v-text-field
                  class="br-0"
                  outlined
                  dense
                  disabled
                  v-model="infoShipper.Address.City"
                  :rules="rules.City"
                ></v-text-field>
              </div>
            </div>
            <div class="input-field">
              <div>
                <label>State</label>
                <v-text-field
                  class="br-0"
                  outlined
                  dense
                  disabled
                  v-model="infoShipper.Address.StateOrProvinceCode"
                  :rules="rules.StateOrProvinceCode"
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-form>
    <div v-else>
      <div v-if="placeSelected === null || !selected">
        <!-- UI New -->
        <!-- <div v-if="saveplaces.length > 0">
          <div class="list-address">
            <div
              class="item-address"
              v-for="(place, index) of saveplaces"
              :key="index"
              @click="choosePlace(index)"
            >
              <div class="left-item-address">
                <v-checkbox color="primary" label=""></v-checkbox>

                <h3 class="mb-2">{{ infoUser.fullName }}</h3>
              </div>
              <div class="right-item-address">
                <p>
                  {{ place.StreetLines }}, {{ place.City }},
                  {{ place.StateOrProvinceCode }}, {{ place.PostalCode }},
                  <span v-if="placeSelected == index">Billing address</span>
                </p>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div v-else class="text-danger">
          You have never shipped out a package before!
        </div> -->
        <v-row
          class="row-filed d-flex flex-rss justify-space-between"
          v-if="saveplaces.length > 0"
        >
          <v-col v-for="(place, index) of saveplaces" :key="index" md="4">
            <div
              class="center border-gray py-5 px-5 choose-place"
              :class="{
                'active-place': placeSelected == index,
              }"
              @click="choosePlace(index)"
            >
              <h3 class="mb-2">{{ infoUser.fullName }}</h3>
              <p>
                {{ place.StreetLines }}, {{ place.City }},
                {{ place.StateOrProvinceCode }}, {{ place.PostalCode }}
              </p>
              <div
                v-if="placeSelected == index"
                class="v-chip--disabled font-weight-bold"
              >
                Billing address
              </div>
              <div v-else style="padding: 9px 0;"></div>
            </div>
          </v-col>
        </v-row> 
         <div v-else class="text-danger">
          You have never shipped out a package before!
        </div>
      </div>
      <div v-else>
        <v-row class="row-filed d-flex flex-rss justify-space-between">
          <v-col class="pl-8">
            <div class="border-gray py-5 px-5">
              <div class="title mb-5 row justify-space-between align-center">
                <h3>{{ infoShipper.Contact.PersonName }}</h3>
                <div class="d-flex flex-rss">
                  <div class="mr-2 cursor-pointer" @click="editPlace">
                    <v-img
                      :src="
                        require('../../assets/images/common/customer/icon_edit.svg')
                      "
                      width="15"
                    />
                  </div>
                  <div @click="existChoosePlace" class="cursor-pointer">
                    <v-img :src="iconClose" />
                  </div>
                </div>
              </div>
              <div class="row items-center">
                <div class="mr-2">
                  <v-img
                    :src="
                      require('../../assets/images/common/customer/icon_calling.svg')
                    "
                    width="20"
                  />
                </div>
                <p>+01 {{ infoShipper.Contact.PhoneNumber }}</p>
              </div>
              <div class="row items-center">
                <div class="mr-2">
                  <v-img
                    :src="
                      require('../../assets/images/common/customer/icon_email.svg')
                    "
                    width="20"
                  />
                </div>
                <p>{{ infoShipper.Contact.EMailAddress }}</p>
              </div>
              <div class="row items-center">
                <div class="mr-2">
                  <v-img
                    :src="
                      require('../../assets/images/common/customer/icon_location.svg')
                    "
                    width="20"
                  />
                </div>
                <p>
                  {{ infoShipper.Address.StreetLines }},
                  {{ infoShipper.Address.City }},
                  {{ infoShipper.Address.StateOrProvinceCode }},
                  {{ infoShipper.Address.PostalCode }}
                </p>
              </div>
              <div style="color: #5d6e85; font-style: italic">
                Billing Address
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <Toast :toast="toast" />
  </div>
</template>
<script>
import Vue from 'vue'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

const iconClose = require("../../assets/images/common/customer/close.svg");

import { emailExisted } from "@store/user";
import { ZipCode } from "@store/label";

import Toast from "@component/Toast";

import _ from "lodash";

export default {
  name: "Shipper",
  components: { Toast },
  props: {
    shipper: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: "Your address",
    },
    titleClass: {
      type: Boolean,
      default: false,
    },
    place: {
      type: Boolean,
      default: false,
    },
    orderEdit:{
      type: Boolean,
      default: false,
    }
  },
  computed: {
    infoShipper() {
      return this.$props.shipper;
    },
    editOrder(){
      return this.$props.orderEdit || false
    }
  },
  data: () => ({
    iconClose,
    indexZip: 0,
    useSavedPlace: false,
    selected: false,
    valid: false,
    reSearchZipcode: false,
    isEmailExisted: null,
    token: null,
    placeSelected: null,
    infoUser: {},
    saveplaces: [],
    toast: {
      content: "",
      open: false,
    },
    rules: {
      personName: [(value) => !!value || "Full name field is required"],
      streetLine: [(value) => !!value || "Address field is required"],
      City: [(value) => !!value || "City field is required"],
      PostalCode: [
        (value) => !!value || "Zipcode field is required",
        (value) => {
          const pattern = /^[0-9]/;
          return pattern.test(value) || "Zipcode is number";
        },
        (value) => (value || "").length == 5 || "Zipcode has 5 characters",
      ],
      StateOrProvinceCode: [(value) => !!value || "State field is required"],
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
    indexZip() {
      this.getDataAddress();
    },
    valid(val) {
      this.$emit("update:shipper", val);
    },
  },
  created() {
    this.token = localStorage.getItem("token");
    if (this.token) this.infoUser = JSON.parse(localStorage.getItem("user"));
    if (Object.keys(this.infoUser).length > 0)
      this.saveplaces = this.infoUser.address;
    if(this.editOrder) {
      const data = {
        city: this.infoShipper.Address.City,
        state: this.infoShipper.Address.StateOrProvinceCode,
        zip: this.infoShipper.Address.PostalCode
      }
      this.getDataAddress(data)
    }else this.getDataAddress(null);
  },
  methods: {
    getDataAddress(data) {
      const item = {
        City: data?.city || "",
        StateOrProvinceCode: data?.state || "",
        PostalCode: data?.zip || "",
        CountryCode: "US",
      };
      this.infoShipper.Address = {
        StreetLines: this.infoShipper.Address.StreetLines,
        ...item,
      };
    },
    emailExisted: _.debounce(async function(e) {
      if (!this.token) {
        this.isEmailExisted = null;
        const result = await emailExisted(e);
        if (result.data) this.isEmailExisted = e;
      }
    }, 1000),
    searchCode: _.debounce(async function(e) {
      this.reSearchZipcode = true
      const pattern = /^[0-9]{5}/;
      let infoToast = {
        color: "warning",
        content: "Zipcode's not valid!",
        open: true,
      };
      if (pattern.test(e)) {
        const result = await ZipCode(e);
        if (result?.data) {
          this.getDataAddress(result.data);
        } else {
          this.infoShipper.Address.City = "";
          this.infoShipper.Address.StateOrProvinceCode = "";
          this.toast = infoToast;
        }
      }
      this.reSearchZipcode = false
    }, 1000),
    choosePlace(index) {
      this.placeSelected = index;
      this.selected = true;
      const contact = {
        CompanyName: this.infoUser.companyName || "",
        EMailAddress: this.infoUser.email || "",
        PersonName: this.infoUser.fullName || "",
        PhoneNumber: this.infoUser.phone || "",
      };
      this.infoShipper.Address = this.saveplaces[index];
      this.infoShipper.Contact = contact;
      this.$emit("update:shipper", true);
    },
    editPlace() {
      this.useSavedPlace = false;
      this.placeSelected = null;
    },
    existChoosePlace() {
      this.selected = false;
    },
    loginWithExistEmail() {
      localStorage.removeItem("token");
      window["emailExisted"] = this.isEmailExisted;
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style lang="scss" scoped>
.top-shipper {
  display: flex;
  justify-content: space-between;
  div{
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
.flex-rss {
  @media screen and (max-width: 768px) {
    flex-direction: column !important;
  }
}
.h2-custom {
  color: #5d6e85 !important;
}
.row-filed {
  .input-field {
    @media screen and (max-width: 768px) {
      width: 100% !important;
    }
  }
}
.b-8 {
  bottom: 8px;
}
.text-red {
  color: red;
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
.cursor-pointer {
  cursor: pointer;
}
.title {
  font-weight: 500;
}
.active-place {
  border-color: #06b7b4 !important;
}
::v-deep {
  .shipper {
    .field-email {
      @extend .position-relative;
      .email-existed {
        @extend .position-absolute;
        @extend .b-8;
        @extend .text-red;
        font-size: 12px;
        @extend .cursor-pointer;
      }
    }
  }
  .choose-place {
    @extend .cursor-pointer;
    height: 145px;
    &:hover {
      @extend .active-place;
    }
  }
  .progress-zipcode {
    position: absolute;
    top: 13px;
    right: 0;
  }
}
</style>
