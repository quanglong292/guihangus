<template>
  <div class="main-cutoms order-detail">
    <div v-if="!loading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-row v-else>
      <v-col class="col-md-8">
        <v-card class="order-cancel" v-if="role !== 'Customer' && steppers.length == 2">
          <div class="order-cancel-info">
            <h2 class="mb-3">Order has canceled</h2>
            <p>For more detail about this order. Please check in comment session!</p>
            <a href="#comment">
              <div class="d-flex"><span>Link to comment </span>
              <img width="15" :src="arrowRight" /></div>
            </a>
          </div>
        </v-card>
        <v-card class="mb-1 payment-paid" v-if="payment && role === 'Customer'">
          <div class="px-10 py-6" :class="{
            'border-bottom': payment.status === 'pending',
            'bg-red': payment.status === 'cancel'
          }">
            <h2 v-if="payment.status === 'pending'">Payment Notice</h2>
            <h2
              class="text-white"
              v-else-if="payment.status === 'cancel'"
            >
              You have canceled payment!
            </h2>
            <h2 class="d-flex align-center" v-else>
              <div class="mr-3">
                <v-img min-width="30" :src="success" />
              </div>
              <span class="text-primary">Payment Approved</span>
            </h2>
          </div>
          <div class="px-10 py-5">
            <p class="payment-note" v-if="payment.status === 'pending'">
              {{ payment && payment.note }}
            </p>
            <div>
              <h3 class="mb-2">Your Price</h3>
              <div class="d-flex justify-space-between mb-2">
                <span>Surcharge</span>
                <span
                  >$ <strong>{{ payment.surcharge }}</strong></span
                >
              </div>
              <div class="d-flex justify-space-between mb-2">
                <span>SubTotal</span>
                <span
                  >$ <strong>{{ payment.subTotal }}</strong></span
                >
              </div>
            </div>
            <hr class="primary" />
            <div class="mt-4 d-flex justify-space-between align-center">
              <h3>Total</h3>
              <h2>$ {{ payment.total }}</h2>
            </div>
            <div class="attention-payment py-5">
              Ultrices semper sit netus nulla non elit pharetra.
            </div>
            <div class="text-right" v-if="payment.status === 'pending'">
              <v-btn
                depressed
                class="btn-grey w-auto mR30"
                height="40"
                @click="openCancelPayment()"
                >Cancel payment</v-btn
              >
              <v-btn
                depressed
                class="btn-primary w-auto"
                height="40"
                @click="payPayment"
                :disabled="submitSquare"
                >PROCESS PAYMENT</v-btn
              >
            </div>
          </div>
        </v-card>
        <v-card class="mb-12">
          <!-- v-if="orderhistories.length > 0" -->
          <div v-if="orderhistories.length > 0">
            <div class="px-10 py-5 border-bottom t-edit-order">
              <p>Order History</p>
              <v-menu offset-y :close-on-content-click="true">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="text-capitalize text-blue-dark"
                    color="primary"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ selectedUpdateDate }}
                    <span class="ml-2">
                      <v-img :src="iconDropdown" />
                    </span>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(history, index) in orderhistories"
                      :key="index"
                      @click="chooseHistory(history)"
                    >
                      <v-list-item-title>{{ formatDateHistory(history.createdAt) }}</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </div>
            <div v-if="showHistory">
              <div class="border-bottom c-item-package">
                <div class="ctop-action-package">
                 <p>Updated on {{formatDateHistory(historyOrder.createdAt)}}</p>
                  <!-- <img :src="iconEditPackage" /> -->
                  <span @click="hiddenOrderHistory"><img :src="iconRemovePackage" /></span>
                </div>
                <div class="ctop-item-package">
                  <h2>Package Infomation</h2>
                  <p>$ {{historyOrder.total}}</p>
                </div>
                <div
                  class="pt-4 div-first"
                  v-for="(pac, index) of historyOrder.RequestedPackageLineItems"
                  :key="index"
                >
                  <h3>Your package #{{ index + 1 }}</h3>
                  <p class="mt-3 div-first-item">
                    Weight <span>{{ pac.Weight.Value }}lb</span>
                  </p>
                  <div class="mt-3 div-first-item">
                    <p class="mt-3 mT0 font-bold">Items</p>
                    <div class="mt-2 text-second">
                      <v-row>
                        <v-col
                          cols="12"
                          class="d-flex justify-space-between align-center row-itemPackage item-package"
                          v-for="(item, index) of pac.items" :key="index"
                        >
                         <h3><span></span>{{item.item}} x {{item.quanlity}} {{item.unit}}</h3>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-bottom c-item-package">
            <div class="ctop-item-package">
              <h2 class="mT20">Sender & Receiver</h2>
              <span v-if="canEditOrder" class="mT20">
                <img :src="iconEditPackage" @click="goEditOrder(false)" />
              </span>
            </div>
            <v-row class="address-container">
              <v-col class="address">
                <h3 class="pb-4 text-capitalize">
                  {{ this.senderAndReceiver.shipper.Contact.PersonName }}
                </h3>
                <p class="d-flex">
                  <img :src="iconCalling" class="mr-2" />
                  <span>{{
                    this.senderAndReceiver.shipper.Contact.PhoneNumber
                  }}</span>
                </p>
                <p class="d-flex">
                  <img :src="iconMessage" class="mr-2" />
                  <span>{{
                    this.senderAndReceiver.shipper.Contact.EMailAddress
                  }}</span>
                </p>
                <p class="d-flex">
                  <img :src="iconLocation" class="mr-2" />
                  <span>
                    {{ this.senderAndReceiver.shipper.Address.StreetLines }},
                    {{ this.senderAndReceiver.shipper.Address.City }},
                    {{
                      this.senderAndReceiver.shipper.Address
                        .StateOrProvinceCode
                    }},
                    {{ this.senderAndReceiver.shipper.Address.PostalCode }}
                  </span>
                </p>
              </v-col>
              <v-col class="address">
                <h3 class="pb-4 text-capitalize">
                  {{ this.senderAndReceiver.recipient.fullName }}
                </h3>
                <p class="d-flex">
                  <img :src="iconCalling" class="mr-2" />
                  <span>{{ this.senderAndReceiver.recipient.phone }}</span>
                </p>
                <p class="d-flex">
                  <img :src="iconMessage" class="mr-2" />
                  <span>{{ this.senderAndReceiver.recipient.email }}</span>
                </p>
                <p class="d-flex">
                  <img :src="iconLocation" class="mr-2" />
                  <span>
                    {{ senderAndReceiver.recipient.address.line }},
                    {{ senderAndReceiver.recipient.address.district }},
                    {{ senderAndReceiver.recipient.address.ward }},
                    {{ senderAndReceiver.recipient.address.city }}
                  </span>
                </p>
              </v-col>
            </v-row>
          </div>
          <div v-if="summary">
            <div class="ctop-item-package">
              <h2 class="mT20">Order Summary</h2>
            </div>
            <div class="first-div">
              <p class="p-left">Delivery fee</p>
              <p class="p-right">$ {{summary.deliveryFee.fee}}</p>
            </div>
            <div class="second-div">
              <span class="p-left">(${{summary.deliveryFee.price}}/lb) x {{summary.deliveryFee.weight}}</span>
            </div>
            <div class="first-div">
              <p class="p-left">Surcharge</p>
              <p class="p-right">$ {{summary.surcharge.fee}}</p>
            </div>
            <div class="second-div" v-for="(item, index) of summary.surcharge.items" :key="index">
              <span class="p-left" >
                ${{item.fee}} x {{item.qty}} <br />
                {{item.name}}
              </span>
            </div>
            <div class="border-bottom-sub">
                <div class="third-div">
              <p class="p-left">Subtotal</p>
              <p class="p-right">$ {{subTotal}}</p>
            </div>
            <div class="third-div">
              <p class="p-left">Tax</p>
              <p class="p-right">$ {{tax}}</p>
            </div>
            </div>
            <div class="total-div">
              <p class="p-left">Total</p>
              <p class="p-right">$ {{totalOrder}}</p>
            </div>
          </div>
        </v-card>
        <v-card id="comment">
          <h2 class="card-title py-2 px-10 pl-5">Comments</h2>
          <div class="card-content px-10 py-10">
            <div class="block-comment mb-4" ref="commentContainer">
              <div
                class="card-item pb-6"
                v-for="(comment, index) of listComments"
                :key="index"
              >
                <p>{{ comment.name }}, {{ formatDate(comment.timestamp) }}</p>
                <div class="d-flex">
                  <img
                    :src="
                      comment.avatar != ''
                        ? comment.avatar
                        : require('../../assets/images/order-detail/cus2.png')
                    "
                    width="40px"
                    height="40px"
                    class="mr-4"
                  />
                  <div class="cus-quote">
                    {{ comment.description }}
                  </div>
                </div>
              </div>
            </div>
            <div class="comment">
              <v-textarea
                outlined
                placeholder="Start typing here"
                rows="2"
                v-model="commentContent"
              ></v-textarea>
              <div>
                <Button
                  label="Send"
                  color="primary"
                  class="btn-primary"
                  :disabled="sendComment || !commentContent"
                  :progress="sendComment"
                  @submit:btnSubmit="addComment"
                />
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col class="col-md-4">
        <v-card class="mb-7 box-action">
          <div class="grid-container">
           <div class="py-4 d-flex align-center justify-center font-bold" @click="printLabel()">
               <img
                  :src="
                    require('../../assets/images/order-detail/ico_print.png')
                  "
                />
              <span class="ml-2">Print</span>
            </div>
            <div class="d-flex align-center justify-center font-bold">
              <v-btn
                @click="dowloadLabel()"
                width="100%"
                height="100%"
                class="bg-tranparent"
                :disabled="downloadLabel"
              >
                <img
                  :src="
                    require('../../assets/images/order-detail/ico_download.png')
                  "
                />
                <span class="ml-2 text-capitalize">
                  Download
                </span>
              </v-btn>
            </div>
            <div>
              <span v-if="steppers.length > 2">
                <Button
                  label="Cancel Order"
                  color="bg-tranparent"
                  width="100%"
                  height="100%"
                  :disabled="submitStatus"
                  @submit:btnSubmit="openCancelOrder()"
                />
              </span>
              <span v-else>
                <Button
                  label="Show Receipt"
                  color="bg-tranparent"
                  width="100%"
                  height="100%"
                  :disabled="submitStatus"
                />
              </span>
              <!-- <Button
                label="Back"
                color="bg-tranparent"
                width="100%"
                height="100%"
                :disabled="submitStatus"
              /> -->
            </div>
          </div>
        </v-card>
        <v-stepper vertical class="stepper pb-4 mb-10">
          <h2 class="pl-5 py-2 card-title">Order Status</h2>
          <div class="stepper-content">
            <div v-for="(item, index) of steppers" :key="index">
              <v-stepper-step :step="index + 1" :complete="item.completed">
                <div class="top-v-stepper-step">
                  <h3
                    :class="{
                      'text-active': item.completed,
                    }"
                  >
                    <strong>{{item.content}}</strong>
                  </h3>
                  <div v-if="role !== 'Customer'">
                    <div v-if="item.showBtn">
                      <v-btn class="btn-primary bg-request" height="40" v-if="item.isRequest" @click="showDialogUpdate(index)"
                        >Request</v-btn
                      >
                      <v-btn class="btn-primary bg-update" height="40" @click="showDialogUpdate(index)" v-else-if="payment && payment.status === 'completed'"
                        >Update</v-btn
                      >
                    </div>
                    <v-btn class="btn-primary bg-update" height="40" @click="showDialogUpdate(index)" v-if="index == 3 && !item.received"
                      >Update</v-btn
                    >
                  </div>
                </div>
                <span class="mt-1">{{formatDateStepper(item.createdAt)}}</span>
              </v-stepper-step>
              <v-stepper-content
                v-if="index + 1 < steppers.length"
                :step="index + 1"
                style="border-left: 1px solid #979797"
              >
              </v-stepper-content>
            </div>
          </div>
        </v-stepper>
        <v-card class="mx-auto payment-admin mb-10" v-if="role !== 'Customer'">
          <div class="block-label py-2 pl-5">
            <h2 class="card-title">Payment</h2>
          </div>
          <v-card-text>
            <div>
              <div v-if="payment">
                <div
                  class="d-flex align-center status-styles"
                  v-if="payment.status === 'fail'"
                >
                  <div class="mr-1">
                    <v-img :src="fails" />
                  </div>
                  <span>Payment Failed</span>
                </div>
                <div
                  class="d-flex align-center status-styles"
                  v-if="payment.status === 'completed'"
                >
                  <div class="mr-1">
                    <v-img :src="success" />
                  </div>
                  <span>Payment Approved</span>
                </div>
                <div
                  class="d-flex align-center status-styles"
                  v-if="payment.status === 'pending'"
                >
                  <div class="mr-1">
                    <v-img :src="success" />
                  </div>
                  <span>Payment Sended</span>
                </div>
                <!-- <hr class="mt-3 primary" /> -->
              </div>
              <!-- <div v-else>
                <div class="d-flex justify-space-between">
                  <p>Sub-total</p>
                  <strong>$ {{ totalOrder }}</strong>
                </div>
                <div class="d-flex justify-space-between">
                  <span>Surcharge</span>
                  <span>
                    <input
                      type="number"
                      class="border-gray surchange"
                      v-model="surcharge"
                    />
                    <span class="border-gray pa-2">USD</span>
                  </span>
                </div>
                
              </div> -->
              <div class="d-flex justify-space-between mt-3 align-center">
                <strong>Total</strong>
                <h1 class="text-total">$ {{ this.totalOrder }}</h1>
              </div>
              <v-textarea
                class="mt-6"
                outlined
                rows="3"
                label="Payment note"
                v-model="note"
                :disabled="!!payment && payment.status != 'cancel' || steppers.length == 2"
              ></v-textarea>
              <div class="bottom-payment" v-if="stepper.length > 2">
                <Button
                  v-if="!payment || !!payment && payment.status == 'cancel'"
                  label="MAKE PAYMENT REQUEST"
                  width="100%"
                  :disabled="submitting || orderStatus.length < 4"
                  :progress="orderStatus.length >= 4"
                  @submit:btnSubmit="createPayment"
                />
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto" v-if="orderhistories.length > 0">
          <div class="primary py-2 pl-5">
            <h2 class="card-title primary">Order History Logs</h2>
          </div>
          <v-list class="p20">
            <v-list-item-group>
              <v-list-item
                v-for="(order, i) in orderhistories"
                :key="i"
                class="bd-bottom"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="`${order.user ? order.user.fullName + ' - ' : ''}${formatDateStepper(order.createdAt)}`"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <Toast :toast="toast" />
    <v-dialog v-model="updateDialog" width="500" content-class="order-dialog">
      <v-card>
        <div class="header-dialog">
          <div class="h-top-dialog">
            <p></p>
            <p @click="updateDialog = false"><img :src="icoClose" /></p>
          </div>
          <h2>Update Order Status</h2>
          <p>Do you want to update order status to</p>
        </div>
        <div class="body-dialog">
          <p>{{updateStatusOrder && updateStatusOrder.content}}</p>
        </div>
        <div class="footer-dialog">
          <!-- <v-btn class="btn-confirm" @click="submitChangeStatus"> Yes </v-btn> -->
          <Button
            label="Yes"
            color="btn-confirm text-capitalize"
            :disabled="submitStatus"
            @submit:btnSubmit="submitChangeStatus"
          />
          <v-btn class="btn-cancel" @click="()=>{this.updateDialog = false; this.updateStatusOrder = null}">
            No
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <DialogCancel
      :dialog="dialogCancelOrder"
      :content="contentCancel"
      :disabledBtn="cancelBtnDisabled"
      @submit:Cancel="acceptCancelOrder"
      @dialog:close="closeDialog"
      title="Cancel Order"
      caption="Imperdiet nam tellus platea purus justo. Non lectus congue quam in quis et quis ligula."
    />
    <DialogCancel
      :dialog="dialogCancelPayment"
      :content="contentCancel"
      :disabledBtn="cancelBtnDisabled"
      @submit:Cancel="acceptCancelPayment"
      @dialog:close="closeDialog"
      title="Cancel Payment"
      caption="Imperdiet nam tellus platea purus justo. Non lectus congue quam in quis et quis ligula."
    />
  </div>
