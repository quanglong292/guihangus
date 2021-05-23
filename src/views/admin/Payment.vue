<template>
  <div class="main-cutoms pa-0 pa-md-8">
    <div v-if="!loading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <div class="mt-4">
        <div class="title-table pa-1 pa-md-4 list-order-tabs list-payment-tabs">
          <div
            class="icon-bar tab-left"
            @click="changeContentTabs('payment-list', false)"
            v-bind:class="{ active: contentTab === 'payment-list' }"
          >
           <div class="total-list">
              <v-img
                :src="
                  require('../../assets/images/common/customer/icon_box.svg')
                "
                width="20"
                class="mr-2"
              />
              <p class="count">{{ dataPaymentsList.length }}</p>
            </div>
            <p class="mb-0" style="font-weight: 700">
              <span>Payments list </span>
            </p>
          </div>
        </div>
       <PaymentsList
          :viewMore="checkViewMore"
          :payments="dataPaymentsList"
          :roleUser="role"
          @submit:morePayments="morePayments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PaymentsList from "@component/list/Payments";
import { getPayments } from "@store/payment";

import _ from "lodash";

export default {
  name: "Payments",
  components: { PaymentsList },
  data: () => ({
    isTrash: false,
    loading: false,
    checkViewMore: false,
    limit: 30,
    page: 1,
    headerTable: [
      "Transactions Status",
      "Order ID",
      "Amount",
      "User",
      "Action"
    ],
    dataPaymentsList: [],
    contentTab: "payment-list"
  }),
  created() {
    this.token = localStorage.getItem("token");
    this.role = JSON.parse(localStorage.getItem("user"))?.role;
    if (this.role == "") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push({ path: "/login" });
    } 
    this.getPayments()
  },
  computed: {},
  watch: {},
  methods: {
    changeContentTabs(str) {
      this.contentTab = str;
    },
    async getPayments(){
      this.checkViewMore = false
      const query = { limit: this.limit, page: this.page, trash: false }
      const result = await getPayments(query)
      if(result.statusCode === 200) {
        this.dataPaymentsList = _.concat(this.dataPaymentsList, ...result.data)
        if(result?.data.length < this.limit) this.checkViewMore = true
      }
      this.loading = true
    },
    morePayments(){
      this.page ++
      this.getPayments()
    },
    paymentStatus(status) {
      switch (status) {
        case "completed":
          return "paid";
        case "pending":
          return "request";
        case "failed":
          return "cancel";
        default:
          return "new";
      }
    },
  }
};
</script>
<style lang="scss" scoped>
::v-deep {
  .list-payment-tabs.list-payment-tabs.list-payment-tabs{
    .icon-bar.active{
      width: 100% !important;
    }
  }
  .icon-action {
    cursor: pointer;
    &:hover {
      background-color: whitesmoke;
    }
  }
  .header-bar {
    display: flex;
    font-size: 18px;
    justify-content: space-between;
    align-items: center;
    p {
      margin-bottom: 0;
      color: #5d6e85;
      font-weight: 700;
    }
  }
  input:focus {
    outline: 0;
  }
  .search-bar {
    padding: 4px 5px;
    align-items: center;
    align-content: flex-start;
    border: 1px solid #06b7b4;
  }
  .icon-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    p {
      margin-bottom: 0;
      font-size: 18px;
    }
    .check-all {
      .v-input__slot {
        margin: unset;
        .v-input--selection-controls__input {
          margin: unset;
        }
      }
      .v-messages {
        display: none;
      }
    }
  }
  .title-table {
    display: flex;
    justify-content: space-between;
    background: #eafafa;
    padding: 20px;
    .icon-bar {
      align-items: center;
    }
    .check-trash {
      cursor: pointer;
    }
  }
  .title-name {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
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
  }
  .rounded-full {
    border-radius: 9999px;
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
  .custom-selected {
    margin: 0;
    min-height: 39px;
  }
  .v-menu__content {
    overflow: hidden;
  }
  .v-text-field {
    position: relative;
    .v-input__control {
      @extend .custom-selected;
      .v-input__slot {
        @extend .custom-selected;
      }
      .v-text-field__details {
        position: absolute;
        bottom: -25px;
      }
      .v-select__slot {
        .v-input__append-inner {
          display: none;
        }
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .name-title {
    p {
      font-size: 10px;
    }
    &:nth-child(5) {
      display: none;
    }
    &:last-child {
      display: none;
    }
  }
  .col {
    padding: 0 5px;
    font-size: 10px;
    .v-input--checkbox {
      margin: 0 !important;
    }
  }
  .v-icon.v-icon {
    padding: 0 20px !important;
  }
  .icon-bar {
    margin: 10px 0;
    justify-content: center;
    p {
      font-size: 13px;
    }
  }
  .border-item {
    padding: 2px 5px;
  }
  .header-bar {
    justify-content: center;
    .search-bar {
      padding: 8px 130px 8px 8px;
    }
  }
  .rounded-full {
    font-size: 12px;
  }
}
</style>
