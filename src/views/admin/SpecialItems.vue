<template>
  <div class="main-cutoms">
    <div class="main-content p-10">
      <v-card class="mb-30">
        <div class="pa-5 pa-md-10">
          <v-form ref="form" v-model="valid">
            <div class="grid-container">
              <div class="input-field">
                <div>
                  <v-text-field
                    label="Title"
                    outlined
                    dense
                    v-model="quotation.title"
                    :rules="rules.title"
                  ></v-text-field>
                </div>
              </div>
              <div class="input-field">
                <div>
                  <v-text-field
                    label="Unit"
                    outlined
                    dense
                    v-model="quotation.unit"
                    :rules="rules.unit"
                  ></v-text-field>
                </div>
              </div>
              <div class="input-field">
                <div>
                  <v-text-field
                    label="Fee ($)"
                    outlined
                    dense
                    type="number"
                    v-model="quotation.fee"
                    :rules="rules.fee"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="mb-5">
              <v-textarea
                outlined
                label="Note"
                v-model="quotation.description"
              ></v-textarea>
            </div>
          </v-form>
          <div class="justify-end" style="display: flex">
            <Button
              label="Add New Item"
              color="btn-primary"
              :disabled="disabledBtn"
              :width="`150px`"
              @submit:btnSubmit="addQuotation"
            />
          </div>
        </div>
      </v-card>
      <div class="title-table pa-1 pa-md-4 list-order-tabs">
        <div
          class="icon-bar tab-left"
          @click="changeContentTabs('special-list', false)"
          v-bind:class="{ active: contentTab === 'special-list' }"
        >
          <div class="total-list">
            <v-img
              :src="require('../../assets/images/common/customer/icon_box.svg')"
              width="20"
              class="mr-2"
            />
            <p class="count">{{totalActive}}</p>
          </div>
          <p class="mb-0" style="font-weight: 700">
            <span>Special Items</span>
            <!-- <span v-if="filterText != ''">by {{ filterText }}</span> -->
          </p>
        </div>
        <div
          class="d-flex icon-bar tab-right"
          @click="changeContentTabs('trash', true)"
          v-bind:class="{ active: contentTab === 'trash' }"
        >
          <button
            class="check-trash"
            style="outline: none"
          >
            <!-- :disabled="checkTrash" -->
            <!-- :class="{
              'text-primary': isTrash,
            }" -->
            <v-img
              :src="require('../../assets/images/common/customer/Delete.svg')"
              width="25"
              class="mr-2"
            />
            <p class="count">{{totalDeActive}}</p>
            <p>Trash</p>
          </button>
        </div>
      </div>
      <v-card class="w-full">
        <div class="top-action-table">
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
              placeholder="Search Item" 
              v-model="textSearch"
              v-on:keyup.enter="filterSpecialItems"/>
          </div>
        </div>
        <v-row class="title-header">
          <v-col v-for="name in headerTable" :key="name" class="name-title">
            {{ name }}
          </v-col>
        </v-row>
        <div class="mt-30 text-center" v-if="!loading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div class="pb-5" v-else>
          <div v-if="quotationsList.length > 0">
            <v-row
              class="border-item"
              v-for="(data, index) of quotationsList"
              :key="index"
            >
              <v-col style="width: 40%; text-align: left; padding-left: 20px">
                {{ data.title }}
              </v-col>
              <v-col> {{ data.unit }} </v-col>
              <v-col> {{ data.fee }} </v-col>
              <v-col class="action pa-1">
                <v-icon class="show-icon">mdi-dots-horizontal</v-icon>
                <div class="align-center justify-center action-active">
                  <div
                    class="icon-action rounded-circle"
                    @click="showModalEdit(index)"
                  >
                    <v-img
                      :src="
                        require('../../assets/images/common/customer/icon_edit.svg')
                      "
                      width="15"
                    />
                  </div>

                  <div
                    v-if="!isTrash"
                    class="icon-action rounded-circle ml-3"
                    @click="openDialogRemove(index)"
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
                    @click="openDialogRemove(index)"
                  >
                    <v-img :src="restore" width="18" />
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
          <div v-else class="text-capitalize text-center font-bold">No more Special Items to show</div>
        </div>
      </v-card>
      <div class="actions items-center justify-center">
        <div class="mr-5">
          <v-dialog
            transition="dialog-bottom-transition"
            max-width="800"
            v-model="dialog"
          >
            <v-card>
              <v-card-actions class="justify-end mb-0">
                <v-btn text @click="dialog = false"
                  ><v-icon>$close_lg</v-icon></v-btn
                >
              </v-card-actions>
              <div class="headline text-center">Edit Item</div>
              <div class="p-10">
                <v-form v-model="editVal">
                  <div class="grid-container">
                    <div class="input-field">
                      <div>
                        <v-text-field
                          label="Title"
                          outlined
                          dense
                          v-model="dataQuotation.title"
                          :rules="rules.title"
                        ></v-text-field>
                      </div>
                    </div>
                    <div class="input-field">
                      <div>
                        <v-text-field
                          label="Unit"
                          outlined
                          dense
                          v-model="dataQuotation.unit"
                          :rules="rules.unit"
                        ></v-text-field>
                      </div>
                    </div>
                    <div class="input-field">
                      <div>
                        <v-text-field
                          label="Fee ($)"
                          outlined
                          dense
                          type="number"
                          v-model="dataQuotation.fee"
                          :rules="rules.fee"
                        ></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="mb-5">
                    <v-textarea
                      outlined
                      label="Note"
                      v-model="dataQuotation.description"
                    ></v-textarea>
                  </div>
                </v-form>
                <div class="w-full text-center">
                  <Button
                    label="Save Changes"
                    class="btn-grey"
                    color=""
                    :disabled="disabledBtnEdit || !editVal"
                    :progress="disabledBtnEdit"
                    @submit:btnSubmit="editQuotation"
                  />
                </div>
              </div>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
    <Toast :toast="toast" />
    <DialogRemove 
      :dialog="dialogRemove"
      :items="listContentTrash"
      :disabledBtn="checkMove"
      :isRestore="isTrash"
      @remove:Accept="acceptMove"
      @dialog:close="closeDialog"
    />
  </div>
