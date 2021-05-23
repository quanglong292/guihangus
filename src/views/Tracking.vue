<template>
  <v-main app>
    <TopBar />
    <div
      class="circular"
      :style="{ 'background-image': 'url(' + imgBanner + ')' }"
    >
      <v-container>
        <div class="main-banner mt0">
          <div class="search-form-container">
            <div class="search-tracking">
              <h2>Track your shipment</h2>
              <p class="note">Ex: VUPX0000X2</p>
              <v-text-field
                hide-details="auto"
                outlined
                dense
                chips
                small-chips
                type="text"
                placeholder="Enter reference code"
                v-model="referenceCode"
                class="trackingInput"
              ></v-text-field>
              <v-row>
                <v-col cols="5" md="2">
                  <v-btn
                    elevation="0"
                    @click="trackShipment"
                    :disabled="submitting"
                    dense
                  >
                    <v-img :src="searchIcon" />
                    <span class="ml-1">Search</span>
                  </v-btn>
                </v-col>
                <v-col class="pa-0" cols="5" md="10">
                  <!-- Content Tracking Empty -->
                  <p class="text-center no-results" v-if="isTrack && nofound">
                    No results found!
                  </p>
                </v-col>
              </v-row>
            </div>
            <div class="search-triangle"></div>
          </div>
        </div>
      </v-container>
    </div>

    <div class="">
      <v-container v-if="!isTrack">
        <v-container class="mtb-60">
          <div class="center">
            <v-img
              :src="require('../assets/logo_1.svg')"
              width="100"
              class="margin-auto"
            />
           <p class="head-line">
            We give you control of your shipments
            </p>
            <p class="text-base about-headline">
              We invest time and expertise to fully understand your business before designing plans to improve your supply chain. We take responsibility for the performance of all our suppliers and for ensuring the availability of resources and equipment needed to control the flow of goods under our charge.
            </p>
          </div>
        </v-container>

        <v-container class="mb-100"><Process /></v-container>
      </v-container>

      <!-- Content Tracking -->

      <v-container v-if="isTrack && !nofound">
        <div v-if="!loading" class="text-center px-10 py-10">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <v-card class="pa-2 pa-sm-10 tracking-content" v-else>
          <v-row class="align-center mb-6" no-gutters>
            <v-col class="col-4">
              <h2>Reference Number</h2>
            </v-col>
            <v-col class="col-8">
              <div class="right-tracking">
                <span class="referenceNumber">{{
                  dataOrder && dataOrder._id
                }}</span>
              </div>
            </v-col>
          </v-row>
          <v-row class="align-center mb-12" no-gutters>
            <v-col class="col-4">
              <h2>Tracking</h2>
            </v-col>
            <v-col class="col-8">
              <div class="right-tracking d-flex">
                <span class="status text-capitalize">{{
                  dataOrder && dataOrder.status
                }}</span>
              </div>
            </v-col>
          </v-row>
          <v-row class="align-center mb-4" no-gutters>
            <v-col class="col-4">
              <h2>Your package</h2>
            </v-col>
          </v-row>
          <div
            v-for="(pac, index) of packages"
            :key="index"
            class="yourPackage"
          >
            <h2>Package #{{ index + 1 }}</h2>
            <v-row no-gutters class="align-center mt-4 mb-4">
              <v-col class="col-5">
                <span class="tit-tracking mb-0"
                  ><v-icon>mdi-circle-small</v-icon>Weight</span
                >
              </v-col>
              <v-col class="col-7 text-left">
                <div class="right-tracking">
                  <span>{{ pac.Weight.Value }} {{ pac.Weight.Units }}</span>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-12">
              <v-col class="col-5">
                <p class="tit-tracking">
                  <v-icon>mdi-circle-small</v-icon>Item
                </p>
              </v-col>
              <v-col class="col-7">
                <div
                  class="d-flex justify-space-between mb-2"
                  v-for="(val, index) of pac.items"
                  :key="index"
                >
                  <div>
                    {{ val.item }}
                  </div>
                  <div>x {{ val.quanlity }} {{ val.unit }}</div>
                </div>
              </v-col>
            </v-row>
          </div>

          <v-row class="align-center mb-4" no-gutters>
            <v-col class="col-5">
              <h2>Receiver Infomation</h2>
            </v-col>
          </v-row>
          <v-row no-gutters class="align-center">
            <v-col class="col-5">
              <p class="tit-tracking">
                <v-icon>mdi-circle-small</v-icon>Full Name
              </p>
            </v-col>
            <v-col class="col-7">
              <div class="d-flex justify-start mb-2">
                <div>
                  {{ dataOrder && dataOrder.recipient.fullName }}
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters class="align-center">
            <v-col class="col-5">
              <p class="tit-tracking">
                <v-icon>mdi-circle-small</v-icon>Address
              </p>
            </v-col>
            <v-col class="col-7">
              <div class="d-flex justify-start mb-2">
                <div>
                  {{
                    dataOrder &&
                    `
                    ${dataOrder.recipient.address.line}, 
                    ${dataOrder.recipient.address.ward}, 
                    ${dataOrder.recipient.address.district}, 
                    ${dataOrder.recipient.address.city}
                  `
                  }}
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters class="align-center">
            <v-col class="col-5">
              <p class="tit-tracking">
                <v-icon>mdi-circle-small</v-icon>Phone Number
              </p>
            </v-col>
            <v-col class="col-7">
              <div class="d-flex justify-start mb-2">
                <div>
                  {{ dataOrder && dataOrder.recipient.phone }}
                  806-795-1077
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters class="align-center">
            <v-col class="col-5">
              <p class="tit-tracking"><v-icon>mdi-circle-small</v-icon>Email</p>
            </v-col>
            <v-col class="col-7">
              <div class="d-flex justify-start mb-2">
                <div>
                  {{ dataOrder && dataOrder.recipient.email }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </div>

    <v-row>
      <div class="block-ship-today">
        <v-container no-gutters>
          <v-row class="align-center">
            <v-col col-8>
              <h2>Start shipping today!</h2>
              <p>Integer pellentesque quam sit nisl auctor.text-capitalize</p>
            </v-col>
            <v-col col-4 class="text-right">
              <router-link to="/login">
                <v-btn elevation="0" class="uppercase"
                  >CLICK HERE TO SIGN UP</v-btn
                >
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-row>
    <Footer :isMargin="false" />
  </v-main>
</template>

<script>
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import Process from "../components/Process";

import { getOrderDetailTracking } from "../store/order";
import _ from "lodash";

const imgBanner = require("../assets/images/tracking/pic6.jpg");
const searchIcon = require("../assets/images/tracking/search.svg");

export default {
  name: "Tracking",
  components: { TopBar, Footer, Process },
  data: () => ({
    imgBanner,
    searchIcon,
    isTrack: false,
    submitting: false,
    loading: false,
    referenceCode: null,
    nofound: false,
    packages: [],
    dataOrder: null,
  }),
  methods: {
    async trackShipment() {
      this.loading = false;
      this.isTrack = true;
      this.submitting = true;
      const result = await getOrderDetailTracking(this.referenceCode);
      if (result.statusCode === 200) {
        result?.data?.RequestedPackageLineItems?.map((item) => {
          this.packages.push(item);
        });
        this.dataOrder = _.pick(result.data, ["recipient", "status", "_id"]);
        this.nofound = false;
      } else this.nofound = true;
      this.submitting = false;
      this.loading = true;
    },
  },
};
</script>
<style lang="scss">
.container {
  max-width: 1140px;
  position: relative;
}
.mt0 {
  margin-top: 0 !important;
}
.bg-color {
  background-color: #06b7b4 !important;
}
.mtb-60 {
  margin-top: 80px;
}
.head-line {
  font-size: 44px;
  font-weight: 900;
  margin-top: 10px;
  padding: 0 60px;
}
.border-gray {
  border: 1px solid #ebedf0;
  p {
    &:last-child {
      font-size: 16px;
    }
  }
}
.sub-header {
  font-size: 26px;
  font-weight: 700;
  margin-top: 15px;
}
.price {
  color: #06b7b4;
  font-size: 32px;
  font-weight: 900;
}
.border-bottom-blue {
  border-bottom: 4px solid #06b7b4;
}
.detail {
  font-size: 14px;
}
.avatar {
  margin-top: -100px;
}
.block-ship-today {
  background: #d5f6f5;
  padding: 40px;
  color: #1b2534;
  z-index: 1;
  position: relative;
  width: 100%;
  h2 {
    margin-bottom: 10px;
    color: #000;
  }
  p {
    font-size: 14px;
  }
  .v-btn.v-btn--has-bg {
    @extend .bg-color;
    color: #fff;
    font-size: 12px;
  }
}
.tracking-content {
  .status {
    background: #06b7b4;
    color: #fff;
    padding: 10px 350px 10px 15px;
    // width: 80%;
  }
  .tit-tracking {
    font-size: 18px;
    list-style: disc;
  }
  .v-icon.v-icon {
    color: #06b7b4;
  }
  h2 {
    font-size: 18px;
    color: #696a6c;
  }
  span {
    font-size: 18px;
  }
  .col-7 {
    font-size: 18px;
  }
  .yourPackage {
    h2 {
      color: #5d6e85;
    }
  }
}

.mb-6 {
  margin-bottom: 60px !important;
}
.circular {
  width: 100%;
  height: 420px;
  margin-top: -50px;
  background-size: cover;
  background-position: center;
  position: relative;
}
.main-banner {
  width: 100%;
  position: relative;
  height: 420px;
}
.trackingInput {
  margin-bottom: 20px !important;
}
.search-form-container {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  .search-tracking {
    position: relative;
    z-index: 9;
    background: #06b7b4;
    padding: 30px 120px 40px 40px;
    clip-path: polygon(0 0, 100% 0, 84% 100%, 0% 100%);
    width: 600px;
    height: auto;
    overflow: hidden;
    h2 {
      color: #fff;
      margin-bottom: 20px;
      font-size: 32px;
    }
    p {
      font-size: 12px;
      color: #05070a75;
      font-weight: 500;
      margin-bottom: 0;
    }
    .no-results {
      line-height: 76px;
      color: #05070a;
      font-size: 18px;
      font-weight: normal;
    }
    .v-input__control {
      background: #fff;
      border: none;
      margin-bottom: 20px;
    }
    .v-text-field input {
      background: #fff;
      border: none;
    }
    .theme--light.v-btn.v-btn--has-bg {
      background: #1b2534;
      color: #fff;
    }
  }
  .search-triangle {
    height: 183px;
    position: absolute;
    bottom: 0;
    right: 0%;
    width: 100px;
    -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background: #1b2534;
  }
}
@media only screen and (max-width: 768px) {
  .search-form-container {
    top: 45%;
    right: 3%;
    .search-tracking {
      padding: 15px 70px 30px 30px;
      top: 45%;
      height: auto;
    overflow: hidden;
      .no-results {
        line-height: 0;
        margin: 35px 0px 7px 25px;
        font-size: 20px;
      }
      .status {
        padding: 10px 200px 10px 15px;
      }
    }
  }
  .search-triangle {
    bottom: 0;
  }
}
@media only screen and (max-width: 605px) {
  .circular {
    height: 400px;
  }
  .search-form-container {
    top: 35%;
    right: 6%;
    .search-tracking {
      padding: 10px 70px 10px 15px;
      top: 25%;
      width: 300px;
      
      height: auto;
    overflow: hidden;
      .trackingInput {
        font-size: 10px;
      }
      h2 {
        font-size: 18px;
        margin: 0;
      }
      p {
        font-size: 10px;
        margin: 5px 0;
      }
      .no-results {
        margin: 25px 0px 0px 15px;
        font-size: 10px;
        line-height: 0;
      }
      .v-btn:not(.v-btn--round).v-size--x-large {
        padding: 5px 7px;
        height: 25px;
        .v-btn__content {
          font-size: 10px;
        }
      }
      .v-input__control {
        margin: 0;
      }
    }
    .search-triangle {
      bottom: 0;
      height: 165px;
    }
  }
  .block-ship-today {
    padding: 10px 10px;
    h2 {
      font-size: 20px;
    }
    p {
      font-size: 11px;
    }
    .v-btn__content {
      font-size: 10px;
    }
    .v-btn.v-btn--has-bg {
      font-size: 4px;
    }
  }
  .tracking-content {
    h2 {
      font-size: 15px;
    }
    span {
      font-size: 12px;
    }
    .tit-tracking {
      font-size: 12px;
      list-style: disc;
    }

    .col-7 {
      font-size: 12px;
    }
    .status {
      padding: 10px 100px 10px 15px;
    }
  }
}
</style>
