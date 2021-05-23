<template>
  <div class="main-cutoms create-label-page">
    <v-row v-if="step == 1">
      <v-col cols="8" sm="8">
        <div>
          <v-card class="p-10 p30">
            <Shipper
              :shipper="infoLabel.Shipper"
              @update:shipper="handleUpdateShipper"
            />
            <Recipient
              :recipient="infoLabel.Recipient"
              @update:recipient="handleUpdateRecipient"
            />
            <div class="mt-8">
              <div class="block">
                <h2>What size is your package?</h2>
                <p>
                  Quam ut tempor feugiat morbi rhoncus. Viverra volutpat in
                  ligula faucibus eu est velit a.
                </p>
              </div>
              <Package
                :inforPackage="infoLabel.RequestedPackageLineItems"
                :reciverAddress="infoLabel.Recipient.Address.city"
                @update:package="handleUpdatePackage"
              />
            </div>
            <div class="d-flex align-center">
              <div>
                <v-checkbox v-model="agree"></v-checkbox>
              </div>
              <p class="text-accept">
                By clicking<strong> Create label </strong>you are agreeing to
                the Terms & Conditions
              </p>
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col class="fixed-container" cols="4" sm="4" lg="3" md="4">
        <div class="position-relative">
          <v-stepper vertical class="stepper pt-5 box-fixed-right">
            <h2 class="">Order summary</h2>
            <v-stepper-step
              step="1"
              :complete="stepper.package"
              class="pa-0 py-3 circle-span"
            >
              <h3><strong>Package size</strong></h3>
              <span class="mt-2"
                >Weight <strong>{{ totalLbs }} lb</strong></span
              >
              <hr class="space-under mt-2" />
            </v-stepper-step>
            <v-stepper-step step="2" :complete="stepper.from" class="pa-0 py-3 circle-span">
              <h3><strong>From</strong></h3>
              <div class="address d-flex justify-space-between w-full">
                <span>
                  {{
                    this.infoLabel.Shipper.Address.StreetLines
                      ? `${this.infoLabel.Shipper.Address.StreetLines}, 
                    ${this.infoLabel.Shipper.Address.City},
                    ${this.infoLabel.Shipper.Address.StateOrProvinceCode},
                    ${this.infoLabel.Shipper.Address.PostalCode}`
                      : "..."
                  }}
                </span>
                <a
                  href="#address-shipper"
                  class="text-decoration-none txt-color-white"
                  >Edit</a
                >
              </div>
              <hr class="space-under mt-2" />
            </v-stepper-step>
            <v-stepper-step step="3" :complete="stepper.to" class="pa-0 py-3 circle-span">
              <h3><strong>To</strong></h3>
              <div class="address d-flex justify-space-between w-full">
                <span>
                  {{
                    this.infoLabel.Recipient.Address.line != ""
                      ? `${this.infoLabel.Recipient.Address.line},  
                ${this.infoLabel.Recipient.Address.city}, 
                ${this.infoLabel.Recipient.Address.district}, 
                ${this.infoLabel.Recipient.Address.ward}` : '...'}}
                </span>
                <a
                  href="#address-recipient"
                  class="text-decoration-none txt-color-white"
                  >Edit</a
                >
              </div>
              <hr class="space-under mt-2" />
            </v-stepper-step>
            <div class="float-right footer-stepper">
              <h4 class="text-right">Total</h4>
              <div class="text-right">
                <span class="mr-1">USD</span>
                <span class="total-money"
                  ><strong>${{ total }}</strong></span
                >
              </div>
              <v-btn
                class="mt-3 btn-grey"
                @click="generalLabel"
                :disabled="disabled"
                v-bind:class="{'bg-color': !disabled}"
              >
                <span>Create label</span>
                <v-progress-circular
                  v-if="loading"
                  class="ml-2"
                  :size="20"
                  :width="3"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-btn>
            </div>
          </v-stepper>
        </div>
      </v-col>
    </v-row>
    <PrintLabel v-else :listLabels="listLabels" />
    <Toast :toast="toast" />
  </div>
</template> 

<script>
import { CreateLabel } from "@store/label";
import Shipper from "@component/label/LabelShipper";
import Package from "@component/label/LabelPackage";
import Recipient from "@component/label/LabelRecipient";
import PrintLabel from "@component/label/PrintLabel";

import Toast from "@component/Toast";

import * as moment from "moment";
import _ from "lodash";