</template>

<script>
// activeQuotation
import { quotations, createQuotation, updateQuotation, activeQuotations, trashQuotations } from "@store/quotation";
import Toast from "@component/Toast";
import Button from "@component/shares/Button";
import DialogRemove from "@component/shares/DialogRemove";

const iconAdd = require("../../assets/images/common/icon/add.png");
const restore = require("../../assets/images/order-detail/restore.png");

import _ from "lodash";

export default {
  name: "SpecialItems",
  components: { Toast, Button, DialogRemove },
  data: () => ({
    iconAdd,
    restore,
    valid: false,
    editVal: false,
    dialog: false,
    disabledBtn: false,
    disabledBtnEdit: false,
    loading: false,
    isTrash: false,
    checkMove: false,
    quotationsList: [],
    listContentTrash: [],
    moveQuotations: [],
    listForSearch: [],
    indexQuotation: -1,
    totalActive: 0,
    totalDeActive: 0,
    textSearch: '',
    dataQuotation: {
      description: "",
      fee: 0,
      title: "",
      unit: ""
    },
    headerTable: ["Item", "Unit", "Fee", "Action"],
    quotation: {
      description: "",
      fee: 0,
      title: "",
      unit: ""
    },
    toast: {
      content: "",
      open: false
    },
    rules: {
      title: [value => !!value || "Required."],
      unit: [value => !!value || "Please entered unit."],
      fee: [
        value => !!value || "Required.",
        value => value > 0 || "Fee must be greater than 0"
      ]
    },
    dialogRemove: false,
    contentTab: "special-list"
  }),
  created() {
    this.getQuotations();
    this.getTrashQuotation()
  },
  methods: {
    changeContentTabs(str, checkTrash) {
      if(this.contentTab != str){
        this.contentTab = str;
        this.isTrash = checkTrash
        this.getQuotations()
      }
    },
    openDialogRemove(index) {
      this.listContentTrash = []
      this.moveQuotations = []
      this.indexQuotation = index
      this.listContentTrash.push(this.quotationsList[index].title)
      this.moveQuotations.push(this.quotationsList[index]._id)
      this.dialogRemove = true;
    },
    closeDialog() {
      this.dialogRemove = false;
      this.indexQuotation = -1
    },
    async getQuotations() {
      this.loading = false;
      const query = {trash: this.isTrash}
      const result = await quotations(query);
      if (result.statusCode === 200) {
        this.quotationsList = result?.data;
        this.listForSearch = result?.data;
      }
      this.loading = true;
    },
    async addQuotation() {
      this.disabledBtn = true;
      let infoToast = {
        color: "success",
        content: "You have created quotation successful!",
        open: true
      };
      if (this.valid) {
        const result = await createQuotation(this.quotation);
        if (result.statusCode === 201) {
          this.quotationsList.unshift(result.data);
          this.$refs.form.reset();
        } else {
          infoToast.color = "warning";
          infoToast.content = "Can't create quotation!";
        }
      } else {
        infoToast.color = "warning";
        infoToast.content = "You have missed some fields!";
      }
      this.toast = infoToast;
      this.disabledBtn = false;
    },
    showModalEdit(index) {
      this.indexQuotation = index;
      this.dataQuotation = this.quotationsList[index];
      this.dialog = true;
    },
    async editQuotation() {
      this.disabledBtnEdit = true;
      let infoToast = {
        color: "warning",
        content: "Edit quotation failed!",
        open: true
      };
      const data = _.pick(this.dataQuotation, [
        "title",
        "description",
        "unit",
        "parentId",
        "fee"
      ]);
      if (this.editVal) {
        const result = await updateQuotation(this.dataQuotation._id, data);
        if (result.statusCode == 200) {
          infoToast.color = "success";
          infoToast.content = "You have edited quotation successful!";
          this.quotationsList[this.indexQuotation] = result.data;
          this.dialog = false;
          this.indexQuotation = -1;
        }
      }
      this.disabledBtnEdit = false;
      this.toast = infoToast;
    },
    async acceptMove(){
      this.checkMove = true
      this.toast.open = false
      const infoToast = {
        color: "success",
        content: `Moved item to ${this.isTrash ? 'list' : 'trash'} successful!`,
        open: true
      }
      const result = await activeQuotations({ids: this.moveQuotations})
      if(result.statusCode == 200){
        this.quotationsList.splice(this.indexQuotation, 1)
        this.dialogRemove = false
      }else {
        infoToast.color = "warning",
        infoToast.content = `Move item to ${this.isTrash ? 'list' : 'trash'} failed!`
        this.checkMove = false
      }
      this.toast = infoToast
      this.indexQuotation = -1
      this.getTrashQuotation()
    },
    filterSpecialItems(){
      this.loading = false;
      if(this.textSearch != ''){
        const data = this.listForSearch.filter(data =>{
          return data.title.toLowerCase().match(this.textSearch.toLowerCase())
        })
        this.quotationsList = [...data]
      }else this.quotationsList = this.listForSearch
      this.loading = true;
    },
    async getTrashQuotation(){
      const result = await trashQuotations()
      this.totalActive = result?.data.active || 0
      this.totalDeActive = result?.data.inactive || 0
    }
  }
};
</script>

<style lang="scss" scoped>
.top-action-table {
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid rgb(0 0 0 / 6%);
  padding: 15px;
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
.grid-container {
  display: grid;
  grid-template-columns: 1fr auto auto;
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
.main-content {
  .btn-find {
    background: #06b7b4;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
  }
  .name-title {
    font-weight: 500;
    text-align: center;
    font-size: 16px !important;
    padding-left: 16px !important;
    padding-bottom: 5px !important;
    padding-top: 5px !important;
  }
  input:focus,
  textarea:focus {
    outline: 0;
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
    &:first-child {
      border-top: 1px solid rgb(0 0 0 / 6%);
    }
  }
  .title-header {
    border-radius: 4px;
    padding: 15px;
    text-align: center;
    font-size: 14px;
    text-align: left;
    align-items: center;
  }
  .action {
    .action-active {
      display: none;
    }
    &:hover {
      .show-icon {
        display: none;
      }
      .action-active {
        display: flex;
        align-items: center;
        align-content: center;
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .main-content {
    .grid-container {
      display: block;
    }
  }
}
</style>