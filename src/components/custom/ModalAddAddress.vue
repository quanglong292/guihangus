<template>
  <v-dialog
    :value="openDialog"
    @input="$emit('dialog:close')"
    width="1100"
    content-class="modal-address modal-remove overflow-hidden"
  >
    <v-card>
      <div class="header-dialog">
        <div class="h-top-dialog">
          <p></p>
          <p @click="$emit('dialog:close')"><img :src="icoClose" /></p>
        </div>
        <h2 class="title-address">Add new address</h2>
      </div>
      <v-form ref="form">
        <v-row>
          <v-col cols="10" sm="10" class="mx-auto">
            <v-row>
              <v-col cols="12" sm="6">
                <div class="form-group">
                  <label>Sender’s name</label>
                  <v-text-field
                    class="br-0"
                    outlined
                    dense
                    v-model="personName"
                    :rules="rules.personNameRules"
                    placeholder="Enter your name"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="form-group">
                  <label>Company</label>
                  <v-text-field
                    class="br-0"
                    outlined
                    dense
                    v-model="company"
                    :rules="rules.companyRules"
                    placeholder="Optional"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="form-group">
                  <label>Email</label>
                  <v-text-field
                    class="br-0"
                    outlined
                    dense
                    v-model="email"
                    :rules="rules.emailRules"
                    placeholder="Used for providing notifications"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="form-group">
                  <label>Phone</label>
                  <v-text-field
                    class="br-0"
                    outlined
                    dense
                    v-model="phone"
                    :rules="rules.phoneRules"
                    placeholder="Optional"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="form-group">
                  <label>Address</label>
                  <v-text-field
                    class="br-0"
                    outlined
                    dense
                    v-model="address"
                    :rules="rules.addressRules"
                    placeholder="Apt, Floor Suite, Street, etc..."
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="form-group">
                  <label>Zipcode</label>
                  <v-text-field
                    class="br-0"
                    outlined
                    dense
                    v-model="zipcode"
                    :rules="rules.zipcodeRules"
                    placeholder="Enter Zipcode"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="form-group">
                  <label>City</label>
                  <v-text-field
                    class="br-0"
                    outlined
                    dense
                    v-model="city"
                    :rules="rules.cityRules"
                    placeholder="Enter a city"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="form-group">
                  <label>State </label>
                  <v-text-field
                    class="br-0"
                    outlined
                    dense
                    v-model="state"
                    :rules="rules.stateRules"
                    placeholder="Enter a state"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
      <div class="footer-dialog">
        <Button label="Save" class="btn-confirm" :disabled="disabled" />
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from "vue";
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);
import Button from "@component/shares/Button";
const icoClose = require("../../assets/images/common/customer/close.svg");

export default {
  name: "AddAddress",
  components: { Button },
  props: {
    disabledBtn: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    disabled() {
      return this.$props.disabledBtn;
    },
    openDialog() {
      return this.$props.dialog;
    }
  },
  data: () => ({
    icoClose,
    personName: "",
    company: "",
    city: "",
    state: "",
    phone: "",
    email:"",
    address: "",
    zipcode: "",
    rules: {
      personNameRules: [value => !!value || "Full name field is required"],
      companyRules: [value => !!value || "Company field is required"],
      addressRules: [value => !!value || "Address field is required"],
      cityRules: [value => !!value || "City field is required"],
      zipcodeRules: [
        value => !!value || "Zipcode field is required",
        value => {
          const pattern = /^[0-9]/;
          return pattern.test(value) || "Zipcode is number";
        },
        value => (value || "").length == 5 || "Zipcode has 5 characters"
      ],
      stateRules: [value => !!value || "State field is required"],
      emailRules: [
        value => !!value || "Email field is required",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "The email address entered is invalid";
        }
      ],
      phoneRules: [
        value => !!value || "Phone field is required",
        value =>
          (value || "").length >= 10 ||
          "The phone number has minimum 10 characters",
        value => {
          const pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
          return pattern.test(value) || "The phone number entered is invalid";
        }
      ]
    }
  }),
  watch: {
    valid(val) {
      this.$emit("update:shipper", val);
    }
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
::v-deep {
  .modal-address {
    text-align: left !important;
    h2.title-address{
      font-weight: 900;
      font-size: 32px;
      line-height: 42px;
      text-align: center;
      letter-spacing: 0.1px;
      color: #06b7b4;
    }
    .form-group {
      label {
      }
    }
    .footer-dialog {
      text-align: center;
    }
  }
}
</style>
