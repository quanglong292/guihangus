<template>
  <div class="main-cutoms create-label-page">
    <v-row v-if="loading">
      <v-col cols="8" sm="8">
        <div>
          <v-card class="p-10 p30">
            <div v-if="checkEditOrder === 'editAddress'">
              <Shipper
                orderEdit
                title="Sender"
                :place="true"
                :shipper="shipper"
                @update:shipper="handleUpdateShipper"
              />
              <Recipient
                orderEdit
                :recipient="recipient"
                :places="true"
                @update:recipient="handleUpdateRecipient"
              />
            </div>
            <div v-else>
              <div class="block">
                <h2>What size is your package?</h2>
                <p>
                  Quam ut tempor feugiat morbi rhoncus. Viverra volutpat in
                  ligula faucibus eu est velit a.
                </p>
              </div>
              <Package
                :inforPackage="requestedPackageLineItems"
                :reciverAddress="recipient.Address.city"
                @update:package="handleUpdatePackage"
              />
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col class="fixed-container" cols="4" sm="4" lg="4" md="4">
        <v-card class="mx-auto payment-admin">
          <div class="block-label py-2 pl-5">
            <h2 class="card-title">Payment</h2>
          </div>
          <div class="content-payment">
            <div class="first-div">
              <p class="p-left">Sub-total</p>
              <p class="p-right">$ <span>{{total}}</span></p>
            </div>
            <div class="first-div">
              <p class="p-left">Surcharge</p>
              <p class="p-right">$ <span>{{surcharge}}</span></p>
            </div>
            <div class="second-div">
              <p class="p-left">Total</p>
              <p class="p-right">$ <span>{{totalLastest}}</span></p>
            </div>
            <Button 
              class="bg-color" 
              label="Save changes" 
              width="100%" 
              :disabled="disabled || submitUpdate"
              :progress="isChange"
              @submit:btnSubmit="update"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div v-else class="justify-center d-flex">
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
import { updateOrder, getOrderDetail } from "@store/order";
import { rateOrder } from "@store/label";

import Shipper from "@component/label/LabelShipper";
import Package from "@component/label/LabelPackage";
import Recipient from "@component/label/LabelRecipient";
import Button from "@component/shares/Button";

import Toast from "@component/Toast";

