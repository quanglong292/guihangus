<template>
  <div :class="['main-cutoms pa-0 pa-md-8', orderStyles]">
    <div v-if="!loading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <div>
        <div class="d-sm-flex justify-space-between">
          <div class="icon-bar">
            <div
              class="ml-4 cursor-pointer"
              v-if="isTrash"
              @click="removeUsers(true)"
            >
              <v-img :src="restore" width="20" class="mr-2" />
            </div>
            <div v-else class="ml-2 cursor-pointer" @click="removeUsers(false)">
              <v-img
                :src="require('../../assets/images/common/customer/Delete.svg')"
                width="23"
                class="mr-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="title-table pa-1 pa-md-4 list-order-tabs">
          <div
            class="icon-bar tab-left"
            @click="changeContentTabs('order-list', false)"
            v-bind:class="{ active: contentTab === 'order-list' }"
          >
            <div class="total-list">
              <v-img
                :src="
                  require('../../assets/images/common/customer/icon_box.svg')
                "
                width="20"
                class="mr-2"
              />
              <p class="count">{{ totalList }}</p>
            </div>
            <p class="mb-0" style="font-weight: 700">
              <span>Users list </span>
            </p>
          </div>
          <div
            class="d-flex icon-bar tab-right"
            @click="changeContentTabs('trash', true)"
            v-bind:class="{ active: contentTab === 'trash' }"
          >
            <button
              :disabled="checkTrash"
              class="check-trash"
              style="outline: none"
              :class="{
                'text-primary': isTrash,
              }"
            >
              <v-img
                :src="require('../../assets/images/common/customer/Delete.svg')"
                width="25"
                class="mr-2"
              />
              <p class="count">{{ totalTrash }}</p>
              <p>Trash</p>
            </button>
          </div>
        </div>
        <div v-if="checkTrash" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div class="list-order list" v-else>
          <div v-if="users.length > 0">
            <UserTable
              isShowAll
              :isRole="role"
              :trash="isTrash"
              :view="isViewMore"
              :showViewMore="showViewMore"
              :users="dataUsersList"
              @update:chooseAll="chooseAllUsers"
              @trash:Remove="userRemove"
              @submit:usersMore="usersMore"
            />
          </div>
          <div v-else class="text-center py-3">
            <h2>{{ isTrash ? "No user in Trash" : "Users empty" }}</h2>
          </div>
        </div>
      </div>
    </div>
    <DialogRemove
      :dialog="dialogRemove"
      :items="listContentTrash"
      :isRestore="isRestore"
      :disabledBtn="checkBtnRemove"
      @remove:Accept="acceptRemove"
      @dialog:close="closeDialog"
    />
  </div>
</template>

<script>
import { getUsers, deActiveUsers, countUserIsTrash } from "@store/user";

import _ from "lodash";

import UserTable from "@component/list/Users";
import DialogRemove from "@component/shares/DialogRemove";

const iconDropdown = require("../../assets/images/order-detail/arrow_drop.svg");
const restore = require("../../assets/images/order-detail/restore.png");

export default {
  name: "Users",
  components: { UserTable, DialogRemove },
  props: {
    orderStyles: {
      type: String
    }
  },
  data: () => ({
    iconDropdown,
    restore,
    disabledBtn: false,
    loading: false,
    isTrash: false,
    isRestore: false,
    dialogRemove: false,
    showViewMore: true,
    checkTrash: false,
    isViewMore: false,
    checkBtnRemove: false,
    limit: 30,
    page: 1,
    totalTrash: 0,
    totalList: 0,
    indexRemove: -1,
    users: [],
    dataTrash: [],
    listContentTrash: [],
    contentTab: "order-list"
  }),
  created() {
    this.token = localStorage.getItem("token");
    this.role = JSON.parse(localStorage.getItem("user"))?.role;
    if (this.role == "") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push({ path: "/login" });
    }
    this.getUsers()
  },
  computed: {
    dataUsersList() {
      return this.users;
    }
  },
  methods: {
    async getUsers() {
      this.showViewMore = true
      const query = { limit: this.limit, page: this.page, trash: this.isTrash }
      const result = await getUsers(query)
      if (result.statusCode === 200) {
        const data = result.data?.map(item =>{
          item.checked = false
          return item
        })
        this.users = _.concat(this.users, ...data)
        if(result?.data.length < this.limit) this.showViewMore = false
      }
      this.isViewMore = false;
      this.loading = true;
      this.checkTrash = false;
      this.countTrash();
    },
    changeContentTabs(str, bol) {
      if (!this.checkTrash && this.contentTab !== str) {
        this.checkTrash = true;
        this.contentTab = str;
        this.chooseTrash(bol);
      }
    },
    chooseTrash(val){
      this.users = []
      this.page = 1
      this.isTrash = val
      this.getUsers()
    },
    chooseAllUsers(val) {
      this.users = this.users.map(item => {
        item.checked = val;
        return item;
      });
    },
    removeUsers(checkRestore) {
      this.isRestore = checkRestore;
      this.dataTrash = [];
      this.listContentTrash = [];
      this.users.map(item => {
        if (item.checked) {
          this.dataTrash.push(item._id);
          this.listContentTrash.push(item.fullName);
        }
      });
      if (this.dataTrash.length > 0) this.dialogRemove = true;
    },
    async acceptRemove() {
      this.checkBtnRemove = true;
      const result = await deActiveUsers({ ids: this.dataTrash });
      if (result?.statusCode === 200) {
        if (this.indexRemove != -1) {
          this.users.splice(this.indexRemove, 1);
        } else {
          this.users = this.users.filter(item => {
            return !item.checked;
          });
        }
        this.dataTrash = [];
        this.listContentTrash = [];
        this.dialogRemove = false;
      }
      this.checkBtnRemove = false;
      this.indexRemove = -1;
      this.hidenChooseAll = !this.hidenChooseAll;
      this.countTrash();
    },
    userRemove(index, checkRestore) {
      this.dataTrash = [];
      this.listContentTrash = [];
      this.isRestore = checkRestore;
      this.indexRemove = index;
      this.dataTrash.push(this.users[index]._id);
      this.listContentTrash.push(this.users[index].fullName);
      this.dialogRemove = true;
    },
    async countTrash() {
      const result = await countUserIsTrash();
      if (result.statusCode === 200){
        this.totalList = result?.data.active
        this.totalTrash = result?.data.inactive
      } 
    },
    closeDialog() {
      this.dataTrash = [];
      this.listContentTrash = []
      this.dialogRemove = false
    },
    usersMore(){
      this.page ++
      this.getUsers()
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
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
  .v-btn {
    text-transform: initial !important;
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
    .check-trash.check-trash {
      cursor: pointer;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      font-size: 18px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #1b2534;
      position: relative;
      p.count {
        position: absolute;
        top: -6px;
        right: 50px;
        border-radius: 50%;
        background: #06b7b4;
        font-size: 8px;
        color: #fff;
        width: 15px;
        height: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 11px;
      }
    }
  }
  .list {
    background: #fff;
    .name-title {
      padding: 15px 0 !important;
      p {
        margin-bottom: 0;
      }
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
  .name-title {
    font-weight: 500;
    text-align: center;
    font-size: 16px !important;
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
  .status-font {
    font-size: 12px;
  }
}
</style>
