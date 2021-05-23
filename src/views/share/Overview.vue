<template>
  <div class="main-cutoms overview-page">
    <v-row>
      <v-col class="col-12">
        <v-row class="mb-4">
          <v-col>
            <v-card class="box-top-overview">
              <div class="d-flex align-center relative middle-content">
                <div
                  class="count-total d-flex justify-center align-center primary--text font-weight-bold left-top-overview"
                >
                  {{ (this.orderTotal && this.orderTotal.s1) || 0 }}
                </div>
                <div class="right-top-overview">
                  <div class="icon-actions relative">
                    <v-icon @click="orderDelivered">$arrow_right_circle</v-icon>
                    <!-- <TooltipAction v-show="show" :listAction="listAction" /> -->
                  </div>
                  <p class="label-total mb-0">Order Delivered</p>
                  <p class="label-total sub-label-total mb-0">Successful order to Recipient</p>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="box-top-overview">
              <div class="d-flex align-center middle-content">
                <div
                  class="count-total d-flex justify-center align-center primary--text font-weight-bold left-top-overview"
                >
                  {{ (this.orderTotal && this.orderTotal.s2) || 0 }}
                </div>
                <div class="right-top-overview">
                  <div class="icon-actions relative">
                    <v-icon @click="orderPending">$arrow_right_circle</v-icon>
                  </div>
                  <p class="label-total mb-0">Order Pending</p>
                  <p class="label-total sub-label-total mb-0">On the way to Recipient</p>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="box-top-overview">
              <div class="d-flex align-center middle-content">
                <div
                  class="count-total d-flex justify-center align-center primary--text font-weight-bold left-top-overview"
                >
                  {{ (this.orderTotal && this.orderTotal.s3) || 0 }}
                </div>
                <div class="right-top-overview">
                  <div class="icon-actions relative">
                    <v-icon @click="orderNeedToPay">$arrow_right_circle</v-icon>
                  </div>
                  <p class="label-total mb-0">Order Need to Pay</p>
                  <p class="label-total sub-label-total mb-0">
                    Please process your pending payment
                  </p>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-row class="mb-4 align-strech" v-if="user && user.role === 'Customer'">
          <v-col cols="12" md="6" v-if="orderLasted">
            <v-responsive class="box-shadow" width="100%" :aspect-ratio="21/9">
              <div class="payCard pa-7">
                <div class="paySection1">
                  <div class="payContent white--text">
                    <div>ID {{orderLasted.code}}</div>
                    <h1>$ {{orderLasted.payment.total}},00</h1>
                    <div>Surcharge included</div>
                  </div>
                  <div class="payLogo">
                    <router-link
                      class="white--text text-decoration-none" 
                      :to="`/${user.role == 'Admin' ? 'admin' : 'customer'}/order-detail/${orderLasted.code}`"
                      custom
                    >
                        <img :src="PayLogo" alt="" />
                    </router-link>
                  </div>
                </div>
                <div class="paySection2">
                  <Button 
                      label="PAY NOW"
                      color="font-weight-bold mr-10"
                      :disabled="disabledBtn"
                      large
                      depressed
                      @submit:btnSubmit ="payPayment"
                    />
                  <router-link
                    class="white--text text-decoration-none" 
                    :to="`/${user.role == 'Admin' ? 'admin' : 'customer'}/order-detail/${orderLasted.code}`"
                    custom
                  >
                    <v-btn class="white--text" color="white" outlined x-large>View Detail</v-btn>
                    
                  </router-link>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="#06b7b4"
                  fill-opacity="1"
                  d="M0,96L60,117.3C120,139,240,181,360,197.3C480,213,600,203,720,181.3C840,160,960,128,1080,106.7C1200,85,1320,75,1380,69.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                ></path>
              </svg>
            </v-responsive>
          </v-col>
          <v-col cols="12" md="6">
            <img :src="promotion" width="100%">
          </v-col>
        </v-row>
        <v-row class="mb-4" v-else>
          <v-col class="col-12" >
            <img :src="banner" alt="" width="100%">
          </v-col>
        </v-row> -->
        <v-row>
          <v-col class="col-12">
            <div class="pb-5">
              <div class="box-shadow-default bg-white rounded" v-if="paymentsList.length > 0">
                <div class="d-flex justify-space-between align-center mb-8">
                  <h2 class="font-size18 text-title-overview">Payments</h2>
                </div>
                <div v-if="!checkListPayments" class="text-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </div>
                <div v-else>
                  <PaymentsList
                    :viewMore="false"
                    :payments="paymentsList"
                    :roleUser="user.role"
                    :isOverview="true"
                    @submit:morePayments="morePayments"
                  />
                </div>
              </div>
            </div>

            <div class="pb-5">
              <div class="box-shadow-default bg-white rounded" v-if="ordersList.length > 0">
                <div class="d-flex justify-space-between align-center mb-8">
                  <h2 class="font-size18 text-title-overview">Latest Orders</h2>
                </div>
                <div v-if="!checkListOrders" class="text-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </div>
                <div v-else>
                  <Orders
                    :isRole="user.role"
                    :trash="false"
                    :listOrders="ordersList"
                    :view="false"
                    :showViewMore="true"
                    :isOverview="true"
                    @submit:viewMore="viewMore"
                  />
                </div>
              </div>
            </div>
            <div class="pb-5">
              <div class="box-shadow-default bg-white rounded" v-if="usersList.length > 0">
                <div class="d-flex justify-space-between align-center mb-8">
                  <h2 class="font-size18 text-title-overview">Users</h2>
                </div>
                <div v-if="!checkListUsers" class="text-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </div>
                <div v-else>
                  <UserTable
                    :isRole="user.role"
                    :trash="false"
                    :showViewMore="true"
                    :isOverview="true"
                    :users="usersList"
                    @submit:usersMore="usersMore"
                  />
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Orders from "@component/list/Orders";
import PaymentsList from "@component/list/Payments";
import UserTable from "@component/list/Users";