export default {
  name: "CreateLabel",
  components: {
    Shipper,
    Package,
    Recipient,
    PrintLabel,
    Toast
  },
  computed: {
    disabled() {
      let check = false;
      if (
        !this.stepper.package ||
        !this.stepper.from ||
        !this.stepper.to ||
        this.loading ||
        !this.agree
      )
        check = true;
      return check;
    }
  },
  data: () => ({
    loading: false,
    agree: false,
    total: 0,
    totalLbs: 0,
    step: 1,
    listLabels: [],
    stepper: {
      package: false,
      from: false,
      to: false
    },
    infoBanner: {
      title: "Creating Label",
      content: "We give you control of your shipments"
    },
    infoLabel: {
      ShipTimestamp: `${moment(Date.now()).format("YYYY-MM-DDThh:mm:ssZ")}`,
      Shipper: {
        Contact: {
          PersonName: "",
          CompanyName: "",
          PhoneNumber: "",
          EMailAddress: ""
        },
        Address: {
          StreetLines: "",
          City: "Anchorage",
          StateOrProvinceCode: "AK",
          PostalCode: "99503",
          CountryCode: "US"
        }
      },
      PackageCount: "1",
      RequestedPackageLineItems: [
        {
          SequenceNumber: "1",
          Weight: {
            Units: "LB",
            Value: 0
          },
          Dimensions: {
            Length: "12",
            Width: "12",
            Height: "12",
            Units: "IN"
          },
          items: []
        }
      ],
      Recipient: {
        Contact: {
          PersonName: "",
          PhoneNumber: "",
          EMailAddress: ""
        },
        Address: {
          line: "",
          city: "",
          district: "",
          ward: ""
        }
      },
      total: 0
    },
    toast: {
      content: "",
      open: false
    }
  }),
  methods: {
    async generalLabel() {
      this.loading = true;
      let infoToast = {
        color: "success",
        content: "Labels have been successfully created!",
        open: true
      };
      this.infoLabel.PackageCount = `${this.infoLabel?.RequestedPackageLineItems
        ?.Length || 1}`;
      this.infoLabel.total = this.total;
      const check = _.get(this.infoLabel, "Shipper.Contact.CompanyName");
      if (check == "") this.infoLabel.Shipper.Contact.CompanyName = "Viet Ship";
      const result = await CreateLabel(this.infoLabel);
      if (result.statusCode == 201) {
        this.listLabels = _.reduce(
          result.data,
          (n, o) => {
            const img = _.get(
              o,
              "ProcessShipmentReply.CompletedShipmentDetail.CompletedPackageDetails.Label.Parts.Image"
            );
            n.push(img);
            return n;
          },
          []
        );
        this.step = 2;
      } else {
        infoToast.color = "warning";
        infoToast.content = "Unable to create labels!";
      }
      this.toast = infoToast;
      this.loading = false;
    },
    handleUpdateShipper(checkFrom) {
      this.stepper.from = checkFrom;
    },
    handleUpdatePackage(total, totalLbs, checkPackage) {
      this.total = total;
      this.totalLbs = totalLbs;
      this.stepper.package = checkPackage;
    },
    handleUpdateRecipient(checkRecipient) {
      this.stepper.to = checkRecipient;
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-grey.btn-grey.btn-grey.btn-grey{
  color: #354a67 !important;
}
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
.bg-color.bg-color.bg-color.bg-color.bg-color {
  background-color: #06b7b4 !important;
  color: #FFF !important;
}
.custom-selected {
  margin: 0;
  min-height: 39px;
}

.text-right {
  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: right;
    letter-spacing: 0.1px;
    color: #ed2224;
  }
  .total-money strong {
    font-weight: 900;
    font-size: 32px;
    line-height: 42px;
    text-align: right;
    letter-spacing: 0.1px;
    color: #ed2224;
  }
}
.main-cutoms {
  scroll-behavior: smooth;
  font-size: 16px;
}
.fixed-container{
  position: fixed;
  right: 20px;
}
.box-fixed-right {
  border: 2px solid #eafafa !important;
  box-shadow: 0px 20px 30px rgba(167, 209, 233, 0.45) !important;
  
}
::v-deep {
  .stepper {
    padding-left: 30px !important;
    padding-right: 30px !important;
    .circle-span{
      span.v-stepper__step__step{
        background-color: white !important;
        border: 1px solid #06b7b4;
        color: #06b7b4 !important;
        border-radius: 4px !important;
        min-width: 20px !important;
        height: 20px;
        align-self: flex-start;
        margin-top: 5px;
        i{
          color: #06b7b4 !important;
          font-size: 14px;
        }
      }
    }
    .v-stepper__step {
      font-size: 14px;
    }
    .v-stepper__label {
      text-shadow: unset !important;
      span{
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.2px;
        color: #8692A4;
      }
    }
    h3 {
      color: #06b7b4 !important;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.2px;
    }
    .footer-stepper{
      margin-top: 30px;
      .v-btn{
        text-transform: initial !important;
        color: #FFF !important;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.2px;
      }
      h4{
        font-size: 18px;
        line-height: 24px;
        text-align: right;
        letter-spacing: 0.2px;
        color: #5D6E85;
        font-weight: normal !important;
      }
    }
    .address{
      a{
        font-weight: normal !important;
        font-size: 12px;
        letter-spacing: 0.2px;
        line-height: 16px;
      }
    }
    .v-stepper__label {
      width: 100%;
      .space-under {
        width: 100%;
        border-color: #06b7b4 !important;
        opacity: 0.2;
      }
    }
    .v-stepper__step__step {
      background-color: #06b7b4 !important;
      color: white !important;
      .v-icon {
        color: white !important;
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .main-cutoms {
    padding: 5px;
  }
  .row {
    display: block;
  }
}
</style>
