<template>
  <div class="main-cutoms">
    <!-- Header -->
    <div v-if="!loading">
      <v-progress-circular
        indeterminate
        :size="20"
        :width="3"
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-else>
      <div class="mb-30">
        <div>
          <v-row>
            <v-col cols="12" sm="4">
              <v-card>
                <div class="text-center mb-5 p-10">
                  <div class="position-relative rounded-circle avatar">
                    <div v-if="!loadingUpload">
                      <img class="rounded-circle" :src="avatar || avatar_lg" />
                      <v-file-input
                        class="file-avatar d-flex justify-center position-absolute"
                        accept="image/png, image/jpeg, image/bmp"
                        prepend-icon="mdi-camera"
                        label="Avatar"
                        v-model="avatarUpload"
                        type="file"
                        clearable
                        @change="changeAvatar()"
                      ></v-file-input>
                    </div>
                    <div v-else>
                      <v-progress-circular
                        indeterminate
                        :size="20"
                        :width="3"
                        color="primary"
                      ></v-progress-circular>
                    </div>
                  </div>
                  <div class="text-center infomation-profile">
                    <h2>{{ name }}</h2>
                    <p>{{ email }}</p>
                  </div>
                  <div class="btn-list pb-10">
                    <div v-if="userLocal.role === 'AdminRoot'">
                      <div v-if="role === 'Customer'">
                        <Button
                          label="Active to Admin"
                          color="primary"
                          :disabled="activeRole"
                          @submit:btnSubmit="activeAdmin"
                        />
                      </div>
                      <div v-if="role === 'Admin'">
                        <Button
                          label="Administration Deactive"
                          color="warning"
                          :disabled="activeRole"
                          @submit:btnSubmit="activeAdmin"
                        />
                      </div>
                    </div>
                    <Button
                      label="Reset Password"
                      class="mT30 btn-bottom"
                      color=""
                      :disabled="resetPass"
                      :progress="resetPass"
                      @submit:btnSubmit="forgotPass"
                    />
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" sm="8">
              <v-card class="mb-30 box-right-form">
                <v-form ref="form" v-model="val">
                  <div class="mb-10">
                    <div class="form-group">
                      <label class="mb-2 d-block">Full name</label>
                      <v-text-field
                        outlined
                        dense
                        hide-details="auto"
                        type="text"
                        placeholder="Full name"
                        :rules="rules.personName"
                        v-model="infoUser.fullName"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="mb-10">
                    <div class="form-group">
                      <label class="mb-2 d-block">Your Phone</label>
                      <v-text-field
                        hide-details="auto"
                        outlined
                        dense
                        chips
                        small-chips
                        type="text"
                        placeholder="123-456-789"
                        v-mask="'###-###-#####'"
                        :rules="rules.phone"
                        v-model="infoUser.phone"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="mb-10">
                    <div class="form-group">
                      <label class="mb-2 d-block">Email</label>
                      <v-text-field
                        hide-details="auto"
                        outlined
                        type="text"
                        disabled
                        placeholder="Your Email"
                        :rules="rules.email"
                        v-model="infoUser.email"
                      ></v-text-field>
                    </div>
                  </div>
                </v-form>
                <div class="bottom-btn">
                  <Button
                    label="Save change"
                    class="btn-grey"
                    color="mt-16"
                    :disabled="disabledBtn || !val"
                    :progress="disabledBtn"
                    @submit:btnSubmit="updateUserInfo"
                  />
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
      <OrdersList :userId="id" orderStyles="no-padding" />
    </div>
    <Toast :toast="toast" />
  </div>
</template>

<script>
import Vue from "vue";
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);

import { uploadAvatarById, updateUsersRole, uploadUserById } from "@store/user";
import Toast from "@component/Toast";
import Button from "@component/shares/Button";

import OrdersList from "./../share/OrdersList";

import { getUserById, forgotPwd } from "@store/user";

import _ from "lodash";

