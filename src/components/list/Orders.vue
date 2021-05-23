<template>
  <div class="orders-list">
    <v-row class="m-0 text-center title-header">
      <v-col
        v-for="(name, index) in headerTable"
        :key="index"
        class="name-title"
        v-bind:class="{'justify-content-between': index === 0, 'm-w300': index === 3, 'max-w180': index === 4, 'max-w100': index === 5 || index === 6}"
      >
        <v-checkbox
            color="primary"
            class="check-all ma-0 pa-0"
            v-model="chooseAllOrders"
            v-if="index === 0 && isShowAll"
          ></v-checkbox>
        <p>
          {{ name }}
        </p>
      </v-col>
    </v-row>
    <div class="pb-5" v-if="dataOrdersList.length > 0">
      <v-row
        class="border-item text-center"
        v-for="(item, index) in dataOrdersList"
        :key="index"
        style="padding: 0 15px !important"
      >
        <v-col class="d-flex align-center justify-content-between td-item">
          <v-checkbox
            class="mr-5"
            v-model="item.checked"
            v-if="!isOverview"
          ></v-checkbox>
          <p class="text-td">
          {{ item.created }}
          </p>
        </v-col>
        <v-col class="mL20 td-item" v-bind:class="{'mL0': isOverview }">
          <router-link
            :to="`/${role !== 'Customer' ? 'admin' : 'customer'}/order-detail/${
              item.orderCode
            }`"
            custom
            class="text-decoration-none"
          >
            {{ item.orderCode }}
          </router-link>
        </v-col>
        <v-col class="td-item"> {{ item.from }} </v-col>
        <v-col class="m-w300 td-item">
          {{ item.reciever.fullName }} - {{ item.reciever.phone }}
          <br />
          {{ item.reciever.address.ward }}, {{ item.reciever.address.district }},
          {{ item.reciever.address.city }}
        </v-col>
        <v-col class="td-item max-w180">
          <span
            class="rounded-pill text-center status-font px-3 py-2 text-white white-nowrap"
            :class="[`${item.orderStatus[item.orderStatus.length - 1].status}`]"
          >
            {{
              orderStatus(item.orderStatus[item.orderStatus.length - 1].status)
            }}
          </span>
        </v-col>
        <v-col class="td-item max-w100">
          <div v-if="item.payment">
            <strong>{{ item.payment && item.payment.total }} $</strong>
          </div>
          <strong
            :class="(item.payment && item.payment.status) || 'text-green'"
            class="px-3 py-2 text-capitalize"
          >
            {{ (item.payment && paymentStatus(item.payment.status)) || "new" }}
          </strong>
        </v-col>
        <v-col class="td-item max-w100">
          <div
            v-if="!isOverview"
            :class="{
              'action-table': item.status !== 'completed',
              'opac-1': item.status === 'completed',
            }"
          >
            <v-icon class="action-dots pa-3">mdi-dots-horizontal</v-icon>
            <div class="align-center justify-center action-active">
              <router-link
                :to="`/${role != 'Customer' ? 'admin' : 'customer'}/order-detail/${
                  item.orderCode
                }`"
                custom
              >
                <div class="icon-action pa-2 rounded-circle">
                  <v-img
                    :src="
                      require('../../assets/images/common/customer/icon_edit.svg')
                    "
                    width="15"
                  />
                </div>
              </router-link>
              <div v-if="!item.checkPay">
                <div
                  v-if="!isTrash"
                  class="icon-action pa-2 rounded-circle ml-3"
                  @click="removeOrder(index, false)"
                >
                  <v-img
                    :src="
                      require('../../assets/images/common/customer/Delete.svg')
                    "
                    width="20"
                  />
                </div>
                <div
                  v-else
                  class="icon-action pa-2 rounded-circle ml-3"
                  @click="removeOrder(index, true)"
                >
                  <v-img :src="restore" width="18" />
                </div>
              </div>
            </div>
          </div>
          <div v-else class="d-flex justify-center">
            <router-link
              :to="`/${role !== 'Customer' ? 'admin' : 'customer'}/order-detail/${
                item.orderCode
              }`"
              custom
            >
              <div class="icon-action pa-2 rounded-circle">
                <v-img
                  :src="
                    require('../../assets/images/common/customer/icon_edit.svg')
                  "
                  width="15"
                />
              </div>
            </router-link>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="font-weight-black px-3 text-total-list" v-if="!isOverview">
      {{ listOrders.length }} Orders
    </div>
    <div class="text-center pb-5" v-if="checkViewMore">
      <Button
        label="View More"
        color="btn-primary"
        width="200"
        :disabled="viewMore"
        @submit:btnSubmit="$emit('submit:viewMore')"
      />
    </div>
    <div v-else class="text-center pb-5"><h3>No more order to show</h3></div>
  </div>
</template>
<script>
import Button from "@component/shares/Button";
const restore = require("../../assets/images/order-detail/restore.png");

export default {
  name: "Orders",
  components: { Button },
  props: {
    isShowAll: {
      type: Boolean,
      default: false
    },
    listOrders: {
      type: Array,
      require: true
    },
    isRole: {
      type: String,
      require: true
    },
    trash: {
      type: Boolean,
      require: true
    },
    view: {
      type: Boolean,
      require: true
    },
    showViewMore: {
      type: Boolean,
      default: true
    },
    isOverview: {
      type: Boolean,
      default: false
    },
    hidenChooseAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dataOrdersList() {
      return this.$props.listOrders;
    },
    role() {
      return this.$props.isRole;
    },
    isTrash() {
      return this.$props.trash;
    },
    viewMore() {
      return this.$props.view;
    },
    checkViewMore() {
      return this.$props.showViewMore;
    }
  },
  watch:{
    chooseAllOrders(val){
      this.$emit('update:chooseAll', val)
    },
    hidenChooseAll(){
      this.chooseAllOrders = false
    }
  },
  data: () => ({
    restore,
    chooseAllOrders: false,
    headerTable: [
      "Created Date",
      "Order ID",
      "From",
      "To",
      "Status",
      "Payment",
      "Action"
    ]
  }),
  methods: {
    removeOrder(index, checkRestore) {
      this.$emit("trash:Remove", index, checkRestore);
    },
    paymentStatus(status) {
      switch (status) {
        case "completed":
          return "Success";
        case "pending":
          return "Request";
        case "failed":
          return "Fails";
        case "cancel":
          return "Cancel";
        default:
          return "new";
      }
    },
    orderStatus(status) {
      switch (status) {
        case "created":
          return "Created";
        case "FedEx_Recived":
          return "FedEx Received";
        case "FedEx_GHUS":
          return "FedEx Shipping";
        case "GHUS_Recived":
          return "GHUS Received";
        case "To_VN":
          return "Shipping to Vietnam";
        case "delivered":
          return "Delivered";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.orders-list {
  .td-item{
    padding: 8px 2px;
  }
  .max-w180{
    max-width: 180px !important;
  }
  .max-w100{
    max-width: 100px !important;
  }
  .m-w300{
    min-width: 300px !important;
  }
  .text-td{
    align-self: center;
    font-size: 14px;
    margin-bottom: 0;
  }
  .name-title{
    display: flex;
    justify-content: center;
    align-items: center;
    .check-all{
      align-self: center;
      height: 24px;
    }
  }
  .white-nowrap {
    white-space: nowrap;
  }
  .title-header {
    border-radius: 4px;
    margin: 0 15px;
    text-align: center;
    font-size: 14px;
    text-align: left;
    align-items: center;
  }
  .border-item {
    border-bottom: 1px solid rgb(0 0 0 / 6%);
    margin: 0 !important;
    text-align: center;
    font-size: 13px;
    align-items: center;
    color: #5d6e85;
    letter-spacing: 0.1px;
    line-height: 16px;
    &:first-child{
       border-top: 1px solid rgb(0 0 0 / 6%);
    }
    .completed {
      color: #06b7b4;
    }
    .failed {
      color: #ed2224;
    }
    .cancel {
      color: #700002;
    }
    .pending {
      color: #f67b2b;
    }
  }
  .action-active {
    display: none;
    cursor: pointer;
    .icon-action {
      cursor: pointer;
      &:hover {
        background-color: whitesmoke;
      }
    }
  }
  .action-table {
    &:hover {
      .action-dots {
        display: none;
      }
      .action-active {
        display: flex;
      }
    }
  }
  .opac-1 {
    opacity: 0.5;
  }
  .created {
    background: #f67b2b;
    color: #fff;
  }
  .FedEx_Recived {
    background: #06b7b4;
    color: #fff;
  }
  .FedEx_GHUS {
    background: #ed2224;
    color: #fff;
  }
  .GHUS_Recived {
    background: green;
    color: #fff;
  }
  .To_VN {
    background: blue;
    color: #fff;
  }
  .delivered {
    background: purple;
    color: #fff;
  }
  
}
</style>
