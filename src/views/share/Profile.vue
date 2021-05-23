<template>
  <div class="main-cutoms profile-page">
    <h4 class="title-profile">Profile</h4>
    <!-- <ProfileComponent :info="infoUser" @update:avatar="getInfoUser" /> -->
    <!-- <div class="header-tabs-profile">
      <ul>
        <li
          @click="changeContentTabs('sender')"
          v-bind:class="{ active: contentTab === 'sender' }"
        >
          <v-img
            :src="require('../../assets/images/common/ico-receive.svg')"
            width="20"
            class="mr-2"
          />
          <p class="count">{{ placeList.length }}</p>
          <p>Senders</p>
        </li>
        <li
          @click="changeContentTabs('receiver')"
          v-bind:class="{ active: contentTab === 'receiver' }"
        >
          <v-img
            :src="require('../../assets/images/common/2-user.svg')"
            width="20"
            class="mr-2"
          />
          <p class="count">{{ placeList.length }}</p>
          <p>Receivers</p>
        </li>
      </ul>
    </div> -->
    <!-- <div class="list-order list">
      <div class="top-action-table">
        <div class="search-bar header-bar">
          <v-img
            :src="
              require('../../assets/images/common/customer/icon_search.svg')
            "
            width="20"
            class="mr-2"
          />
          <input type="text" placeholder="Search Order" />
        </div>
        <div class="btn-right">
          <Button label="Add" color="btn-primary" @submit:btnSubmit="openAdd()" />
          <Button label="Make Default" color="btn-grey" />
          <v-img
            :src="require('../../assets/images/common/customer/Delete.svg')"
            width="20"
          />
        </div>
      </div>
      <div class="orders-list">
        <v-row class="title-header">
          <v-col
            v-for="(name, index) in headerTable"
            :key="name"
            class="name-title"
            v-bind:class="{ 'justify-content-between': index === 0 }"
          >
            <v-checkbox
              color="primary"
              class="check-all ma-0 pa-0"
              v-if="index === 0"
            ></v-checkbox>
            <p>
              {{ name }}
            </p>
          </v-col>
        </v-row>

        <div v-if="placeList.length > 0" class="pb-5">
          <v-row
            class="border-item"
            v-for="(data, index) of placeList"
            :key="index"
            style="padding: 0 15px !important"
          >
            <v-col class="d-flex align-center justify-content-between td-item">
              <v-checkbox class="mr-5"></v-checkbox>
              <p class="text-td">
                {{ data.fullName }}
              </p>
            </v-col>
            <v-col> {{ data.email }} </v-col>
            <v-col> {{ data.phone }} </v-col>
            <v-col> {{ data.address }} </v-col>
            <v-col>
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 4L8.66667 9.33333M5.75 12.25L2 8.5"
                  stroke="#06b7b4"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </v-col>
            <v-col class="action pa-1">
              <div class="action-table">
                <v-icon class="show-icon action-dots"
                  >mdi-dots-horizontal</v-icon
                >
                <div class="align-center justify-center action-active"> -->
                  <!-- <router-link
                  :to="`/${
                    role != 'Customer' ? 'admin' : 'customer'
                  }/order-detail/${data.id}`"
                  custom
                > -->
                  <!-- <div class="icon-action pa-2 rounded-circle">
                    <v-img
                      :src="
                        require('../../assets/images/common/customer/icon_edit.svg')
                      "
                      width="15"
                    />
                  </div> -->
                  <!-- </router-link> -->
                  <!-- <div
                    class="icon-action rounded-circle ml-3"
                    @click="openDialogRemove()"
                  >
                    <v-img
                      :src="
                        require('../../assets/images/common/customer/Delete.svg')
                      "
                      width="20"
                    />
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="font-weight-black px-3 text-total-list">
          {{ placeList.length }} Address
        </div>
        <div class="text-center pb-5">
          <Button label="View More" color="btn-primary" width="200" />
        </div> -->
        <!-- <div v-else class="text-center pb-5"><h3>No more order to show</h3></div>
      </div> -->
      <!-- </div> -->
      <v-row>
      <v-col class="col-12">
        <v-expansion-panels class="border-blue box-shadow-none panels" 
        v-model="panel" 
        multiple
        >
      <!-- Profile -->
      <v-expansion-panel class="mt-0 panel" @click="isChangePanel">
            <v-expansion-panel-header
              expand-icon="$arrow_down"
              class="header-pannel v-item--active"
            >
              Profile
            </v-expansion-panel-header>
            <v-expansion-panel-content class="content-panel">
              <ProfileComponent :info="infoUser" @update:avatar="getInfoUser"/>
            </v-expansion-panel-content>
          </v-expansion-panel>

      <!-- Save Place -->
      <v-expansion-panel class="mt-0 panel" @click="isChangePanel">
            <v-expansion-panel-header
              expand-icon="$arrow_down"
              class="header-pannel"
            >
              Save places
            </v-expansion-panel-header>
            <v-expansion-panel-content class="content-panel">
              <SavePlaceComponent />
            </v-expansion-panel-content>
          </v-expansion-panel>
      <!-- Password -->
      <v-expansion-panel class="mt-0 panel" @click="isChangePanel">
            <v-expansion-panel-header
              expand-icon="$arrow_down"
              class="header-pannel"
            >
              Password
            </v-expansion-panel-header>
            <v-expansion-panel-content class="content-panel">
              <PasswordComponent />
            </v-expansion-panel-content>
          </v-expansion-panel> 
       </v-expansion-panels>
      </v-col>
    </v-row>
      <DialogRemove :dialog="dialogRemove" @dialog:close="closeDialog" />
      <AddAddress :dialog="isAdd" @dialog:close="closeAdd" />
    <!-- </div> -->
  </div>
</template>

<script>
import ProfileComponent from "@component/customer/ProfileComponent";
import DialogRemove from "@component/shares/DialogRemove";
// import Button from "@component/shares/Button";
import AddAddress from "@component/custom/ModalAddAddress";
import SavePlaceComponent from "@component/customer/SavePlaceComponent";
import PasswordComponent from "@component/customer/PasswordComponent";

export default {
  name: "Profile",
  components: {
    ProfileComponent,
    DialogRemove,
    // Button,
    AddAddress,
    SavePlaceComponent,
    PasswordComponent,
  },
  data: () => ({
    dialogRemove: false,
    isAdd: false,
    panel: [0],
    infoUser: {
      address: [],
      avatar: "",
      email: "",
      fullName: "",
      phone: "",
      _id: ""
    },
    headerTable: [
      "Fullname",
      "Email",
      "Phone",
      "Address",
      "Default",
      "Actions"
    ],
    placeList: [
      {
        id: 1,
        fullName: "Quisque Felis",
        email: "abc@mail.com",
        phone: "(123) 456 7890",
        address: "Interdum, Cursus, CU, 23933",
        default: "",
        actions: ""
      },
      {
        id: 2,
        fullName: "Tortor Aliquam",
        email: "abc@mail.com",
        phone: "abc@mail.com",
        address: "Interdum, Cursus, CU, 23933",
        default: "",
        actions: ""
      }
    ],

    contentTab: "sender",
  }),
  created() {
    this.getInfoUser();
    this.token = localStorage.getItem("token");
    this.role = JSON.parse(localStorage.getItem("user"))?.role;
    if (this.role == "") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push({ path: "/login" });
    }
  },
  methods: {
    isChangePanel() {
      this.panel = [];
    },
    getInfoUser() {
      const info = localStorage.getItem("user");
      this.infoUser = JSON.parse(info);
    },
    openDialogRemove() {
      this.dialogRemove = true;
    },
    closeDialog() {
      this.dialogRemove = false;
    },
    changeContentTabs(str) {
      if(this.contentTab !== str) {
        this.contentTab = str;
      }
    },
    openAdd() {
      this.isAdd = true;
    },
    closeAdd() {
      this.isAdd = false;
    },
  }
};
</script>
<style lang="scss" scoped>
.top-action-table {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(0 0 0 / 6%);
  padding: 15px;
  .btn-right {
    .v-btn {
      height: 40px !important;
      text-transform: inherit !important;
      display: inline-block;
      width: 130px;
      margin-right: 20px;
      &.btn-primary {
        width: 100px !important;
      }
    }
    .v-image {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .search-bar {
    display: block !important;
    align-items: center;
    align-content: flex-start;
    font-size: 15px;
    font-weight: 500;
    color: #5d6e85 !important;
    position: relative;
    input {
      border: 1px solid #06b7b4;
      padding: 6px 20px 6px 40px;
    }
    .v-image {
      width: 20px !important;
      position: absolute;
      top: 8px;
      left: 10px;
    }
  }
}
.orders-list {
  .td-item {
    padding: 8px 2px;
  }
  .max-w180 {
    max-width: 180px !important;
  }
  .max-w100 {
    max-width: 100px !important;
  }
  .m-w300 {
    min-width: 300px !important;
  }
  .text-td {
    align-self: center;
    font-size: 14px;
    margin-bottom: 0;
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
  .title-header {
    border-radius: 4px;
    margin: 0 15px;
    text-align: center;
    font-size: 14px;
    text-align: left;
    align-items: center;
  }
  .border-item {
    border-top: 1px solid rgb(0 0 0 / 6%);
    margin: 0 !important;
    text-align: center;
    font-size: 13px;
    align-items: center;
    color: #5d6e85;
    letter-spacing: 0.1px;
    line-height: 16px;
    &:last-child {
      border-bottom: 1px solid rgb(0 0 0 / 6%);
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
.profile-page {
  .list {
    background: #fff !important;
  }
  .header-tabs-profile {
    margin-top: 20px;
    ul {
      display: flex;
      background: #eafafa;
      padding-left: 0 !important;
      li {
        position: relative;
        padding: 10px 20px;
        cursor: pointer;
        list-style: none;
        align-self: center;
        padding-right: 40px;
        border-bottom: 10px solid;
        border-image-slice: 1;
        border-width: 5px;
        border-image-source: linear-gradient(
          103.01deg,
          transparent 0%,
          transparent 100%
        );
        &.active {
          border-image-source: linear-gradient(
            103.01deg,
            #06b7b4 0%,
            #00a4e4 100%
          ) !important;
        }
        &:hover {
          border-image-source: linear-gradient(
            103.01deg,
            #06b7b4 0%,
            #00a4e4 100%
          );
        }
        p.count {
          position: absolute;
          top: 5px;
          left: 30px;
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
          font-weight: normal !important;
          margin-left: 0 !important;
        }
        .v-image {
          display: inline-block;
          vertical-align: sub;
          position: relative;
        }
        p {
          display: inline-block;
          margin-bottom: 0;
          font-weight: 700;
          font-size: 18px;
          line-height: 24px;
          letter-spacing: 0.2px;
          color: #1b2534;
          margin-left: 10px;
        }
      }
    }
  }
  .title-profile {
    color: #5d6e85;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 20px;
  }
}
</style>
