<template>
  <v-layout>
    <v-main>
      <v-row no-gutters>
        <v-col class="col-3">
          <Sidebar />
        </v-col>
        <v-col class="col-9">
          <Header />
          <div class="main-cutoms">
            <!-- Header -->
            <v-row>
              <v-col class="col-8">
                <v-card class="p-10">
                  <div class="label-head mb-30">Profile</div>
                  <div class="content-center">
                    <ProfileComponent />
                  </div>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="p-10 mb-10">
                  <div class="label-head mb-30">Password</div>
                  <div class="mb-10 relative content-center">
                    <label class="d-block mb-0 mb-2 label"
                      >Current Password</label
                    >
                    <v-text-field
                      :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                      hide-details="auto"
                      color="primary"
                      dense
                      chips
                      small-chips
                      outlined
                      :type="showPwd ? 'text' : 'password'"
                      placeholder="Enter your password"
                      @click:append="showPwd = !showPwd"
                    >
                    </v-text-field>
                  </div>
                  <div
                    class="justify-end"
                    style="display: flex; padding-bottom: 20px"
                  >
                    <v-btn>Reset Password</v-btn>
                  </div>
                </v-card>
                <v-card>
                  <div class="content-center p-10 api">
                    <p class="mr-5">API</p>
                    <div class="bg-api">
                      <span>brlo3cKPe3MvIPOkUBNa</span>
                    </div>
                    <div class="icon-copy">
                      <v-img
                        :src="
                          require('../../assets/images/common/customer/icon-copy.svg')
                        "
                        width="20"
                      />
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
</template>

<script>
import Header from "@component/shares/Header";
import Sidebar from "../../components/customer/Sidebar.vue";
import ProfileComponent from "@component/customer/ProfileComponent";
export default {
  name: "AcountDetail",
  components: {
    Header,
    Sidebar,
    ProfileComponent,
  },
  data: () => ({
    showPwd: false,
  }),
};
</script>

<style lang="scss" scoped>
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
.label {
  font-weight: 500;
  font-size: 16px;
}
.label-head {
  font-weight: 700;
  font-size: 18px;
  padding: 20px;
}
.content-center {
  width: 85%;
  margin: auto;
}
.bg-api {
  background: #fff;
  padding: 15px;
  border: 1px solid #ebedf0;
}
.api {
  display: flex;
  align-items: center;
  align-content: center;
  p {
    margin: 0;
  }
}
.icon-copy {
  background: #ebedf0;
  border: 1px solid #ebedf0;
  box-sizing: border-box;
  padding: 14px;
}
</style>