<template>
  <div :class="['main-cutoms pa-0 pa-md-8',orderStyles]">
    <div v-if="!loading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <div>
        <div class="d-sm-flex justify-space-between">
          <div class="icon-bar">
            <!-- <v-checkbox
              color="primary"
              class="check-all ma-0 pa-0"
              v-model="chooseAllOrders"
            ></v-checkbox> -->
            <div
              class="ml-4 cursor-pointer"
              v-if="isTrash"
              @click="removeOrders(true)"
            >
              <v-img :src="restore" width="20" class="mr-2" />
            </div>
            <div
              v-else
              class="ml-2 cursor-pointer"
              @click="removeOrders(false)"
            >
              <v-img
                :src="require('../../assets/images/common/customer/Delete.svg')"
                width="23"
                class="mr-2"
              />
            </div>
          </div>
          <div class="header-bar" v-if="!idUser">
            <div class="text-center mr-2">
              <v-menu
                offset-y
                :close-on-content-click="disabledBtn"
                min-width="300"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="text-capitalize text-blue-dark"
                    color="primary"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  >
                    From
                    <span class="ml-2">
                      <v-img :src="iconDropdown" />
                    </span>
                  </v-btn>
                </template>
                <v-card class="mx-auto overflow-hidden" max-width="500">
                  <v-card-text>
                    <div>
                      <div class="input-field">
                        <div>
                          <div>
                            <label>ZipCode</label>
                            <v-text-field
                              v-model="dataFilter.fromCode"
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                          <div>
                            <label>State</label>
                            <v-autocomplete
                              v-model="filterState"
                              return-object
                              :items="statesFilter"
                              outlined
                              dense
                              item-text="name"
                            ></v-autocomplete>
                          </div>
                          <div>
                            <label>City</label>
                            <v-autocomplete
                              v-model="dataFilter.city"
                              :items="citiesFilter"
                              outlined
                              dense
                              item-text="name"
                              :disabled="filterState == null"
                            ></v-autocomplete>
                          </div>
                          <div class="text-right">
                            <Button
                              label="submit"
                              color="mt-2 primary"
                              :disabled="disabledBtn || checkDisabledFrom"
                              :progress="disabledBtn"
                              depressed
                              @submit:btnSubmit="filterOrder"
                            />
                            <Button
                              label="clear"
                              color="mt-2 ml-2 primary--text"
                              depressed
                              @submit:btnSubmit="
                                () => {
                                  this.dataFilter.fromCode = null;
                                  this.clearFrom();
                                }
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-menu>
            </div>
            <div class="text-center mr-2">
              <v-menu
                offset-y
                :close-on-content-click="disabledBtn"
                max-width="300"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="text-capitalize text-blue-dark"
                    color="primary"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  >
                    To
                    <span class="ml-2">
                      <v-img :src="iconDropdown" />
                    </span>
                  </v-btn>
                </template>
                <v-card class="mx-auto overflow-hidden" max-width="500">
                  <v-card-text>
                    <div>
                      <div class="input-field">
                        <div>
                          <label>City</label>
                          <v-select
                            v-model="province"
                            return-object
                            :items="listProvinces"
                            outlined
                            item-text="name"
                          ></v-select>
                        </div>
                      </div>
                      <div class="input-field mt-2">
                        <div>
                          <label>District</label>
                          <v-select
                            v-model="district"
                            return-object
                            :items="listDistricts"
                            outlined
                            item-text="name"
                            :disabled="province == null"
                          ></v-select>
                        </div>
                      </div>
                      <div class="input-field mt-2">
                        <div>
                          <label>Ward</label>
                          <v-select
                            v-model="ward"
                            :items="listWards"
                            outlined
                            item-text="name"
                            :disabled="district == null"
                          ></v-select>
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <Button
                        label="submit"
                        color="mt-2 primary"
                        :disabled="disabledBtn || !dataFilter.province"
                        :progress="!!dataFilter.province"
                        depressed
                        @submit:btnSubmit="filterOrder"
                      />
                      <Button
                        label="clear"
                        color="mt-2 ml-2 primary--text"
                        depressed
                        @submit:btnSubmit="clearTo"
                      />
                    </div>
                  </v-card-text>
                </v-card>
              </v-menu>
            </div>
            <div class="text-center mr-2">
              <v-menu offset-y :close-on-content-click="disabledBtn">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="text-capitalize text-blue-dark"
                    color="primary"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  >
                    Payment status
                    <span class="ml-2">
                      <v-img :src="iconDropdown" />
                    </span>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item-group
                    v-model="selectedOrderFilter"
                    color="primary"
                  >
                    <v-list-item
                      v-for="(status, index) in orderStatusFilter"
                      :key="index"
                      @click="chooseStatus(index)"
                    >
                      <v-list-item-title>{{ status.item }}</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </div>
            <div class="text-center mr-2">
              <v-menu offset-y :close-on-content-click="disabledBtn">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="text-capitalize text-blue-dark"
                    color="primary"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  >
                    Date range
                    <span class="ml-2">
                      <v-img :src="iconDropdown" />
                    </span>
                  </v-btn>
                </template>
                <v-card class="mx-auto overflow-hidden" max-width="500">
                  <v-card-text>
                    <div>
                      <v-text-field
                        v-model="dateRangeText"
                        label="Date range"
                        prepend-icon="mdi-calendar"
                        readonly
                      ></v-text-field>
                    </div>
                    <v-date-picker
                      class="mt-2"
                      v-model="dates"
                      range
                    ></v-date-picker>
                  </v-card-text>
                  <div class="text-right pa-2">
                    <Button
                      label="submit"
                      color="primary"
                      :disabled="disabledBtn || dates.length != 2"
                      :progress="dates.length == 2"
                      depressed
                      @submit:btnSubmit="filterOrder"
                    />
                    <Button
                      label="clear"
                      color="ml-2 primary--text"
                      depressed
                      @submit:btnSubmit="clearDate"
                    />
                  </div>
                </v-card>
              </v-menu>
            </div>
            <v-btn
              class="mr-2 text-blue-dark"
              outlined
              color="primary"
              @click="clearFilter"
            >
              Clear All
            </v-btn>
            <div class="search-bar header-bar">
              <v-img
                :src="
                  require('../../assets/images/common/customer/icon_search.svg')
                "
                width="20"
                class="mr-2"
              />
              <input
                type="text"
                placeholder="Search Order"
                v-model="searchOrder"
                v-on:keyup.enter="filterOrder"
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
              <span>Orders list </span>
              <span v-if="filterText != ''">by {{ filterText }}</span>
            </p>
          </div>
          <div
            class="d-flex icon-bar tab-right"
            @click="changeContentTabs('trash', true)"
            v-bind:class="{ active: contentTab === 'trash' }"
          >
            <!-- <div v-if="isTrash" class="mr-2">
              <Button 
                class="bg-color"
                label="Your orders"
                color="ml-2 primary"
                depressed
                @submit:btnSubmit ="chooseTrash"
              />
            </div> -->
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
        <div v-if="checkTrash || isFilter" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div class="list-order list" v-else>
          <div v-if="ordersList.length > 0">
            <Orders
              isShowAll
              :isRole="role"
              :trash="isTrash"
              :listOrders="dataOrdersList"
              :view="isViewMore"
              :showViewMore="showViewMore"
              :hidenChooseAll="hidenChooseAll"
              @trash:Remove="orderRemove"
              @submit:viewMore="viewMore"
              @update:chooseAll="chooseAllOrders"
            />
          </div>
          <div v-else class="text-center py-3">
            <h2>{{ isTrash ? "No order in Trash" : "Orders empty" }}</h2>
          </div>
        </div>
      </div>
    </div>
    <DialogRemove
      :dialog="dialogRemove"
      :items="dataTrash"
      :isRestore="isRestore"
      :disabledBtn="checkBtnRemove"
      @remove:Accept="acceptRemove"
      @dialog:close="closeDialog"
    />
  </div>
