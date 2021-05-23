<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    pageTitle: function() {
      return "GuiHang.US - Send love to VietNam";
    }
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
html {
  scroll-behavior: smooth;
}
body {
  color: #354a67;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #5d6e85;
}
a {
  text-decoration: none;
  font-weight: bold;
}
a:hover {
  text-decoration: underline;
}
.no-padding.no-padding.no-padding {
  padding: 0 !important;
}
.p30 {
  padding: 30px !important;
}
.pBT40 {
  padding-bottom: 40px !important;
}
.mBT0.mBT0.mBT0 {
  margin-bottom: 0 !important;
}
.mBT20 {
  margin-bottom: 20px !important;
}
.mT0.mT0.mT0 {
  margin-top: 0 !important;
}
.mT20 {
  margin-top: 20px !important;
}
.mT30 {
  margin-top: 30px !important;
}
.mL20 {
  margin-left: 20px !important;
}
.mL0 {
  margin-left: 0 !important;
}
.mR0{
  margin-right: 0 !important;
} 
.mR20 {
  margin-right: 20px !important;
}
.mR30{
  margin-right: 30px !important;
}
.cursor-pointer {
  cursor: pointer;
}
.no-margin {
  margin: 0 !important;
}
.h-full {
  height: 100%;
}
.w-auto {
  width: auto !important;
}
.bg-red {
  background: #f47a7c !important;
}
.bg-white {
  background: #fff;
}
.border-blue {
  border: 2px solid #eafafa !important;
}
.box-shadow-default {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
}
.box-shadow-none {
  box-shadow: none !important;
}
.font-size18 {
  font-size: 18px !important;
}
.font-bold {
  font-weight: bold;
}
.btn-pending {
  background: #f67b2b;
  border-radius: 59px;
  height: 30px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.1px;
  color: #ffffff;
  margin-bottom: 0 !important;
  padding: 6px;
  max-width: 100px;
  margin: 0 auto;
}
.btn-cance {
  background: #700002;
  border-radius: 59px;
  height: 30px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.1px;
  color: #ffffff;
  margin-bottom: 0 !important;
  padding: 6px;
  max-width: 100px;
  margin: 0 auto;
}
.btn-decline {
  background: #ed2224;
  border-radius: 59px;
  height: 30px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.1px;
  color: #ffffff;
  margin-bottom: 0 !important;
  padding: 6px;
  max-width: 100px;
  margin: 0 auto;
}
.btn-completed {
  background: #06b7b4;
  border-radius: 59px;
  height: 30px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.1px;
  color: #ffffff;
  margin-bottom: 0 !important;
  padding: 6px;
  max-width: 100px;
  margin: 0 auto;
}
.btn-primary.v-btn.v-btn--has-bg {
  background: linear-gradient(103.01deg, #06b7b4 0%, #00a4e4 100%);
  color: #fff;
  padding: 0 40px;
  text-transform: capitalize;
  width: 100%;
}
.v-btn.v-btn.v-btn.v-btn.v-btn {
  box-shadow: none !important;
  height: 40px !important;
  font-size: 14px !important;
  line-height: 18px;
  text-align: center;
  font-weight: bold;
}
.btn-grey.btn-grey {
  background: #ebedf0 !important;
  letter-spacing: 0.2px;
  color: #354a67 !important;
}
.v-input__slot.v-input__slot {
  min-height: 40px !important;
}
.form-login.form-login.form-login.form-login{
  .v-input__slot{
    min-height: inherit !important;
  }
}
label {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: #354a67;
}
.place-page {
  ::-webkit-scrollbar {
    height: 2px;
    background: #ebedf0;
  }
  ::-webkit-scrollbar-thumb:horizontal {
    background: #06b7b4;
    border-radius: 10px;
  }
}
.bg-color.bg-color.bg-color {
  background: linear-gradient(103.01deg, #06b7b4 0%, #00a4e4 100%) !important;
}
.text-accept {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: #354a67 !important;
  margin-bottom: 0 !important;
}
.name-title {
  padding: 0 !important;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #1b2534;
}
.order-detail, .shipper-page {
  /* width */
  ::-webkit-scrollbar {
    width: 2px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ebedf0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #06b7b4;
    background-clip: padding-box;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #06b7b4;
  }
}
.text-blue-dark.text-blue-dark.text-blue-dark {
  color: #5d6e85 !important;
  border: 1px solid #06b7b4 !important;
}
.search-bar {
  display: none !important;
  height: 36px;
  input{
    color: #5d6e85 !important;
    font-size: 15px !important;
  }
}
.block-search {
  display: none;
  .v-input__slot {
    border: 1px solid #06b7b4 !important;
  }
  fieldset {
    border-color: transparent !important;
  }
}

.font-italic {
  font-style: italic;
}
.v-sheet.v-card {
  // box-shadow: none !important;
  // border: 2px solid #eafafa !important;
}
.main-cutoms {
  padding: 40px;
  background: #f7f7f7;
  // border-left: 2px solid #eafafa;
}
.check-success {
  color: #06b7b4 !important;
  svg {
    path {
      stroke: #06b7b4;
    }
  }
}
.check-error {
  color: #ed2224 !important;
  svg {
    path {
      stroke: #ed2224;
    }
  }
}
.ico-back {
  position: absolute;
  top: 40px;
  left: -30px;
  cursor: pointer;
}

// breadcrumns
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

// custom icon
.v-icon__component {
  width: auto !important;
  height: auto !important;
}

// pannel
.panels {
  border: 2px solid #eafafa;
  box-shadow: none;
  .panel {
    border-radius: 0;
  }
  .header-pannel {
    border-bottom: 1px solid #eafafa;
    border-radius: 0;
    color: #5d6e85;
    font-weight: 700;
    padding: 20px;
  }
  .content-panel {
    border-radius: 0;
    padding-top: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eafafa;
  }
}

.text-primary {
  color: #06b7b4;
}

.text-danger {
  color: red;
}

.text-green {
  color: green;
}

// status
.cSuccess {
  background: #06b7b4;
  color: #fff;
}
.cError {
  background: #ed2224;
  color: #fff;
}
.cInprogress {
  background: #f67b2b;
  color: #fff;
}

// padding dot off carousel Feedback
.v-application ul {
  padding-left: 12px !important;
}
.create-label-page {
  p {
    color: #5d6e85;
  }
}
.text-total-list {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: #5d6e85;
}
.list-order-tabs.list-order-tabs.list-order-tabs {
  padding: 0 !important;
  .icon-bar {
    padding: 10px 20px;
    cursor: pointer;
    border-bottom: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(
      103.01deg,
      transparent 0%,
      transparent 100%
    );
    width: 10%;
    &.tab-left {
      width: 90% !important;
    }
    &.active {
      border-image-source: linear-gradient(
        103.01deg,
        #06b7b4 0%,
        #00a4e4 100%
      ) !important;
    }
    &:hover {
      border-image-source: linear-gradient(103.01deg, #06b7b4 0%, #00a4e4 100%);
    }
  }
}
.list {
  .name-title {
    padding: 15px 0 !important;
    p {
      margin-bottom: 0;
    }
  }
}
.list-order {
  border-radius: 0 0 6px 6px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
  h2 {
    font-size: 16px;
    font-weight: normal;
    color: #06b7b4 !important;
  }
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
.order-dialog {
  .header-dialog {
    padding: 30px;
    text-align: center;
    .h-top-dialog {
      display: flex;
      justify-content: space-between;
      p {
        cursor: pointer;
      }
    }
    p {
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #5d6e85;
    }
    h2 {
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #354a67;
      margin-bottom: 30px;
    }
  }
  .body-dialog {
    border: 1px dashed #d7dbe1;
    width: 300px;
    margin: 0 auto;
    text-align: center;
    padding: 10px;
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.1px;
      color: #1b2534;
      text-align: left;
      margin-bottom: 0;
    }
  }
  .footer-dialog {
    width: 300px;
    margin: 0 auto;
    text-align: center;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .v-btn {
      margin-bottom: 70px;
      width: calc(50% - 10px);
      &.btn-confirm {
        margin-right: 10px;
        background: linear-gradient(
          103.01deg,
          #06b7b4 0%,
          #00a4e4 100%
        ) !important;
        span {
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          letter-spacing: 0.2px;
          color: #ffffff;
        }
      }
      &.btn-cancel {
        background: #ebedf0 !important;
        span {
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          letter-spacing: 0.2px;
          color: #354a67;
        }
      }
    }
  }
}
// Modal Remove
.modal-remove {
  text-align: center;
  .footer-dialog {
    padding-bottom: 50px;
    .btn-confirm {
      text-transform: initial !important;
      min-width: 160px !important;
      background: linear-gradient(
        103.01deg,
        #06b7b4 0%,
        #00a4e4 100%
      ) !important;
      span {
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        letter-spacing: 0.2px;
        color: #ffffff;
      }
    }
  }
  .header-dialog {
    padding: 20px;
    h2 {
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #354a67;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    p {
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #5d6e85;
    }
    .h-top-dialog {
      display: flex;
      justify-content: space-between;
      p {
        cursor: pointer;
      }
    }
  }
}
.v-menu__content {
  box-shadow: 0px 20px 30px rgba(167, 209, 233, 0.45) !important;
  /* width */
  ::-webkit-scrollbar {
    width: 2px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ebedf0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #06b7b4;
    background-clip: padding-box;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #06b7b4;
  }
}
.dropdown-notification {
  background: #fff !important;
  width: 410px !important;
  padding-bottom: 30px !important;
  max-height: 600px;
  overflow-y: auto;
  .item-notification {
    padding: 20px 30px 0;
    border-bottom: 1px solid #f1f1f1;
    h4 {
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      // letter-spacing: 0.2px;
      color: #5d6e85;
      span {
        // background: #06b7b4 !important;
        // width: 5px;
        // height: 5px;
        // margin-right: 5px;
        // border-radius: 0 !important;
        // padding: 0 !important;
        display: none;
      }
    }
    &.item-notification:first-child {
      padding-top: 30px !important;
    }
    .top-item {
      span {
        font-size: 9px;
      }
    }
    p {
      font-size: 13px;
      line-height: 16px;
      // letter-spacing: 0.2px;
      color: #1b2534;
      margin-top: 12px;
      margin-bottom: 0;
      margin-right: 20px;
      // white-space: normal;
    }
  }
}
.rounded-circle {
  cursor: pointer;
}
.justify-content-between {
  justify-content: space-between !important;
}
.total-list {
  position: relative;
  margin-right: 10px;
  p.count {
    position: absolute;
    top: -6px;
    right: 0;
    border-radius: 50%;
    background: #06b7b4;
    font-size: 8px !important;
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
.user-page {
  .v-input--selection-controls {
    margin-top: 0;
    align-self: center;
    padding-top: 0px;
    .v-messages {
      display: none !important;
    }
    .v-input__slot {
      margin-bottom: 0 !important;
    }
  }
}
.v-menu-side {
  padding: 0px 0px 0px 220px !important;
}
.input-complete {
  .v-label {
    top: 10px !important;
  }
}
.v-input--checkbox.v-input--checkbox{
  .v-input__slot{
    min-height: 24px !important;
  }
}

@media only screen and (max-width: 1028px) {
  .v-menu-side.v-menu-side.v-menu-side {
    padding: 0px !important;
  }
}
</style>