import { getCustomers } from "@store/user";
// import { getSquare } from "@store/payment";
import { getOrderLasted, getOrders, getOrderTotal } from "@store/order";
import { getPayments } from "@store/payment";

import * as moment from "moment";

const BannerLogo = require("../../assets/images/overview/bannerLogo.png");
const PayLogo = require("../../assets/images/overview/Rectangle 555.png");
const promotion = require("../../assets/images/overview/promotion.png");
const banner = require("../../assets/images/overview/banner.png");

export default {
  name: "Overview",
  components: { Orders, PaymentsList, UserTable },
  data: () => ({
    BannerLogo,
    PayLogo,
    promotion,
    banner,
    disabledBtn: false,
    show: false,
    checkListOrders: false,
    checkListPayments: false,
    checkListUsers: false,
    user: null,
    orderLasted: null,
    orderTotal: null,
    model: 0,
    stepper: {
      package: false,
      from: false,
      to: false
    },
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    listAction: [
      {
        name: "View"
      },
      {
        name: "Delete"
      }
    ],
    headerTable: [
      {
        name: "Created Date"
      },
      {
        name: "Order ID"
      },
      {
        name: "From"
      },
      {
        name: "Reciever"
      },
      {
        name: "Status"
      },
      {
        name: "Action"
      }
    ],
    ordersList: [],
    paymentsList: [],
    usersList: []
  }),
  created() {
    this.getLocalstorage();
    this.getDetailOrderslasted();
    this.getTotalOrder();
    this.getOrders({ limit: 10, page: 1, trash: false });
    if (this.user.role !== 'Customer') {
      this.getPayments({ limit: 10, page: 1, trash: false })
      this.getUsers({ limit: 10, page: 1, trash: false })
    }
  },
  methods: {
    getLocalstorage() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    async getTotalOrder() {
      const result = await getOrderTotal();
      if (result.statusCode === 200) {
        this.orderTotal = result.data || null;
      }
    },
    async getDetailOrderslasted() {
      const result = await getOrderLasted();
      this.orderLasted = result.data;
    },
    async getOrders(query) {
      const result = await getOrders(query);
      if (result?.data.length > 0) {
        const data = result?.data?.map(item => {
          const dataItem = {
            created: moment(item.createdAt).format("MMMM D, YYYY"),
            orderId: item._id,
            orderCode: item.code,
            from: `${item.shipper.Address.City}, ${item.shipper.Address.StateOrProvinceCode}, ${item.shipper.Address.PostalCode}`,
            reciever: item.recipient,
            shipper: item.shipper,
            orderStatus: item.orderStatus,
            payment: item.payments || null,
            checked: false,
            removed: false
          };
          return dataItem;
        });
        this.ordersList = data;
      }
      this.checkListOrders = true;
    },
    async getUsers(query) {
      const result = await getCustomers(query)
      if (result.statusCode === 200) {
        this.usersList = result.data?.map(item =>{
          item.checked = false
          return item
        })
      }
      this.checkListUsers = true
    },
    viewMore() {
      const url = `/${this.user.role !== "Customer" ? "admin" : "customer"}/orders`;
      this.$router.push({ path: url });
    },
    usersMore(){
      const url = `/${this.user.role !== "Customer" ? "admin" : "customer"}/customers`;
      this.$router.push({ path: url });
    },
    // async payPayment() {
    //   this.disabledBtn = true;
    //   const result = await getSquare(this.orderLasted.payment._id);
    //   if (result.statusCode === 200) {
    //     window.location.href = result?.data?.squareData?.url;
    //   } else this.disabledBtn = false;
    // },
    orderDelivered() {
      window["filterOrder"] = {
        orderStatus: ["delivered"]
      };
      const url =
        this.user.role === "Customer" ? "/customer/orders" : "/admin/orders";
      this.$router.push({ path: url });
    },
    orderPending() {
      window["filterOrder"] = {
        orderStatus: ["To_VN"]
      };
      const url =
        this.user.role === "Customer" ? "/customer/orders" : "/admin/orders";
      this.$router.push({ path: url });
    },
    orderNeedToPay() {
      window["filterOrder"] = {
        status: "pending",
        orderStatus: ["GHUS_Recived"]
      };
      const url =
        this.user.role === "Customer" ? "/customer/orders" : "/admin/orders";
      this.$router.push({ path: url });
    },
    async getPayments(query){
      const result = await getPayments(query)
      if(result.statusCode === 200) {
        this.paymentsList = result?.data || []
      }
      this.checkListPayments = true
    },
    morePayments(){
      const url = `/${this.user.role !== "Customer" ? "admin" : "customer"}/payments`;
      this.$router.push({ path: url });
    }
  }
};
</script>
<style lang="scss">
.box-top-overview.box-top-overview.box-top-overview {
  min-height: 150px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
  border: none !important;
  .middle-content {
    min-height: 150px;
  }
}
.text-title-overview{
  padding: 20px 20px 0;
}
.count-total {
  background: url("../../assets/images/overview/bg-status.png") no-repeat 0 0;
  background-size: cover;
  width: 126px;
  height: 115px;
  font-size: 25px;
}
.right-top-overview {
  width: calc(100% - 126px);
  margin-left: 14px;
  align-self: center;
  margin-right: 15px;
  padding: 30px 0;
  position: relative;
}
.label-total {
  font-size: 18px;
  color: #5d6e85;
  font-weight: 700;
}
.sub-label-total{
  font-size: 14px;
  font-weight: normal;
}
.icon-actions {
  position: absolute;
  top: 0;
  right: 0;
}

