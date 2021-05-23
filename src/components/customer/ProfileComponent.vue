<template>
  <div class="row">
    <div class="col-lg-4 col-sm-12 col-12 col-md-4">
      <v-card class="pBT40 left-profile">
        <div class="text-center position-relative rounded-circle avatar">
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
          <h2>{{ infoUser.fullName }}</h2>
          <p>{{ infoUser.email }}</p>
        </div>
        <!-- <div class="btn-information">
          <Button label="Change Password" class="mT30 btn-bottom" color="" @submit:btnSubmit="goChangePassword()"/>
        </div> -->
      </v-card>
    </div>
    <div class="col-lg-8 col-sm-12 col-12 col-md-8">
      <v-card class="mb-30 box-right-form">
        <v-form ref="form" v-model="val">
          <div class="mb-10">
            <div class="form-group">
              <label class="mb-2 d-block">Full name</label>
              <v-text-field
                hide-details="auto"
                outlined
                dense
                chips
                small-chips
                type="text"
                placeholder="Full name"
                :rules="rules.personName"
                v-model="infoUser.fullName"
              ></v-text-field>
            </div>
          </div>
          <div class="mb-10">
            <v-row>
              <v-col cols="12" sm="6">
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
              </v-col>
              <v-col cols="12" sm="6">
                <div class="form-group">
                  <label class="mb-2 d-block">Email</label>
                  <v-text-field
                    hide-details="auto"
                    outlined
                    dense
                    chips
                    small-chips
                    disabled
                    type="text"
                    placeholder="Your Email"
                    :rules="rules.email"
                    v-model="infoUser.email"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-form>
        <div class="bottom-btn">
          <Button
            label="Save change"
            class="btn-grey"
            color="mt-16"
            :disabled="disabledBtn || !val"
            :progress="disabledBtn"
            @submit:btnSubmit="changeInfomation"
          />
        </div>
      </v-card>
    </div>
    <Toast :toast="toast" />
  </div>
</template>

<script>
import Vue from "vue";
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);
import { update, uploadAvatar } from "@store/user";
import _ from "lodash";

import Toast from "@component/Toast";
import Button from "@component/shares/Button";

const avatar_lg = require("../../assets/images/common/customer/avatar_lg.png");

export default {
  name: "ProfileComponent",
  components: { Toast, Button },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    infoUser() {
      return this.$props.info;
    }
  },
  data: () => ({
    avatar_lg,
    disabledBtn: false,
    val: false,
    loadingUpload: false,
    avatar: null,
    avatarUpload: null,
    toast: {
      content: "",
      open: false
    },
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
    }
  }),
  created() {
    this.avatar = this.infoUser?.avatar || null;
    this.role = JSON.parse(localStorage.getItem("user"))?.role;
  },
  methods: {
    async changeInfomation() {
      if (this.$refs.form.validate()) {
        this.disabledBtn = true;
        let infoToast = {
          color: "success",
          content: "You have updated info successful!",
          open: true
        };
        const data = _.pick(this.infoUser, ["fullName", "address", "avatar"]);
        const result = await update(data);
        if (result.statusCode === 200) {
          const info = _.pick(result?.data, [
            "address",
            "avatar",
            "email",
            "fullName",
            "phone",
            "_id"
          ]);
          localStorage.setItem("user", JSON.stringify(info));
        } else {
          infoToast.color = "warning";
          infoToast.content = "You have updated info fails!";
        }
        this.toast = infoToast;
        this.disabledBtn = false;
      }
    },
    async changeAvatar() {
      this.renderComponent = false;
      this.loadingUpload = true;
      this.toast.open = false;
      let formData = new FormData();
      formData.append("file", this.avatarUpload);
      const result = await uploadAvatar(formData);
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
        const info = _.pick(result?.data, [
          "address",
          "avatar",
          "email",
          "fullName",
          "phone",
          "_id"
        ]);
        localStorage.setItem("user", JSON.stringify(info));
        this.$emit("update:avatar");
      } else {
        infoToast.color = "warning";
        infoToast.content = "Avatar upload failed!";
      }
      this.toast = infoToast;
      this.loadingUpload = false;
    },
    goChangePassword(){
      this.$router.push({path: `/${this.role !== 'Customer' ? 'admin' : 'customer'}/profile/change-password`})
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep {
  .left-profile{
    height: 345px;
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
    padding: 40px 40px 0;
    img {
      height: 120px;
      width: 120px;
    }
    .file-avatar {
      transition: all 0.3s;
      opacity: 0;
      background: white;
      bottom: 5px;
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
.box-right-form {
 padding: 50px;
}
.p-40 {
  padding: 40px !important;
}
.bottom-btn {
  display: flex;
  justify-content: flex-end;
  button {
    margin-top: 0 !important;
    height: 40px !important;
  }
}
.infomation-profile {
  h2 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.1px;
    color: #5d6e85;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #5d6e85;
    margin-bottom: 0;
  }
}
.btn-information {
  text-align: center;
  .v-btn {
    font-weight: bold;
    font-size: 14px !important;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #354a67 !important;
    text-transform: inherit !important;
    width: 80%;
    height: 45px !important;
  }
}
</style>