const avatar_lg = require("../../assets/images/common/customer/avatar_lg.png");
export default {
  name: "UserDetail",
  components: {
    Toast,
    Button,
    OrdersList
  },
  data: () => ({
    avatar_lg,
    id: null,
    loading: false,
    loadingUpload: false,
    disabledBtn: false,
    resetPass: false,
    activeRole: false,
    val: false,
    avatar: null,
    avatarUpload: null,
    role: null,
    email: null,
    name: null,
    userLocal: null,
    headerTable: [
      "Created Date",
      "Order ID",
      "From",
      "Reciever",
      "Status",
      "Action"
    ],
    orderList: [
      {
        created: "14/01/2019",
        orderId: "12345678",
        from: "Risus, RI, 17849",
        reciever: "Interdum Cursus, CU, 23933",
        status: "Completed"
      },
      {
        created: "14/01/2019",
        orderId: "12345677",
        from: "Risus, RI, 17849",
        reciever: "Interdum Cursus, CU, 23933",
        status: "Failed"
      },
      {
        created: "14/01/2019",
        orderId: "12345676",
        from: "Risus, RI, 17849",
        reciever: "Interdum Cursus, CU, 23933",
        status: "In Progress"
      },
      {
        created: "14/01/2019",
        orderId: "12345675",
        from: "Risus, RI, 17849",
        reciever: "Interdum Cursus, CU, 23933",
        status: "Completed"
      }
    ],
    rules: {
      personName: [value => !!value || "Full name field is required"],
      email: [
        value => !!value || "Email field is required",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "The email address entered is invalid";
        }
      ],
      phone: [
        value => !!value || "Phone field is required",
        value =>
          (value || "").length >= 10 ||
          "The phone number has minimum 10 characters",
        value => {
          const pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
          return pattern.test(value) || "The phone number entered is invalid";
        }
      ]
    },
    infoUser: {
      avatar: "",
      email: "",
      fullName: "",
      phone: "",
      _id: ""
    },
    toast: {
      color: "",
      content: "",
      open: false
    }
  }),
  created() {
    const dataRoute = this.$route;
    this.id = dataRoute?.params?.id;
    this.userLocal = JSON.parse(localStorage.getItem("user"))
    if (!this.id || !this.userLocal) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push({ path: "/login" });
    }
    this.getUserDatail();
  },
  computed: {},
  methods: {
    changeContentTabs(str) {
      this.contentTab = str;
    },
    displayStatus(status) {
      switch (status) {
        case "Completed":
          return "cSuccess";
        case "In Progress":
          return "cError";
        case "Failed":
          return "cInprogress";
        default:
          break;
      }
    },
    async changeAvatar() {
      this.renderComponent = false;
      this.loadingUpload = true;
      this.toast.open = false;
      let formData = new FormData();
      formData.append("file", this.avatarUpload);
      const result = await uploadAvatarById(this.id, formData);
      let infoToast = {
        color: "success",
        content: "Avatar has uploaded successfully!",
        open: true
      };
      if (result.statusCode === 201) {
        const reader = new FileReader();
        reader.onload = e => {
          this.avatar = e.target.result;
        };
        reader.readAsDataURL(this.avatarUpload);
      } else {
        infoToast.color = "warning";
        infoToast.content = "Avatar upload failed!";
      }
      this.toast = infoToast;
      this.loadingUpload = false;
    },
    async getUserDatail() {
      const result = await getUserById(this.id);
      if (result.statusCode === 200) {
        const info = _.pick(result?.data, [
          "_id",
          "phone",
          "avatar",
          "email",
          "fullName",
          "role"
        ]);
        this.avatar = info.avatar;
        this.email = info.email;
        this.name = info.fullName;
        this.role = info.role;
        this.infoUser = info;
      }
      this.loading = true;
    },
    // please check your mailbox. we've sent you an email with a link to reset your password
    async forgotPass() {
      this.toast.open = false;
      this.resetPass = true;
      let infoToast = {
        color: "warning",
        content:
          "We can't find your email address. Please create new account with this email!",
        open: true
      };
      const result = await forgotPwd(this.infoUser.email);
      if (result.statusCode == 200) {
        infoToast.color = "success";
        infoToast.content =
          "please check your mailbox. we've sent you an email with a link to reset your password!";
      }
      this.resetPass = false;
      this.toast = infoToast;
    },
    async activeAdmin() {
      this.activeRole = true;
      this.toast.open = false;
      const result = await updateUsersRole(this.id);
      let infoToast = {
        color: "success",
        content: "Changed role successful!",
        open: true
      };
      if (result.statusCode === 200) {
        const info = _.pick(result?.data, [
          "_id",
          "phone",
          "avatar",
          "email",
          "fullName",
          "role"
        ]);
        this.role = info.role;
      } else {
        infoToast.color = "warning";
        infoToast.content = "Change role failed!";
      }
      this.activeRole = false;
      this.toast = infoToast;
    },
    async updateUserInfo() {
      this.disabledBtn = true;
      this.toast.open = false;
      const dataUpdate = _.pick(this.infoUser, ["phone", "fullName"]);
      let infoToast = {
        color: "success",
        content: "Updated infomation successful!",
        open: true
      };
      const result = await uploadUserById(this.id, dataUpdate);
      if (result.statusCode === 200) {
        const info = _.pick(result?.data, [
          "_id",
          "phone",
          "avatar",
          "email",
          "fullName",
          "role"
        ]);
        this.name = info.fullName;
        this.email = info.email;
      } else {
        infoToast.color = "warning";
        infoToast.content = "Update infomation failed!";
      }
      this.disabledBtn = false;
      this.toast = infoToast;
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .bottom-btn {
    display: flex;
    justify-content: flex-end;
    button {
      margin-top: 0 !important;
      height: 40px !important;
    }
  }
  .box-right-form {
    padding: 50px;
  }
  .position-relative {
    position: relative;
  }
  .position-absolute {
    position: absolute;
  }
  .btn-grey {
    text-transform: initial !important;
    color: #9b9c9d !important;
  }
  .avatar {
    padding-top: 50px;
    img {
      height: 182px;
      width: 182px;
    }
    .file-avatar {
      transition: all 0.3s;
      opacity: 0;
      background: white;
      bottom: 0;
      left: 0;
      right: 0;
      .v-input__icon {
        padding-bottom: 15px;
      }
      .v-input__prepend-outer {
        margin-right: 0 !important;
      }
      .v-input__control {
        display: none;
      }
    }
    &:hover {
      .file-avatar {
        opacity: 0.7;
      }
    }
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
.icon-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  p {
    margin-bottom: 0;
    font-size: 18px;
  }
}
.title-table {
  background: #eafafa;
  .icon-bar {
    align-items: center;
    padding: 20px;
  }
}
.btn-list {
  margin-top: 50px;
  text-align: center;
  padding-bottom: 25px !important;
  .v-btn {
    display: block !important;
    width: 100%;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.1px;
    text-transform: initial !important;
  }
  .btn-bottom {
    background: #ebedf0;
    color: #354a67 !important;
  }
}
.btn-find {
  background: #06b7b4;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
}
.list {
  background: #fff;
}
.infomation-profile {
  h2 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.1px;
    color: #5d6e85;
  }
  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #5d6e85;
  }
}
.title-name {
  font-size: 18px;
  font-weight: 500;
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
.count-total {
  background: url("../../assets/images/overview/total.png") no-repeat 0 0;
  background-size: 100%;
  width: 126px;
  height: 100px;
  display: flex;
  align-items: center;
}
.label-total {
  align-items: center;
  text-align: center;
  font-size: 18px;
  color: #5d6e85;
  font-weight: 700;
  text-align: left;
}

.action {
  .actions {
    display: none;
  }
  &:hover {
    .show-icon {
      display: none;
    }
    .actions {
      display: flex;
      align-items: center;
      align-content: center;
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
  }
}
</style>