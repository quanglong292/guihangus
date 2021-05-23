<template>
  <v-layout>
    <v-main class="v-menu-side" v-bind:class="{'no-padding': drawer === false}">
      <!-- <v-row no-gutters> -->
        <!-- <v-col class="col-3"> -->
          <Sidebar :drawer="drawer" />
        <!-- </v-col> -->
        <!-- <v-col class="col-9"> -->
          <Header :infoUser="infoUser" :drawer="drawer" @toggleSidebar="handleToggleSidebar"/>
          <div style="overflow-y: auto; height: calc(100vh - 80px); background: #f7f7f7;">
            <Breadcrumb/>
            <router-view />
            <Footer />
          </div>
        <!-- </v-col> -->
      <!-- </v-row> -->
    </v-main>
  </v-layout>
</template>

<script>
import Breadcrumb from "@component/shares/Breadcrumb";
import Header from "@component/shares/Header";
import Sidebar from "@component/customer/Sidebar";
import Footer from "@component/FooterCustomer";

import { getInfoUser } from "@store/user";
import _ from "lodash";

export default {
  name: 'CustomerPage',
  components: { Header, Sidebar,Breadcrumb, Footer },
  data:() =>({
    infoUser: {
      address: [],
      avatar: '',
      email: '',
      fullName: '',
      phone: '',
      _id: '',
      role: ''
    },
    drawer: true,
  }),
  created(){
    this.getInfo()
  },
  methods:{
    async getInfo(){
      const result = await getInfoUser()
      this.infoUser = _.pick(result?.data, ['address', 'avatar', 'email', 'fullName', 'phone', '_id', 'role'])
      if(this.infoUser.role !== 'Customer'){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.push({path: '/login'})
      }else localStorage.setItem('user', JSON.stringify(this.infoUser))
    },
    handleToggleSidebar () {
      this.drawer = !this.drawer
    }
  }
}
</script>