</template>

<script>
import {  getOrderDetail, 
          getCommentDetail, 
          addComment, 
          updateOrderStatus, 
          getOrderHistory,
          } from "@store/order";
import { payment, getSquare, paymentPay, cancelPayment } from "@store/payment";
import { compressLabel } from "@store/label";

import _ from "lodash";
import * as moment from "moment";

import Button from "@component/shares/Button";
import Toast from "@component/Toast";
import DialogCancel from "@component/shares/DialogCancel";

const iconCalling = require("../../assets/images/order-detail/ico_calling.png");
const iconEditPackage = require("../../assets/images/common/customer/icon_edit.svg");
const icoClose = require("../../assets/images/common/icon/close_lg.png");
const iconRemovePackage = require("../../assets/images/common/customer/icon-delete-order.svg");
const iconMessage = require("../../assets/images/order-detail/ico_message.png");
const iconLocation = require("../../assets/images/order-detail/ico_location.png");
const cus1 = require("../../assets/images/order-detail/cus1.png");
const cus2 = require("../../assets/images/order-detail/cus2.png");
const fails = require("../../assets/images/order-detail/frame_fails.png");
const success = require("../../assets/images/order-detail/frame_successful.png");
const iconDropdown = require("../../assets/images/order-detail/arrow_drop.svg");
const arrowRight = require("../../assets/images/order-detail/arrow_right.svg")