</template>

<script>
import { getOrders, removeOrders, countOrderIsTrash, getStates, getCities } from "@store/order";
import { Provinces, District, Ward } from "@store/recipient";

import _ from "lodash";
import * as moment from "moment";

import Orders from "@component/list/Orders";
import DialogRemove from "@component/shares/DialogRemove";
import Button from "@component/shares/Button";

const iconDropdown = require("../../assets/images/order-detail/arrow_drop.svg");
const restore = require("../../assets/images/order-detail/restore.png");

export default {
  name: "ordersList",
  components: { Orders, DialogRemove, Button },
  props: {
    userId: {
      type: String
    },
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
    checkTrash: false,
    isViewMore: false,
    showViewMore: true,
    dialogRemove: false,
    checkBtnRemove: false,
    isRestore: false,
    clearOfTo: false,
    isFilter: false,
    hidenChooseAll: false,
    
    province: null,
    district: null,
    ward: null,
    dataFilter: null,
    filterState: null,
    token: "",
    role: "",
    searchOrder: "",
    filterText: "",
    ordersList: [],
    dataOrders: [],
    dataTrash: [],
    dataUnTrast: [],
    dates: [],
    listWards: [],
    listProvinces: [],
    listDistricts: [],
    statesFilter: [],
    citiesFilter: [],
    selectedOrderFilter: 0,
    totalTrash: 0,
    totalList: 0,
    indexRemove: -1,
    limit: 30,
    page: 1,
    orderStatusFilter: [
      {
        item: "All",
        value: "all"
      },
      {
        item: "Completed",
        value: "completed"
      },
      {
        item: "In Progress",
        value: "pending"
      },
      {
        item: "Failed",
        value: "failed"
      }
    ],
    contentTab: "order-list"
  }),
  created() {
    this.token = localStorage.getItem("token");
    // this.token = this.$cookies.get('token')
    this.role = JSON.parse(localStorage.getItem("user"))?.role;
    if (this.role == "") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push({ path: "/login" });
    }
    const query = { limit: this.limit, page: this.page, trash: this.isTrash };
    const statusFilter =
      (window["filterOrder"] && window["filterOrder"].status) || null;
    const orderStatusFilter =
      (window["filterOrder"] && window["filterOrder"].orderStatus) || null;
    if (statusFilter) {
      query.status = [statusFilter];
      this.orderStatusFilter.map((item, index) => {
        if (item.value === window["filterOrder"].status) {
          this.selectedOrderFilter = index;
        }
      });
    }
    if (orderStatusFilter) query.orderStatus = [...orderStatusFilter];
    this.getOrders(query);
    this.generalDataFilter();
    this.getProvinces();
    this.getStates()
  },
  computed: {
    dataOrdersList() {
      return this.ordersList;
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    idUser(){
      return this.$props.userId || null;
    },
    checkDisabledFrom(){
      if(this.dataFilter.stateCode || this.dataFilter.fromCode || this.dataFilter.city)
        return false
      return true
    }
  },
  watch: {
    province() {
      this.dataFilter.province = this.province?.name || null;
      if (this.province) this.getDistrict(this.province.code);
    },
    district() {
      this.dataFilter.district = this.district?.name || null;
      if (this.district) this.getWard(this.district.code);
    },
    ward(val) {
      this.dataFilter.ward = val;
    },
    filterState (){
      this.dataFilter.stateCode = this.filterState?.isoCode || null
      if (this.filterState) this.getCities(this.filterState?.isoCode)
    }
  },
  methods: {
    changeContentTabs(str, bol) {
      if (!this.checkTrash && this.contentTab !== str) {
        this.checkTrash = true;
        this.contentTab = str;
        this.chooseTrash(bol);
      }
    },
    chooseAllOrders(val) {
      this.ordersList = this.ordersList.map(item => {
        item.checked = val;
        return item;
      });
    },
    async getOrders(query) {
      this.showViewMore = true;
      if(this.idUser) query.userId = this.idUser
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
            checkPay: false,
            checked: false,
            removed: false
          };
          if(dataItem.payment && dataItem.payment.status === 'completed') dataItem.checkPay = true
          return dataItem;
        });
        this.ordersList = _.concat(this.ordersList, data);
        if (window["filterOrder"]) window["filterOrder"] = null;
        if (result?.data.length < this.limit) this.showViewMore = false;
      }
      this.countTrash()
      this.isViewMore = false;
      this.loading = true;
      this.checkTrash = false;
      this.isFilter = false;
      this.disabledBtn = false;
    },
    chooseTrash(check) {
      this.ordersList = [];
      this.page = 1;
      this.isTrash = check;
      const query = { limit: this.limit, page: this.page, trash: this.isTrash };
      this.getOrders(query);
    },
    async getProvinces() {
      this.listProvinces = [];
      const result = await Provinces();
      if (result.statusCode === 200) {
        this.listProvinces = result?.data || [];
      }
    },
    async getDistrict(provinceCode) {
      this.listDistricts = [];
      this.listWards = [];
      this.dataFilter.district = null;
      const result = await District(provinceCode);
      if (result.statusCode === 200) {
        this.listDistricts = result?.data || [];
      }
    },
    async getWard(districtCode) {
      this.listWards = [];
      this.dataFilter.ward = null;
      const result = await Ward(districtCode);
      if (result.statusCode === 200) {
        this.listWards = result?.data || [];
      }
    },
    generalDataFilter() {
      this.filterText = "";
      this.province = null,
      this.district = null,
      this.ward = null,
      this.filterState = null
      this.dataFilter = {
        fromCode: null,
        stateCode: null,
        city: null,
        province: null,
        district: null,
        ward: null,
        dateRange: null,
        status: null
      };
    },
    filterOrder() {
      this.isFilter = true;
      this.disabledBtn = true;
      const query = {
        limit: this.limit,
        page: this.page,
        trash: this.isTrash,
        search: this.searchOrder
      };
      this.filterText = "";
      if (this.searchOrder != "")
        this.filterText += `Order Id ${this.searchOrder}, `;
      if (this.dataFilter.fromCode) {
        query.fromCode = this.dataFilter.fromCode;
        this.filterText += `From ${query.fromCode}, `;
      }
      if (this.dataFilter.stateCode) {
        this.filterText += this.dataFilter.fromCode ? '' : 'From'
        query.stateCode = this.dataFilter.stateCode;
        this.filterText += ` ${this.filterState.name}, `;
      }
      if (this.dataFilter.city) {
        this.filterText += (this.dataFilter.fromCode && this.dataFilter.stateCode) ? '' : 'From'
        query.city = this.dataFilter.city;
        this.filterText += ` ${query.city}, `;
      }
      if (this.dataFilter.province) {
        query.province = this.dataFilter.province;
        this.filterText += `To ${query.province}`;
      }
      if (this.dataFilter.district) {
        query.district = this.dataFilter.district;
        this.filterText += ` - ${query.district}`;
      }
      if (this.dataFilter.ward) {
        query.ward = this.dataFilter.ward;
        this.filterText += ` - ${query.ward}, `;
      }
      if (this.dataFilter.status) {
        query.status = this.dataFilter.status;
        this.filterText += `, Status ${query.status}`;
      }
      if (this.dates.length == 2) {
        const firstDate = moment(this.dates[0], "YYYY-MM-DD")
          .toDate()
          .getTime();
        const secondDate = moment(this.dates[1], "YYYY-MM-DD")
          .toDate()
          .getTime();
        const firstDateFormat = moment(firstDate).format("MMMM D, YYYY");
        const secondDateFormat = moment(secondDate).format("MMMM D, YYYY");
        let date = [firstDate, secondDate];
        if (firstDate > secondDate) {
          date = [];
          date.push(secondDate);
          date.push(firstDate);
          this.filterText += `, Date ${secondDateFormat} ~ ${firstDateFormat}`;
        } else
          this.filterText += `, Date ${firstDateFormat} ~ ${secondDateFormat}`;
        query.dateRange = date;
      }
      this.ordersList = [];
      this.getOrders(query);
      // }, 1500),
    },
    filterTo() {
      const recipient = this.dataFilter;
      if (recipient.province && recipient.district && recipient.ward) {
        this.filterOrder();
      }
    },
    clearFrom(){
      this.dataFilter.fromCode = null
      this.dataFilter.city = null
      this.dataFilter.stateCode = null,
      this.filterState = null
      this.filterOrder();
    },
    clearTo() {
      this.dataFilter.province = null;
      this.dataFilter.district = null;
      this.dataFilter.ward = null;
      this.province = null;
      this.district = null;
      this.ward = null;
      this.filterOrder();
    },
    clearDate() {
      this.dates = [];
      this.dataFilter.dateRange = null;
      this.filterOrder();
    },
    chooseStatus(index) {
      this.dataFilter.status =
        this.orderStatusFilter[index].value === "all"
          ? null
          : [this.orderStatusFilter[index].value];
      this.filterOrder();
    },
    clearFilter() {
      const check = _.findKey(this.dataFilter, function(o) {
        return o != null;
      });
      this.dates = [];
      this.selectedOrderFilter = 0;
      if (check || this.searchOrder != "") {
        this.searchOrder = "";
        this.generalDataFilter();
        this.filterOrder();
      }
    },
    viewMore() {
      this.page++;
      this.isViewMore = true;
      const query = { limit: this.limit, page: this.page, trash: this.isTrash };
      this.getOrders(query);
    },
    removeOrders(checkRestore) {
      this.isRestore = checkRestore;
      this.dataTrash = [];
      this.ordersList.map(item => {
        if (item.checked) {
          this.dataTrash.push(item.orderCode);
        }
      });
      if (this.dataTrash.length > 0) this.dialogRemove = true;
    },
    orderRemove(index, checkRestore) {
      this.dataTrash = []
      this.isRestore = checkRestore;
      this.indexRemove = index;
      this.dataTrash.push(this.ordersList[index].orderCode);
      this.dialogRemove = true;
    },
    async acceptRemove() {
      this.checkBtnRemove = true
      const result = await removeOrders({ codes: this.dataTrash });
      if (result?.statusCode === 200) {
        if (this.indexRemove != -1) {
          this.ordersList.splice(this.indexRemove, 1);
        }else {
          this.ordersList = this.ordersList.filter(item => {
            return !item.checked;
          });
        }
        this.countTrash()
        this.dataTrash = [];
        this.dialogRemove = false;
      }
      this.indexRemove = -1;
      this.hidenChooseAll = !this.hidenChooseAll;
      this.checkBtnRemove = false
    },
    async countTrash(){
      const result = await countOrderIsTrash(this.idUser)
      if(result.statusCode === 200) {
        this.totalTrash = result?.data.inactive
        this.totalList = result?.data.active
      }
    },
    closeDialog(){
      this.dataTrash = [];
      this.dialogRemove = false
      this.indexRemove = -1;
    },
    async getStates(){
      const result = await getStates()
      if(result.statusCode === 200) this.statesFilter = result?.data
    },
    async getCities(isoCode){
      const result = await getCities(isoCode)
      if(result.statusCode === 200) this.citiesFilter = result?.data
    }
  }
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
    display: flex !important;
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
