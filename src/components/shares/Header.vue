<template>
  <!-- <div class="main-header px-4"> -->
  <v-app-bar class="white header-container" flat>
    <v-row class="d-flex" no-gutters>
      <v-col cols="2">
        <v-app-bar-nav-icon @click="$emit('toggleSidebar')">
        </v-app-bar-nav-icon>
      </v-col>
      <v-col cols="4">
        <div class="block-search">
          <img :src="icon_search" class="ico-search" />
          <v-text-field
            hide-details="auto"
            outlined
            dense
            chips
            small-chips
            type="text"
            placeholder="Search..."
            class="input-search"
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="1"> </v-col>
      <v-col cols="5">
        <div class="right-header">
          <div class="button">
            <router-link
              :to="
                `/${
                  user.role !== 'Customer' ? 'admin' : 'customer'
                }/create-label`
              "
            >
              <v-btn x-small class="btn-primary" height="40"
                >CREATE LABEL</v-btn
              >
            </router-link>
          </div>
          <div v-if="user">
            <router-link 
              class="profile" 
              :to="`/${user.role === 'Customer' ? 'customer': 'admin'}/profile`">
              <img
                width="40px"
                height="40px"
                class="rounded-circle"
                :src="this.user.avatar != '' ? this.user.avatar : avatar"
              />
              <span>{{ this.user.fullName }}</span>
            </router-link>
          </div>
          <div v-else>
            <v-progress-circular
              indeterminate
              :size="20"
              :width="3"
              color="primary"
            ></v-progress-circular>
          </div>
          <div class="notification">
            <v-menu offset-y :close-on-content-click="true">
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <img
                    :src="
                      require('../../assets/images/common/customer/icon_notification.png')
                    "
                  />
                  <p class="count">{{countNotify}}</p>
                </div>
              </template>
              <div v-if="loadingNotify" class="py-8 text-center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
              <v-list class="dropdown-notification" v-else>
                <div v-if="listNotifications.length > 0">
                  <v-list-item
                    v-for="(item, index) in listNotifications"
                    :key="index"
                    class="item-notification px-7 py-3"
                  >
                    <v-list-item-title @click="goToOrderDetail(item.orderCode, item._id)">
                      <div class="top-item">
                        <h4><span></span>{{item.message}}</h4>
                        <span>{{formatDate(item.createdAt)}}</span>
                      </div>
                      <p>
                        {{item.commentId && item.commentId.message}}
                      </p>
                    </v-list-item-title>
                  </v-list-item>
                </div>
                <div v-else class="text-center font-bold pt-5">
                  No more Notification to show
                </div>
                <!-- <div class="text-center py-2 mT20" v-if="!viewmoreNotifi">
                  <Button 
                    label="Load more" 
                    color="btn-primary" 
                    width="200"
                    :disabled="submitLoadMore"
                    @submit:btnSubmit ="loadMoreNotification"
                  />
                </div>
                <div 
                  class="mt-8 text-capitalize text-center font-bold"
                  v-else>
                  No more notifications
                  </div> -->
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-app-bar>
  <!-- </div> -->
</template>

<script>
import { notifications, notifyNotSeen, notifySeen } from '@store/notification'
// import _ from "lodash";
import * as moment from "moment";

// import Button from "@component/shares/Button";

const avatar = require("../../assets/images/common/customer/avatar.png");
const icon_search = require("../../assets/images/common/customer/icon_search.svg");

export default {
  name: "Header",
  components: {
    // Button
  },
  props: {
    infoUser: {
      typeof: Object,
      default: null
    },
    drawer: Boolean
  },
  computed: {
    user(){
      return this.$props.infoUser
    }
  },
  data: () => ({
    avatar,
    icon_search,
    limitNotifi: 10,
    size: 1,
    countNotify: 0,
    loadingNotify: false,
    isNotification: false,
    viewmoreNotifi: false,
    submitLoadMore: false,
    listNotifications: []
  }),
  created(){
    this.getNotifications()
    this.countNotifyNotSeen()
  },
  methods: {
    toggleNotification() {
      this.isNotification = !this.isNotification;
    },
    async getNotifications(){
      const quey = {
        limit: this.limitNotifi,
        page: this.size
      }
      const result = await notifications(quey)
      if(result.statusCode === 200){
        // this.listNotifications = _.concat(this.listNotifications, result.data)
        // if(result.data.length < this.limitNotifi) this.viewmoreNotifi = true
        this.listNotifications = result.data
      }
      this.loadingNotify = false
      this.submitLoadMore = false
    },
    async countNotifyNotSeen(){
      const result = await notifyNotSeen()
      this.countNotify = result?.data || 0
    },
    loadMoreNotification(){
      this.submitLoadMore = true
      this.size ++
      this.getNotifications()
    },
    formatDate(date){
      return moment(date).format("hh:mm A, MM Do YYYY")
    },
    async goToOrderDetail(orderCode, id){
      const result = await notifySeen(id)
      if(result.statusCode === 200){
        this.getNotifications()
        this.countNotifyNotSeen()
        const url = `/${this.user.role === 'Customer' ? 'customer': 'admin'}/order-detail/${orderCode}`
        this.$router.push({ path: url });
      }
    }
  }
};
</script>
<style lang="scss">
// .main-header {
//   border-bottom: 1px solid #eafafa;
//   padding: 18px 0 17px;
// }
.bg-colorNoti{
   background-color: #f7fdfd;
}
.header-container {
  height: 80px !important;
  padding: 20px 40px 20px 20px;
  .v-toolbar__content {
    padding: 0;
    height: auto !important;
  }
}
.dropdown-notification {
  .item-notification {
    .item-notification:first-child{
      padding: 12px !important;
    }
  }
  .item-notification{
    cursor: pointer;
    &:hover{
     @extend .bg-colorNoti
    }
  }
}
.right-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .button {
    margin-right: 30px;
    .v-btn {
      padding: 0 30px !important;
      span {
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        letter-spacing: 0.2px;
        font-weight: bold;
      }
    }
  }
  .profile {
    display: flex;
    align-items: center;
    margin-right: 30px;
    img {
      margin-right: 10px;
    }
    span {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.2px;
      color: #5d6e85;
    }
  }
  .notification {
    position: relative;
    cursor: pointer;
    
    .count {
      position: absolute;
      top: -8px;
      right: -8px;
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
.block-search {
  position: relative;
  input {
    padding-left: 25px !important;
  }
  .input-search {
    .v-input__slot {
      font-size: 12px !important;
      line-height: 16px;
      letter-spacing: 0.2px;
      color: #8692a4 !important;
    }
  }
  .ico-search {
    position: absolute;
    top: 8px;
    left: 10px;
  }
}

@media only screen and (max-width: 600px) {
  .right-header {
    margin-right: 10px;
    .profile {
      display: none;
    }
    .button {
      margin-right: 5px;
    }
    .v-btn__content {
      font-size: 10px;
    }
  }
}
</style>