export default {
  name: "OrderDetail",
  components: { Button, Toast, DialogCancel },
  data: () => ({
    icoClose,
    iconEditPackage,
    iconRemovePackage,
    iconDropdown,
    iconCalling,
    iconMessage,
    iconLocation,
    cus1,
    cus2,
    fails,
    success,
    arrowRight,
    submitSquare: false,
    downloadLabel: false,
    submitting: false,
    submitStatus: false,
    loading: false,
    sendComment: false,
    showHistory: false,
    cancelBtnDisabled: false,
    code: null,
    transactionId: null,
    payment: null,
    orderId: null,
    orderStatus: null,
    commentContent: null,
    steppers: null,
    updateStatusOrder: null,
    historyOrder: null,
    summary: null,
    contentCancel: '', 
    token: "",
    id: "",
    role: "",
    note: "",
    packages: [],
    listLabels: [],
    listComments: [],
    orderhistories: [],
    totalOrder: 0,
    subTotal: 0,
    tax: 0,
    // surcharge: 0,
    stepper: {
      package: false,
      from: false,
      to: false
    },
    toast: {
      content: "",
      open: false
    },
    senderAndReceiver: {
      recipient: {
        address: {
          city: null,
          district: null,
          line: null,
          ward: null
        },
        createdAt: 0,
        email: null,
        fullName: null,
        phone: null,
        updatedAt: 0
      },
      shipper: {
        Address: {
          City: null,
          CountryCode: null,
          PostalCode: null,
          StateOrProvinceCode: null,
          StreetLines: null
        },
        Contact: {
          CompanyName: null,
          EMailAddress: null,
          PersonName: null,
          PhoneNumber: null
        }
      }
    },
    updateDateFilter: [
      {
        item: "01/14/2019",
        value: "01/14/2019"
      }
    ],
    selectedUpdateDate: "Updated date",
    updateDialog: false,
    items: [
        {
          icon: 'mdi-inbox',
          text: 'Inbox',
        },
        {
          icon: 'mdi-star',
          text: 'Star',
        },
        {
          icon: 'mdi-send',
          text: 'Send',
        },
        {
          icon: 'mdi-email-open',
          text: 'Drafts',
        },
      ],
    dialogCancelOrder: false,
    dialogCancelPayment: false
  }),
  computed: {
    canEditOrder(){
      if(this.role === 'Customer' || this.orderStatus.length >= 4){
        return false
      }
      return true
    }
  },
  async created() {
    const dataRoute = this.$route;
    this.transactionId = dataRoute?.query?.transactionId;
    this.id = dataRoute?.params?.id;
    this.role = JSON.parse(localStorage.getItem("user"))?.role;
    this.getOrderDetail();
  },
  methods: {
    openCancelOrder() {
      this.dialogCancelOrder = true;
    },
    openCancelPayment() {
      this.dialogCancelPayment = true;
    },
    closeDialog() {
      this.dialogCancelOrder = false;
      this.dialogCancelPayment = false;
    },
    async acceptCancelOrder(content) {
      let infoToast = {
        color: "warning",
        content: "Please enter your cancellation reason!",
        open: true
      };
      if(content){
        this.cancelBtnDisabled = true
        const params = {
          codeOrder : this.code,
          status: 'cancel'
        }
        const result = await updateOrderStatus(params)
        if (result.statusCode === 200) {
          this.commentContent = content
          this.addComment()
          infoToast.content = "Canceled order successfully!"
          infoToast.color = 'success'
          this.closeDialog()
        }else {
          infoToast.content = "Request cancel order failed!"
        }
        this.cancelBtnDisabled = false
      }
      this.toast = infoToast
    },
    async acceptCancelPayment(content) {
      let infoToast = {
        color: "warning",
        content: "Please enter your cancellation reason!",
        open: true
      };
      if(content){
        this.cancelBtnDisabled = true
        const result = await cancelPayment(this.payment._id)
        if (result.statusCode === 200) {
          this.payment = result?.data
          this.commentContent = content
          this.addComment()
          infoToast.content = "Canceled payment successfully!"
          infoToast.color = 'success'
          this.closeDialog()
        }else {
          infoToast.content = "Request cancel payment failed!"
        }
        this.cancelBtnDisabled = false
      }
      this.toast = infoToast
    },
    async getOrderDetail() {
      const result = await getOrderDetail(this.id);
      if (result.statusCode === 200) {
        result?.data?.RequestedPackageLineItems?.map(item => {
          this.packages.push(item);
        });
        this.listLabels = _.reduce(
          result?.data?.lables || [],
          (n, o) => {
            const img = _.get(
              o,
              "ProcessShipmentReply.CompletedShipmentDetail.CompletedPackageDetails.Label.Parts.Image"
            );
            n.push(img);
            return n;
          },
          []
        );
        this.totalOrder = result?.data?.total;
        this.subTotal = result?.data?.subTotal
        this.summary = result?.data?.summary || null
        this.tax = result?.data?.tax
        this.senderAndReceiver.recipient = result?.data?.recipient;
        this.senderAndReceiver.shipper = result?.data?.shipper;
        this.code = result?.data?.code;
        this.orderId = result?.data?._id;
        this.orderStatus = result?.data?.orderStatus;
        this.orderhistories = result?.data?.orderhistories || []
        const paymentDetail = result?.data?.payment || null;
        if (paymentDetail && this.transactionId) {
          this.checkSquare(paymentDetail._id);
        } else this.payment = paymentDetail;
        this.note = this.payment?.note || "";
        this.getComments();
        this.loading = true;
        this.dataStepper(this.id, this.orderStatus);
      }
    },
    async getComments() {
      const result = await getCommentDetail(this.orderId);
      if (result.statusCode === 200) {
        result.data.map(item => {
          const comment = {
            name: item.user.fullName,
            avatar: item.user.avatar,
            description: item.message,
            timestamp: item.createdAt
          };
          this.listComments.push(comment);
        });
        setTimeout(() => {
          if (this.listComments.length > 0) {
            this.scrollBottom();
          }
        }, 1000);
      }
    },
    async addComment() {
      this.sendComment = true;
      if (this.commentContent) {
        const comment = {
          lableId: this.orderId,
          message: this.commentContent
        };
        const result = await addComment(comment);
        if (result.statusCode === 201) {
          const comment = {
            name: result.data[0].user.fullName,
            avatar: result.data[0].user.avatar,
            description: result.data[0].message,
            timestamp: result.data[0].createdAt
          };
          this.listComments.push(comment);
          this.commentContent = null;
          setTimeout(() => {
            this.scrollBottom();
          }, 500);
        }
        this.sendComment = false;
      } else this.sendComment = false;
    },
    async createPayment() {
      this.submitting = true;
        let infoToast = {
          color: "success",
          content: "Maked payment request successfully!",
          open: true
        };
        const body = {
          lableId: this.orderId,
          // surcharge: Number(this.surcharge),
          note: this.note
        };
        const result = await payment(body);
        if (result.statusCode === 201) {
          this.payment = result.data;
          this.note = this.payment.note;
        } else {
          infoToast.color = "warning"
          infoToast.content = "Make payment request failed!"
          this.submitting = false;
        }
        this.toast = infoToast;
    },
    async payPayment() {
      this.submitSquare = true
      const result = await getSquare(this.payment._id);
      if (result.statusCode === 200) {
        window.location.href = result?.data?.squareData?.url;
      }else this.submitSquare = false
    },
    async dowloadLabel() {
      this.downloadLabel = true;
      const result = await compressLabel(this.listLabels);
      const file = new File([result], "labels.pdf");

      let link = document.createElement("a");
      const url = window.URL.createObjectURL(file);

      link.href = url;
      link.download = "Report.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
      this.downloadLabel = false
    },
    async printLabel() {
      let iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.srcdoc = this.listLabels.reduce(
        (a, b) => (a += `<img src="${b}" />`),
        ""
      );

      document.body.appendChild(iframe);

      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    },
    async checkSquare(id) {
      const result = await paymentPay(id, this.transactionId);
      if (result.statusCode === 200) {
        this.payment = result?.data;
      }
    },
    formatDate(val) {
      return moment(val).format("h:mm dddd, MMMM Do YYYY");
    },
    formatDateHistory(val) {
      return moment(val).format("hh:mm A, MMMM Do YYYY");
    },
    formatDateStepper(val) {
      const hh = moment(val).format("hh:mm")
      const date = moment(val).format("DD MMMM YYYY");
      return hh + ' Date, ' + date;
    },
    scrollBottom() {
      var content = this.$refs.commentContainer;
      content.scrollTop = content.scrollHeight;
    },
    async chooseHistory(e) {
      this.selectedUpdateDate = this.formatDateHistory(e.createdAt);
      const result = await getOrderHistory(e._id)
      if(result.statusCode === 200){
        this.historyOrder = _.pick(result?.data, ['createdAt', 'RequestedPackageLineItems', 'total'])
        this.showHistory = true
      }
    },
    dataStepper(codeOrder, orderStatus) {
      let data = [
        {
          content: `${codeOrder} was created`,
          status: 'created'
        }
      ];
      if(orderStatus[1].status === 'cancel'){
        data.push({
          content: `${codeOrder} was canceled`,
          status: 'cancel'
        })
      }else {
        const subData = [
          {
            content: `FedEx has received order ${codeOrder}`,
            status: 'FedEx_Recived'
          },
          {
            content: `${codeOrder} is shipping by FedEx to GHUS`,
            status: 'FedEx_GHUS'
          },
          {
            content: `GHUS has received order ${codeOrder}`,
            status: 'GHUS_Recived'
          },
          {
            content: `${codeOrder} on the way to Vietnam`,
            status: 'To_VN'
          },
          {
            content: `${codeOrder} has been delivered`,
            status: 'delivered'
          }
        ]
        data = [...data, ...subData]
      }
      this.steppers = data.map((item, index) => {
        item = { ...item, ...orderStatus[index] };
        item.completed = !!orderStatus[index];
        item.received = orderStatus[3] ? true : false
        item.isRequest = index + 1 > 3 ? false : true
        if (index + 1 <= 6) {
          item.showBtn = (index + 1 != 4 && index + 1 - orderStatus.length == 1) ? true : false;
        }
        return item;
      });
    },
    showDialogUpdate(index){
      this.updateStatusOrder = this.steppers[index]
      this.updateDialog = true;
    },
    async submitChangeStatus(){
      this.submitStatus = true
      this.toast.open = false
      let infoToast = {
        color: "success",
        content: "Updated status successfully!",
        open: true
      };
      const result = await updateOrderStatus({codeOrder: this.id, status: this.updateStatusOrder.status})
      if(result.statusCode === 200){
        this.dataStepper(result.data?.code, result.data?.orderStatus);
        this.orderStatus = result.data?.orderStatus
        this.updateStatusOrder = null
        this.updateDialog = false;
      }else{
        infoToast.color = "warning"
        infoToast.content = "Update status failed!"
      }
      this.toast = infoToast
      this.submitStatus = false
    },
    hiddenOrderHistory() {
      this.historyOrder = null
      this.showHistory=!this.showHistory
      this.selectedUpdateDate = 'Updated date'
    },
    goEditOrder(check){
      if(check){
        window['editOrder'] = 'editPackage'
      }else window['editOrder'] = 'editAddress'
      this.$router.push({path: `/${this.role !== 'Customer' ? 'admin' : 'customer'}/order-detail/${this.id}/edit-order`})
    }
  }
};
</script>
<style lang="scss">
html {
  scroll-behavior: smooth;
}
.order-detail {
  .order-cancel{
    h2 {
      font-size: 21;
    }
  }
  .first-div {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 10px;
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.1px;
      color: #1b2534;
      margin-bottom: 0;
    }
    .p-left {
      text-align: left;
    }
    .p-right {
      text-align: right;
    }
  }
  .second-div {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    // margin-bottom: 10px;
    span{
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.1px;
      color: #5d6e85;
    }
    .p-left {
      text-align: left;
    }
    .p-right {
      text-align: right;
    }
  }
  .third-div {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 10px;
    p {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.1px;
      color: #1b2534;
      margin-bottom: 10px;
    }
    .p-left {
      text-align: left;
    }
    .p-right {
      text-align: right;
    }
  }
  .border-bottom-sub{
    border-top: 1px solid #ebedf0;
    margin-top: 10px;
  }
  .total-div {
    display: flex;
    justify-content: space-between;
    padding: 20px 40px 10px;
    border-top: 1px solid #ebedf0;
    p {
      font-weight: 900;
      font-size: 20px;
      line-height: 26px;
      letter-spacing: 0.2px;
      color: #1b2534;
      margin-bottom: 10px;
    }
    .p-left {
      text-align: left;
    }
    .p-right {
      text-align: right;
    }
  }
  .bottom-payment {
    .btn-primary.btn-primary.btn-primary {
      height: 50px !important;
      background: linear-gradient(
        103.01deg,
        #06b7b4 0%,
        #00a4e4 100%
      ) !important;
      color: #fff !important;
    }
  }
  .box-action.box-action.box-action {
    span {
      font-size: 13px !important;
    }
    .v-btn {
      font-weight: bold;
      text-transform: inherit !important;
      white-space: inherit !important;
      font-size: 13px !important;
      height: 100% !important;
      // &:hover::before {
      //   background: transparent !important;
      //   opacity: 1 !important;
      // }
    }
  }
  .p20 {
    padding: 10px 20px;
  }
  .bd-bottom {
    border-bottom: 1px solid #ebedf0;
    padding: 0;
    &:last-child {
      border-bottom: none !important;
    }
    .v-list-item__content {
      padding: 0 !important;
    }
    &::before {
      opacity: 1 !important;
      background: transparent !important;
    }
    .v-list-item__title {
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.1px;
      color: #5d6e85;
    }
  }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    div {
      cursor: pointer;
      &:hover {
        background-color: whitesmoke;
      }
    }
  }
  .bg-tranparent {
    background-color: transparent !important;
  }
  .v-stepper__step__step.primary {
    background: linear-gradient(103.01deg, #06b7b4 0%, #00a4e4 100%) !important;
  }
  .text-total {
    font-weight: bold;
    font-size: 26px !important;
    line-height: 32px;
    letter-spacing: 0.2px;
    color: #1b2534 !important;
  }
  .payment-paid {
    h2 {
      padding: 0;
    }
    .payment-note {
      color: #00a4e4;
    }
    .attention-payment {
      color: #f67b2b;
    }
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
  .border-bottom {
    border-bottom: 5px solid #eafafa;
    padding: 20px 0;
  }
  .t-edit-order {
    display: flex;
    justify-content: space-between;
    p {
      margin-bottom: 0;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.2px;
      color: #5d6e85;
      align-self: center;
    }
  }
  .stepper-content {
    overflow-x: hidden;
    overflow-y: auto;
    height: 294px;
    margin-right: 10px;
    margin-top: 10px;
    .top-v-stepper-step {
      display: flex;
      justify-content: space-between;
      width: 100%;
      h3 {
        float: left;
        width: 80%;
        align-self: center;
      }
      button {
        float: right;
        width: 20%;
        height: 28px !important;
        border-radius: 17px !important;
        align-self: center;
        background: transparent !important;
        span {
          font-size: 11px;
          font-style: initial !important;
        }
        &.bg-request {
          border: 1px solid #f67b2b !important;
          span {
            color: #f67b2b !important;
          }
        }
        &.bg-update.bg-update.bg-update {
          border: 1px solid #06b7b4 !important;
          background: transparent !important;
          span {
            color: #06b7b4 !important;
          }
        }
      }
    }
    .text-active {
      font-weight: 500;
      letter-spacing: 0.1px;
      color: #06b7b4;
    }
  }
  .ctop-action-package {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 0 40px;
    p {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.1px;
      color: #5d6e85;
      align-self: center;
      margin-bottom: 0;
    }
    img {
      width: 24px;
      height: 24px;
      align-self: center;
      cursor: pointer;
    }
  }
  .ctop-item-package {
    display: flex;
    justify-content: space-between;
    padding: 0 40px 10px;
    img {
      cursor: pointer;
    }
    p {
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      letter-spacing: 0.2px;
      color: #1b2534;
      align-self: center;
      margin-bottom: 0;
    }
    h2 {
      align-self: center;
      font-size: 20px;
    }
  }
  .div-first {
    padding: 0 60px;
    padding-top: 10px !important;
    padding-bottom: 20px;
    .div-first-item {
      border-top: 1px solid #ebedf0;
      padding-top: 10px;
      .text-second {
        padding: 0 20px;
      }
      h3 {
        span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #1b2534;
          display: inline-block;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }
    .row {
      margin: 0 !important;
    }
    p {
      margin-bottom: 0;
    }
  }
  .c-item-package {
    h3 {
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.2px;
      color: #354a67;
    }
    p {
      span {
        font-weight: bold;
      }
    }
  }
  .item-package.item-package {
    padding: 0 !important;
    h3 {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.1px;
    }
  }
  .address-container {
    padding: 40px;
  }
  .address {
    border: 1px solid #ebedf0;
    padding: 10px !important;
    margin: 0 10px;
    border-radius: 2px;
    p {
      align-items: center;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.1px;
      color: #5d6e85;
    }
  }
  .theme--light.stepper {
    h2 {
      background: #06b7b4;
      color: #fff;
    }
    .v-stepper__step {
      padding: 13px 10px 13px 24px;
    }
    .v-stepper__label {
      color: #1b2534;
      display: flex;
      justify-content: space-between;
      width: 100%;
      span {
        font-style: italic;
        color: #5d6e85;
      }
    }
    .v-stepper__step--active {
      .v-stepper__label {
        color: #06b7b4;
        text-shadow: none !important;
      }
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
    // .icon {
    //   background: #ebedf0;
    //   width: 60px;
    //   height: 60px;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    // }
  }
  .card-title {
    background: #06b7b4;
    color: #fff;
    font-size: 18px !important;
  }
  .card-content {
    padding: 30px 30px !important;
    max-height: 740px;
    overflow: hidden;
    .block-comment {
      max-height: 600px;
      overflow-y: auto;
      padding: 0 10px 0 0;
    }
    .card-item {
      p {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.2px;
        color: #858585;
      }
      img {
        width: 52px;
        height: 52px;
      }
      .cus-quote {
        background: #ebedf0;
        padding: 10px;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: 0.1px;
        color: #858585;
        width: calc(100% - 52px);
      }
    }
    .comment {
      position: relative;
      .v-textarea {
        textarea {
          padding-right: 50px;
          font-size: 14px;
          line-height: 22px;
          letter-spacing: 0.1px;
          color: #8692a4;
        }
      }
      .v-btn {
        width: auto;
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff !important;
        text-transform: uppercase;
      }
    }
  }
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
  .status-styles {
    border-bottom: 1px solid #06b7b4;
    padding-bottom: 10px;
    img {
      width: 18px;
      height: 18px;
    }
    span {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.1px;
      color: #1b2534;
      margin-left: 10px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .order-detail {
    padding: 5px;
    .row {
      display: block;
    }
  }
}
.order-cancel{
    background: #FFE8E8 !important;
    border: 4px solid #ED2224 !important;
    padding: 15px;
    .order-cancel-info{
    h2{
      color: #ED2224;
    font-size: 24px;
    margin-bottom: 5px !important;
    }
    a{
    div.d-flex{
      height: 25px;
    align-items: center;
    color: #ED2224;
    justify-content: flex-start;
    span{
      font-size: 14px;
    }
    img{
          margin-left: 10px;
    }
    }
    }
    }
}
</style>