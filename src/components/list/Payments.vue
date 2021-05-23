<template>
  <div class="orders-list">
    <div class="list list-order">
      <v-row
        class="m-0 text-center title-header px-3 mT0"
        style="margin-bottom: 10px"
      >
        <v-col
          v-for="(name, index) in headerTable"
          :key="index"
          class="name-title"
        >
          <p>{{ name }}</p>
        </v-col>
      </v-row>
      <div class="pb-5" v-if="dataPaymentsList.length > 0">
        <v-row
          class="border-item text-center px-3 py-1"
          v-for="(item, index) in dataPaymentsList"
          :key="index"
        >
          <v-col class="rounded-full text-center">
            <p
              class="text-capitalize"
              v-bind:class="{
                'btn-pending': item.status === 'pending',
                'btn-decline': item.status === 'failed',
                'btn-completed': item.status === 'completed',
                'btn-cance': item.status === 'cancel',
              }"
            >
              {{ paymentStatus(item.status) }}
            </p>
          </v-col>
          <v-col class="py-6">{{ item.code }}</v-col>
          <v-col> {{ item.total }} </v-col>
          <v-col>
            {{ item.fullName }}
          </v-col>
          <v-col>
            <div>
              <div class="align-center justify-center d-flex">
                <router-link
                  :to="`/${
                    role !== 'Customer' ? 'admin' : 'customer'
                  }/order-detail/${item.code}`"
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
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="font-weight-black px-3 text-total-list" v-if="!overview">
        {{ dataPaymentsList.length }} payments
      </div>
      <div class="text-center pb-5 mBT20" v-if="!checkViewMore">
        <Button 
          label="View More" 
          color="btn-primary" 
          width="200"
          :disabled="viewMore"
          @submit:btnSubmit="$emit('submit:morePayments')"
        />
      </div>
      <div v-else class="text-center pb-5"><h3>No more payment to show</h3></div>
    </div>
  </div>
</template>

<script>
// import * as moment from "moment";

import Button from "@component/shares/Button";

export default {
  name: "PaymentsTable",
  components: { Button },
  props: {
    payments:{
      type: Array,
      require: true
    },
    viewMore:{
      type: Boolean,
      default: false
    },
    roleUser:{
      type: String,
      require: true
    },
    isOverview:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    checkViewMore(){
      return this.$props.viewMore
    },
    dataPaymentsList(){
      return this.$props.payments
    },
    role(){
      return this.$props.roleUser
    },
    overview(){
      return this.$props.isOverview
    }
  },
  data: () => ({
    headerTable: [
      "Transactions Status",
      "Order ID",
      "Amount",
      "User",
      "Action"
    ]
  }),
  methods:{
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
  }
};
</script>

<style lang="scss" scoped>
::v-deep{
  .list-payment-tabs.list-payment-tabs.list-payment-tabs{
    .icon-bar.active{
      width: 100% !important;
    }
  }
  .list {
    background: #fff;
  }
  .title-header {
    border-radius: 4px;
    margin: 10px 15px;
    text-align: center;
    font-size: 14px;
    text-align: left;
    align-items: center;
    .name-title {
      font-weight: 500;
      text-align: center;
      font-size: 16px !important;
    }
  }
}

</style>