// import * as moment from "moment";
// import _ from "lodash";
export default {
  name: "EditOrderDetail",
  components: {
    Shipper,
    Package,
    Recipient,
    Toast,
    Button
  },
  data: () => ({
    id: "",
    role: "",
    loading: false,
    isChange: false,
    submitUpdate: false,
    total: 0,
    totalLastest: 0,
    totalLbs: 0,
    surcharge: 0,
    step: 1,
    checkEditOrder: null,
    order: null,
    stepper: {
      package: true,
      from: true,
      to: true
    },
    infoBanner: {
      title: "Creating Label",
      content: "We give you control of your shipments"
    },
    shipper: {
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
    recipient: {
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
    requestedPackageLineItems: [
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
    infoLabel: {
      total: 0,
      subChange: 0
    },
    PackageCount: "1",
    toast: {
      content: "",
      open: false
    }
  }),
  computed: {
    disabled() {
      let check = false;
      if (
        !this.stepper.package ||
        !this.stepper.from ||
        !this.stepper.to ||
        !this.isChange
      )
      check = true;
      return check;
    }
  },
  async created() {
    const dataRoute = this.$route;
    this.id = dataRoute?.params?.id;
    this.role = JSON.parse(localStorage.getItem("user"))?.role;
    this.checkEditOrder = window['editOrder'] || null
    if (this.role == "") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push({ path: "/login" });
    }
    if(!this.checkEditOrder) {
      const url = this.role === 'Customer' ? `/customer/order-detail/${this.id}` : `/admin/order-detail/${this.id}`
      this.$router.push({ path: url });
    }
    this.getInfoOrder()
  },
  beforeUnmount() {
    if(this.checkEditOrder) window['editOrder'] = null
  },
  methods: {
    handleUpdateShipper(checkFrom) {
      this.stepper.from = checkFrom;
      this.isChange = checkFrom
    },
    handleUpdatePackage(total, totalLbs, checkPackage) {
      this.totalLastest = total;
      this.surcharge = total - this.total
      this.infoLabel.total = total
      this.totalLbs = totalLbs;
      this.stepper.package = checkPackage;
      this.isChange = checkPackage
    },
    async handleUpdateRecipient(checkRecipient) {
      this.stepper.to = checkRecipient;
      this.isChange = checkRecipient
      if(checkRecipient){
        const dataRates = [];
        for (let i = 0; i < this.requestedPackageLineItems.length; i++) {
          const packageItem = this.requestedPackageLineItems[i];
          const itemDataRates = {
            weight: packageItem.Weight.Value,
            address: this.recipient.Address.city,
            products: []
          };
          packageItem.items.map(item => {
            itemDataRates.products.push({ id: item.id, qty: item.quanlity });
          });
          dataRates.push(itemDataRates);
        }
        const result = await rateOrder({ body: dataRates });
        this.infoLabel.total = result?.data;
        this.surcharge = result?.data - this.total
      }
    },
    async getInfoOrder(){
      const result = await getOrderDetail(this.id);
      if (result.statusCode === 200) {
        this.order = result?.data
        this.total = result?.data?.total
        this.infoLabel.total = result?.data?.total
        this.shipper = result?.data?.shipper
        this.requestedPackageLineItems = result?.data?.RequestedPackageLineItems
        this.recipientInfo(result?.data?.recipient)
      }
      this.loading = true
    },
    recipientInfo(recipient){
      const data = {
        Contact: {
          PersonName: recipient?.fullName,
          PhoneNumber: recipient?.phone,
          EMailAddress: recipient?.email
        },
        Address: {
          line: recipient?.address?.line,
          city: recipient?.address?.city,
          district: recipient?.address?.district,
          ward: recipient?.address?.ward
        }
      }
      this.recipient = data
    },
    async update(){
      this.submitUpdate = true
      this.toast 
      let infoToast = {
        color: "success",
        content: "Updated Order successfully!",
        open: true
      };
      this.infoLabel.subChange = this.surcharge
      this.infoLabel.shipper = this.shipper
      this.infoLabel.recipient = this.recipient
      this.infoLabel.requestedPackageLineItems = this.requestedPackageLineItems
      const result = await updateOrder(this.id, this.infoLabel)
      if(result.statusCode === 200){
        setTimeout(() => {
          const url = this.role === 'Customer' ? `/customer/order-detail/${this.id}` : `/admin/order-detail/${this.id}`
          this.$router.push({ path: url });
        }, 2000);
      }else {
        infoToast.color = "warning"
        infoToast.content = "Update Order failed!"
        this.submitUpdate = false
      }
      this.toast = infoToast
    }
  }
};
</script>
<style lang="scss" scoped>
.payment-admin {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
  border: none !important;
  .surchange {
    padding: 5px;
    outline: unset;
    width: 50px;
  }
}
.block-label {
  background: #f67b2b;
  padding: 15px;
  h2 {
    color: #fff;
    background: transparent;
  }
  h3 {
    color: black;
  }
  .icon {
    background: #ebedf0;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.content-payment.content-payment.content-payment {
  padding: 20px;
  .v-btn {
    height: 50px !important;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.2px;
    color: #ffffff !important;
    text-transform: initial !important;
  }
}
.first-div {
  display: flex;
  justify-content: space-between;
  width: 100%;
  p.p-left {
    float: left;
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: #5d6e85;
  }
  p.p-right {
    float: right;
    text-align: right;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #5d6e85;
  }
}
.second-div {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #06b7b4;
  padding-top: 15px;
  p.p-left {
    float: left;
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: #1b2534;
  }
  p.p-right {
    float: right;
    text-align: right;
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.2px;
    color: #1b2534;
    span {
      margin-left: 5px;
      display: inline-block;
    }
  }
}
.card-title {
  background: #06b7b4;
  color: #fff;
  font-size: 18px !important;
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
.bg-color {
  background-color: #06b7b4 !important;
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
.box-fixed-right {
  border: 2px solid #eafafa !important;
  box-shadow: 0px 20px 30px rgba(167, 209, 233, 0.45) !important;
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
