<template>
  <div class="orders-list user-page">
    <v-row class="m-0 text-center title-header">
      <v-col
        v-for="(name, index) in headerTable"
        :key="index"
        class="name-title"
        v-bind:class="{ 'justify-content-between': index === 0 }"
      >
        <v-checkbox
          color="primary"
          class="check-all ma-0 pa-0"
          v-model="chooseAllUsers"
          v-if="index === 0 && isShowAll"
        ></v-checkbox>
        <p v-bind:class="{ mR20: index === 0 }">
          {{ name }}
        </p>
      </v-col>
    </v-row>
    <div class="pb-5" v-if="usersList.length > 0">
      <v-row
        class="border-item text-center"
        v-for="(item, index) in usersList"
        :key="index"
        style="padding: 0 15px !important"
      >
        <v-col class="d-flex align-center justify-content-between td-item">
          <v-checkbox
            class="mr-5"
            v-model="item.checked"
            v-if="!isOverview"
          ></v-checkbox>
          <p class="text-td">{{ formatDate(item.createdAt) }}</p>
        </v-col>
        <v-col class="mL20 td-item" v-bind:class="{ mL0: isOverview }">
          {{ item.fullName }}
        </v-col>
        <v-col class="td-item"> {{item.email}} </v-col>
        <v-col class="td-item"> {{ item.phone }} </v-col>
        <v-col class="td-item">
          <div
            v-if="!isOverview"
            :class="{
              'action-table': item.status !== 'completed',
              'opac-1': item.status === 'completed',
            }"
          >
            <v-icon class="action-dots no-padding">mdi-dots-horizontal</v-icon>
            <div class="align-center justify-center action-active">
              <router-link :to="`/users/detail/${item._id}`" custom>
                <div class="icon-action rounded-circle">
                  <v-img
                    :src="
                      require('../../assets/images/common/customer/icon_edit.svg')
                    "
                    width="15"
                  />
                </div>
              </router-link>
              <div
                v-if="!isTrash"
                class="icon-action rounded-circle ml-3"
                @click="removeUser(index, false)"
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
                class="icon-action rounded-circle ml-3"
                @click="removeUser(index, true)"
              >
                <v-img :src="restore" width="18" />
              </div>
            </div>
          </div>
          <div v-else class="d-flex justify-center">
            <router-link
                :to="`/users/detail/${item._id}`"
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
    <div class="font-weight-black text-total-list px-3" v-if="!isOverview">
      {{ usersList.length }} Users
    </div>
    <div class="text-center pb-5" v-if="checkViewMore">
      <Button
        label="View More"
        color="btn-primary"
        width="200"
        :disabled="viewMore"
        @submit:btnSubmit="$emit('submit:usersMore')"
      />
    </div>
    <div v-else class="text-center pb-5"><h3>No more user to show</h3></div>
  </div>
</template>

<script>
import * as moment from "moment";

import Button from "@component/shares/Button";

const restore = require("../../assets/images/order-detail/restore.png");

export default {
  name: "UserTable",
  components: { Button },
  props: {
    isShowAll: {
      type: Boolean,
      default: false
    },
    users: {
      type: Array
    },
    isOverview: {
      type: Boolean,
      default: false
    },
    trash: {
      type: Boolean,
      default: false
    },
    showViewMore: {
      type: Boolean,
      default: true
    },
    hidenChooseAll: {
      type: Boolean,
      default: false
    },
    isRole: {
      type: String,
      require: true
    }
  },
  computed: {
    usersList() {
      return this.$props.users || [];
    },
    checkViewMore() {
      return this.$props.showViewMore;
    },
    isTrash() {
      return this.$props.trash;
    },
    role(){
      return this.$props.isRole;
    }
  },
  data: () => ({
    restore,
    chooseAllUsers: false,
    viewMore: false,
    headerTable: [
      "Created Date",
      "User Name",
      "Email",
      "Phone Number",
      "Action"
    ]
  }),
  watch:{
    chooseAllUsers(val){
      this.$emit('update:chooseAll', val)
    },
    hidenChooseAll() {
      this.chooseAllOrders = false;
    }
  },
  methods: {
    removeUser(index, checkRestore) {
      this.$emit("trash:Remove", index, checkRestore);
    },
    formatDate(val) {
      return moment(val).format("MMMM Do YYYY");
    }
  }
};
</script>
<style lang="scss" scoped>
.orders-list {
  .td-item {
    padding: 8px 0 !important;
  }
  .m-w330 {
    min-width: 330px !important;
  }
  .text-td {
    align-self: center;
    font-size: 14px;
    margin-bottom: 0;
    margin-right: 15px;
  }
  .name-title {
    display: flex;
    justify-content: center;
    align-items: center;
    .check-all {
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
}
</style>