.card-notice {
  background: #fff;
  padding: 40px;
  border: 2px solid #eafafa;
  box-shadow: 0px 20px 30px rgba(167, 209, 233, 0.45);
  background: url("../../assets/images/overview/chat.png") no-repeat right
    bottom;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  .icon-actions {
    top: 10px;
    right: 10px;
  }
}
.box-shadow {
  background: linear-gradient(103.01deg, #06b7b4 0%, #00a4e4 100%);
  box-shadow: 0px 20px 30px rgba(167, 209, 233, 0.45);
  position: relative;
  svg {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .paySection1 {
    display: flex;
    justify-content: space-between;
    .payContent {
      h1 {
        color: white;
        font-size: 44px;
      }
      div {
        font-size: 16px;
      }
    }
    .payLogo {
      background: rgba(255, 255, 255, 0.5);
      padding: 35px;
      border-radius: 50%;
      z-index: 9999;
    }
  }
  .paySection2 {
    position: absolute;
    bottom: 50px;
    left: 4%;
    z-index: 999;
    button {
      &:first-child {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
h2 {
  font-size: 20px;
}

.content {
  width: 70%;
  height: 100%;
  background-color: white;
  padding: 5% 0 5% 5%;
  line-height: 1.5em;
  font-size: 18px;
  text-align: justify;
  background: linear-gradient(167.71deg, #ffffff 37.53%, #eafafa 95.31%);
  h1 {
    font-size: 44px;
    color: #354a67;
  }
  p {
    font-size: 16px;
    color: #354a67;
  }
  .contentBtn {
    background: linear-gradient(103.01deg, #06b7b4 0%, #00a4e4 100%);
  }
  img {
    width: 632px;
  }
}
@media only screen and (max-width: 600px) {
  .main-cutoms {
    padding: 5px;
  }
  h2 {
    font-size: 15px;
  }
  .status {
    padding: 2px 10px;
  }
}
</style>
