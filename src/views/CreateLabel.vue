<template>
  <div class="create-label-page">
    <TopBar />
    <div class="main-content">
      <Banner :infoBanner="infoBanner" />

      <div v-if="step == 1">
        <v-container class="mt-m100">
          <v-card class="main-create br-0 rounded">
            <v-row class="px-10 py-10 d-inline">
              <v-col class="col-8 form-rss">
                <div>
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
                      <h2 class="h2-custom">What size is your package?</h2>
                      <p>
                        Quam ut tempor feugiat morbi rhoncus. Viverra volutpat
                        in ligula faucibus eu est velit a.
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
                </div>
              </v-col>
              <div id="calculate" />
            </v-row>

            <!-- <div class="tablet-card">
              <v-stepper vertical class="stepper-tablet p-30 pb-4 mt-13">
                <h2 class="pl-5 pb-2 pt-3 order-title">Order summary</h2>
                <v-stepper-content step="1"> </v-stepper-content>

                <v-stepper-step step="✓" :complete="stepper.package">
                  <h3><strong>Package size</strong></h3>
                  <span class="mt-1 white--text">Up to {{ totalLbs }}lb</span>
                  <hr class="space-under mt-2 white"/>
                </v-stepper-step>

                <v-stepper-content step="1"> </v-stepper-content>

                <v-stepper-step step="✓" :complete="stepper.from">
                  <strong class="white--text">From</strong>
                  <div class="address d-flex justify-space-between">
                    <span>
                      {{
                        this.infoLabel.Shipper.Address.PostalCode
                          ? `${this.infoLabel.Shipper.Address.City},
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
                  <hr class="space-under mt-2 white" />
                </v-stepper-step>
                <v-stepper-content step="2"> </v-stepper-content>

                <v-stepper-step step="✓" :complete="stepper.to">
                  <strong class="white--text">To</strong>
                  <div class="address d-flex justify-space-between">
                    <span>
                      {{
                        this.infoLabel.Recipient.Address.line != ""
                          ? `${this.infoLabel.Recipient.Address.line},  
                        ${this.infoLabel.Recipient.Address.city}, 
                        ${this.infoLabel.Recipient.Address.district}, 
                        ${this.infoLabel.Recipient.Address.ward}`
                          : "..."
                      }}
                    </span>
                    <a
                      href="#address-recipient"
                      class="text-decoration-none txt-color-white"
                      >Edit</a
                    >
                  </div>
                  <hr class="space-under mt-2 white" />
                </v-stepper-step>
                <v-stepper-content step="3" class="stepper3">
                </v-stepper-content>
                <div class="float-right footer-stepper">
                  <h4 class="text-right">Total</h4>
                  <div class="text-right">
                    <span class="total-money"
                      ><strong>${{ total }}</strong></span
                    >
                  </div>
                  <v-btn
                    class="uppercase btn-tablet-custom mt-3"
                    @click="generalLabel"
                    :disabled="disabled"
                  >
                    <span>Create Label</span>
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
            </div> -->
            <v-container
              ><div
                id="floatingwidget"
                class="floating-card card-rss card-fixed p-30"
              >
                <v-stepper vertical class="stepper rounded p-30 pb-4 mt-13">
                  <h2 class="pl-5 pb-2 pt-3 order-title">Order summary</h2>
                  <v-stepper-content step="1"> </v-stepper-content>

                  <v-stepper-step
                    step="✓"
                    :complete="stepper.package"
                    class="text-active-primary"
                  >
                    <h3><strong>Package size</strong></h3>
                    <span class="mt-1">Weight {{ totalLbs }}lb</span>
                    <hr class="space-under mt-2 white" />
                  </v-stepper-step>

                  <v-stepper-content step="1"> </v-stepper-content>

                  <v-stepper-step
                    step="✓"
                    :complete="stepper.from"
                    class="blue--text"
                  >
                    <strong>From</strong>
                    <div class="address d-flex justify-space-between">
                      <span>
                        {{
                          this.infoLabel.Shipper.Address.PostalCode
                            ? `${this.infoLabel.Shipper.Address.City},
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
                    <hr class="space-under mt-2 white" />
                  </v-stepper-step>
                  <v-stepper-content step="2"> </v-stepper-content>

                  <v-stepper-step step="✓" :complete="stepper.to">
                    <strong>To</strong>
                    <div class="address d-flex justify-space-between">
                      <span>
                        {{
                          this.infoLabel.Recipient.Address.line != ""
                            ? `${this.infoLabel.Recipient.Address.line},  
                        ${this.infoLabel.Recipient.Address.city}, 
                        ${this.infoLabel.Recipient.Address.district}, 
                        ${this.infoLabel.Recipient.Address.ward}`
                            : "..."
                        }}
                      </span>
                      <a
                        href="#address-recipient"
                        class="text-decoration-none txt-color-white"
                        >Edit</a
                      >
                    </div>
                    <hr class="space-under mt-2 white" />
                  </v-stepper-step>
                  <v-stepper-content step="3" class="v-stepper-3">
                  </v-stepper-content>
                  <div class="float-right footer-stepper">
                    <h4 class="text-right">Total</h4>
                    <div class="text-right">
                      <span class="total-money"
                        ><strong>${{ total }}</strong></span
                      >
                    </div>
                    <v-btn
                      class="uppercase mt-3"
                      @click="generalLabel"
                      :disabled="disabled"
                    >
                      <span>Create Label</span>
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
                </v-stepper></div
            ></v-container>
          </v-card>
        </v-container>
      </div>
      <LabelResult v-else :listLabels="listLabels" />
      <Footer />
    </div>
  </div>
</template>

<script>
import { CreateLabel } from "@store/label";

import TopBar from "@component/TopBar";
import Banner from "@component/Banner";
import Footer from "@component/Footer";
import LabelResult from "@component/label/LabelResult";
import Shipper from "@component/label/LabelShipper";
import Package from "@component/label/LabelPackage";
import Recipient from "@component/label/LabelRecipient";

import * as moment from "moment";
import _ from "lodash";

const man = require("../assets/images/create-label/man.svg");
const banner = require("../assets/images/banner/pic6.jpg");

export default {
  name: "CreateLabel",
  components: {
    TopBar,
    Banner,
    Footer,
    LabelResult,
    Shipper,
    Package,
    Recipient,
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
    offsetDiv: 0,
    man,
    loading: false,
    agree: false,
    total: 0,
    totalLbs: 0,
    step: 1,
    stepper: {
      package: false,
      from: false,
      to: false,
    },
    infoBanner: {
      img: banner,
      title1: "Creating Label",
      content: "We give you control of your shipments",
      createLabel: true,
    },
    infoLabel: {
      ShipTimestamp: `${moment(Date.now()).format("YYYY-MM-DDThh:mm:ssZ")}`,
      Shipper: {
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
      PackageCount: "1",
      RequestedPackageLineItems: [
        {
          SequenceNumber: "1",
          Weight: {
            Units: "LB",
            Value: 0,
          },
          Dimensions: {
            Length: "12",
            Width: "12",
            Height: "12",
            Units: "IN",
          },
          items: [],
        },
      ],
      Recipient: {
        Contact: {
          PersonName: "",
          PhoneNumber: "",
          EMailAddress: "",
        },
        Address: {
          line: "",
          city: "",
          district: "",
          ward: "",
        },
      },
      total: 0,
    },
    listLabels: [],
  }),
  methods: {
    async generalLabel() {
      this.loading = true;
      this.infoLabel.PackageCount = `${
        this.infoLabel?.RequestedPackageLineItems?.Length || 1
      }`;
      this.infoLabel.total = this.total;
      const check = _.get(this.infoLabel, "Shipper.Contact.CompanyName");
      if (check == "") this.infoLabel.Shipper.Contact.CompanyName = "Viet Ship";
      const data = _.pick(this.infoLabel, [
        "ShipTimestamp",
        "Shipper",
        "PackageCount",
        "RequestedPackageLineItems",
        "Recipient",
        "total",
      ]);
      const result = await CreateLabel(data);
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
      } else this.loading = false;
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
    },
    calculateTopFloatingWidget() {
      var navbar = document.getElementById("floatingwidget");
      if (navbar) {
        var sticky = navbar.offsetTop;
        var divcal = document.getElementById("calculate");
        var cal = divcal.offsetTop;
        if (window.pageYOffset >= sticky && window.pageYOffset <= cal) {
          navbar.classList.add("sticky");
          navbar.classList.remove("card-fixed-top");
          navbar.classList.remove("card-fixed-bottom");
        } else if (window.pageYOffset < sticky) {
          navbar.classList.remove("card-fixed-bottom");
          navbar.classList.remove("sticky");
          navbar.classList.add("card-fixed-top");
        } else if (window.pageYOffset > cal - 250) {
          navbar.classList.remove("sticky");
          navbar.classList.remove("card-fixed-top");
          navbar.classList.add("card-fixed-bottom");
        }
      }
    },
  },
  mounted() {
    window.onscroll = this.calculateTopFloatingWidget;
  },
};
</script>
<style lang="scss" scoped>
[data-v-d9b251e4] .main-create .stepper .v-stepper__content:not(:last-child) {
  border-left: 2px solid white !important;
}
hr.space-under{
  border: 0 solid transparent;
}
.v-application--is-ltr .v-stepper--vertical .v-stepper__content {
  margin: -15px -36px -16px 36px;
}

.v-stepper--vertical {
  .v-stepper__step {
    padding: 0px 26px 0px;
  }
}

.card-rss {
  .stepper {
    .v-stepper__content {
      border-left: 2px solid white !important;
      height: 60px;
    }
    .v-stepper-3 {
      height: 200px;
      padding: 0;
    }
  }
  .footer-stepper {
    margin-top: -150px;
  }
}
.container {
  max-width: 1140px;
  @media screen and (max-width: 1024px) {
    max-width: 840px;
  }
  @media screen and (max-width: 768px) {
    max-width: 640px;
  }
  @media screen and (max-width: 425px) {
    max-width: 380px;
  }
}
.mt-m100 {
  margin-top: -100px;
}
.h2-custom {
  color: #1b2534 !important;
}
.man-img {
  .v-image {
    height: 75%;
  }
}
.sticky {
  position: fixed;
  margin-left: 750px;
  top: 5%;
  @media screen and (max-width: 1440px) {
    right: 55px;
  }
  @media screen and (max-width: 1280px) {
    right: 20px;
  }
  @media screen and (max-width: 1182px) {
    right: -20px;
  }
  @media screen and (max-width: 980px) {
    right: -40px;
  }
  @media screen and (max-width: 780px) {
    right: -45px;
  }
}
.card-fixed-top {
  position: fixed;
  top: 420px;
  margin-left: 750px;
  @media screen and (max-width: 1440px) {
    right: 115px;
  }
  @media screen and (max-width: 1280px) {
    right: 20px;
  }
  @media screen and (max-width: 1182px) {
    right: -20px;
  }
  @media screen and (max-width: 980px) {
    right: -40px;
  }
  @media screen and (max-width: 780px) {
    right: -45px;
  }
}
.card-fixed-bottom {
  position: absolute;
  bottom: -20px;
  margin-left: 750px;
  @media screen and (max-width: 1440px) {
    right: -65px;
  }
  @media screen and (max-width: 1280px) {
    right: -50px;
  }
  @media screen and (max-width: 1182px) {
    right: -35px;
  }
  @media screen and (max-width: 980px) {
    right: -50px;
  }
  @media screen and (max-width: 780px) {
    right: -55px;
  }
}
.container {
  max-width: 1140px;
}
.bg-color {
  background-color: #06b7b4 !important;
}
.txt-color-white {
  color: white !important;
}
.custom-selected {
  margin: 0;
  min-height: 39px;
}
.mt-1p {
  margin-top: -1% !important;
}
.p-30 {
  padding: 20px;
  @media screen and (max-width: 1440px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (max-width: 880px) {
    font-size: 10px;
  }
}
.d-inline {
  @media screen and (max-width: 768px) {
    display: inline-block;
  }
}
.tablet-card {
  width: 85%;
  margin-bottom: 70px;

  @media screen and (max-width: 17768px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: inline-block;
    width: 89%;
  }
  @media screen and (max-width: 688px) {
    display: inline-block;
    width: 87%;
  }
  @media screen and (max-width: 600px) {
    width: 85%;
  }
  @media screen and (max-width: 592px) {
    width: 83%;
  }
  @media screen and (max-width: 481px) {
    width: 82%;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 470px) {
    width: 80%;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 425px) {
    width: 87%;
    margin-bottom: 0px;
  }
  @media screen and (max-width: 325px) {
    width: 91%;
    margin-bottom: -10px;
  }
}
.form-rss {
  padding: 50px !important;
  @media screen and (max-width: 768px) {
    padding: 40px !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  @media screen and (max-width: 425px) {
    padding: 20px !important;
    width: 100% !important;
  }
  @media screen and (max-width: 325px) {
    padding: 10px !important;
    width: 100% !important;
  }
}
.floating-card {
  .order-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 150%;
    margin-bottom: 20px;
    color: #1b2534;
    @media screen and (max-width: 1440px) {
      font-size: 26px;
    }
    @media screen and (max-width: 1024px) {
      font-size: 25px;
    }
    @media screen and (max-width: 880px) {
      font-size: 22px;
    }
    @media screen and (max-width: 475px) {
      font-size: 18px;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
::v-deep {
  .main-create {
    box-shadow: 0px 10px 23px rgb(0 0 0 / 12%) !important;
    .stepper {
      
      .v-stepper {
        .v-stepper__step {
          span {
            background-color: white !important;
            color: blue !important;
          }
        }
        span {
          background-color: white !important;
          color: blue !important;
        }
      }
      
    }
    .main-create .stepper .v-stepper__step .v-stepper__step__step {
      background-color: white !important;
      color: black !important;
    }
    position: relative;
    .summary {
      position: absolute;
      top: 0;
      right: -10%;
    }
    .stepper-tablet {
      display: inline-block;
      border-radius: 0px;
      width: 100% !important;
      margin-top: 5px !important;
      padding: 5px;
      @media screen and (max-width: 425px) {
        margin-left: -20px;
      }
      @media screen and (max-width: 320px) {
        margin-left: -30px;
      }
      @extend .bg-color;
      h2 {
        @media screen and (max-width: 1440px) {
          font-size: 26px;
        }
        @media screen and (max-width: 1024px) {
          font-size: 20px;
        }
        @media screen and (max-width: 880px) {
          font-size: 16px;
        }
      }
      h3 {
        @extend .txt-color-white;
        @media screen and (max-width: 1440px) {
          font-size: 26px;
        }
        @media screen and (max-width: 1024px) {
          font-size: 20px;
        }
        @media screen and (max-width: 880px) {
          font-size: 16px;
        }
        @media screen and (max-width: 480px) {
          font-size: 12px;
        }
      }
      .v-stepper__content:not(:last-child) {
        border-left: 1px solid white !important;
      }
      .v-stepper__step {
        & .v-stepper__label {
          width: 100%;
          text-shadow: none !important;
          // @extend .txt-color-white;
          span {
            font-size: 13px;
          }
          .address {
            width: 100%;
          }
        }
        .v-stepper__step__step {
          background-color: white !important;
          color: #06b7b4 !important;
          .v-icon {
            color: #06b7b4 !important;
          }
        }
      }
      .space-under {
        width: 100%;
        height: 1px;
      }
      .footer-stepper {
        padding: 0 24px;
        margin-top: -80px;
        h4 {
          @extend .txt-color-white;
        }
        .total-money {
          font-size: 2em;
        }
      }
      .btn-tablet-custom {
        @media screen and (max-width: 320px) {
          font-size: 10px;
        }
      }
    }
    .stepper {
      border-radius: 0px;
      width: 350px;
      @media screen and (max-width: 880px) {
        width: 320px;
      }
      @media screen and (max-width: 850px) {
        width: 300px;
      }
      @extend .bg-color;
      h3 {
        @extend .txt-color-white;
        @media screen and (max-width: 1440px) {
          font-size: 26px;
        }
        @media screen and (max-width: 1024px) {
          font-size: 20px;
        }
        @media screen and (max-width: 880px) {
          font-size: 16px;
        }
      }
      .v-stepper__content:not(:last-child) {
        border-left: 1px solid white !important;
      }
      .v-stepper__step {
        & .v-stepper__label {
          width: 100%;
          text-shadow: none !important;
          @extend .txt-color-white;
          span {
            font-size: 13px;
          }
          .address {
            width: 100%;
          }
        }
        .v-stepper__step__step {
          background-color: white !important;
          color: #06b7b4 !important;
          .v-icon {
            color: #06b7b4 !important;
          }
        }
      }
      .space-under {
        width: 100%;
        height: 1px;
      }
      .footer-stepper {
        padding: 0 24px;
        h4 {
          @extend .txt-color-white;
        }
        .total-money {
          font-size: 2em;
        }
      }
    }
  }
  .block-ship-today {
    background: #d5f6f5;
    padding: 40px;
    color: #1b2534;
    margin-top: -100px;
    z-index: 1;
    position: relative;
    .ship-today-right {
      margin-top: 50px;
    }
    h2 {
      font-family: Roboto;
      font-style: normal;
      font-weight: 900;
      font-size: 44px;
      line-height: 150%;
      color: #354a67 !important;

      margin-top: 30px;
      margin-bottom: 20px;

      @media screen and (max-width: 1060px) {
        font-size: 40px;
      }
      @media screen and (max-width: 990px) {
        font-size: 35px;
      }
      @media screen and (max-width: 890px) {
        font-size: 30px;
      }
      @media screen and (max-width: 768px) {
        font-size: 28px;
      }
    }
    p {
      font-size: 14px;
      margin-bottom: 30px;
      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }
    .v-btn.v-btn--has-bg {
      @extend .bg-color;
      color: #fff;
      font-size: 12px;
    }
    .btn-sign-up {
      border-radius: 0px !important;
      width: 200px;
      height: 50px;
      margin-right: 10px;
      @media screen and (max-width: 768px) {
        padding: 5px 8px !important;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .main-create .stepper-tablet .v-stepper__content:not(:last-child) {
    border-left: 2px solid white !important;
    height: 60px;
  }
  .main-create {
    .tablet-card {
      .stepper-tablet {
        .stepper3 {
          height: 150px;
        }
      }
    }
  }
  .main-create .stepper-tablet h2 {
    margin-bottom: 20px;
  }
  .v-stepper--vertical .v-stepper__step {
    padding: 0px 10px 0px 7px;
  }
  .main-create .stepper-tablet .footer-stepper {
    padding: 0 10px;
    margin-top: -100px;
  }
  .v-application--is-ltr .v-stepper--vertical .v-stepper__content {
    margin: -15px -36px -16px 18px;
  }
}

// @media only screen and (max-width: 600px) {
//   .main-create .stepper-tablet .v-stepper__content:not(:last-child) {
//     border-left: 2px solid white !important;
//     height: 60px;
//   }
//   .main-create {
//     .tablet-card {
//       .stepper-tablet {
//         .stepper3 {
//           height: 150px;
//         }
//       }
//     }
//   }
//   .main-create .stepper-tablet h2 {
//     margin-bottom: 20px;
//   }
//   .v-stepper--vertical .v-stepper__step {
//     padding: 0px 10px 0px 7px;
//   }
//   .main-create .stepper-tablet .footer-stepper {
//     padding: 0 10px;
//     margin-top: -100px;
//   }
//   .v-application--is-ltr .v-stepper--vertical .v-stepper__content {
//     margin: -15px -36px -16px 18px;
//   }
// }
</style>
