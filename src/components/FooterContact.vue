<template>
  <div class="content-footer white--text mb-0">
    <v-container class="py-12 white--text">
      <v-row class="pb-12 pl-5 pl-sm-0 justify-space-between d-block d-sm-flex">
        <v-col cols="12" sm="3" class="d-none d-sm-block">
          <a href="#" class="mb-2"> <v-img :src="logoFooter" width="190" /></a>
        </v-col>
        <v-col cols="12" sm="5">
          <div class="white--text">
            <h3 class="white--text mb-6">Contact</h3>
            <h1 class="white--text">2963 Seltice Way, Burley, Idaho - US</h1>
            <p class="mt-6 mb-1 pb-4">+0 (123) 456-7890</p>
            <p class="mb-4">info@guihang.us</p>
          </div>
        </v-col>
        <v-col cols="12" sm="2">
          <h3 class="mb-8 white--text">Quick Links</h3>
          <ul>
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Tracking</a></li>
            <li><a href="#">Create Label</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </v-col>
        <v-col cols="12" sm="2">
          <h3 class="mb-8 white--text">Actions</h3>
          <ul>
            <li><a href="#">Tracking</a></li>
            <li><a href="#">Create Label</a></li>
          </ul>
        </v-col>
      </v-row>
      <v-row class="d-block d-sm-none">
        <v-col cols="5" class="margin-auto my-5">
          <a href="#" class="mb-2"> <v-img :src="logoFooter" width="190" /></a>
        </v-col>
      </v-row>
      <div class="bottom-footer">
        <v-row>
          <v-col
            ><a href="#" class="mr-2 white--text">Terms and conditions</a>|<a
              href="#"
              class="ml-2 white--text"
              >Privacy policy</a
            ></v-col
          >
          <v-col class="text-right"
            ><p class="white--text">
              © 2021 Guihang.us. All rights reserved
            </p></v-col
          >
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
const logoFooter = require("../assets/logo.png");

export default {
  name: "FooterContact",
  props: {
    isMargin: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({ logoFooter }),
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 1140px;
}
.top-line {
  height: 30px;
  background: #1b2534;
}
.content-footer {
  background: #1b2534;
  ul {
    padding-left: 0;
    li {
      margin-bottom: 10px;
      list-style: none;
      a {
        color: #ffffff !important;
        background: url("../assets/images/common/arrow-white.png") no-repeat 3px;
        padding-left: 20px;
        font-weight: 400;
      }
    }
  }
}

.bottom-footer {
  padding: 30px 0;
  border-top: 1px solid #8692a4;
  a,
  p {
    font-size: 12px;
    color: #696a6c;
  }
}
@media only screen and (max-width: 600px) {
  .bottom-footer {
    .row {
      display: block;
      .col {
        &:first-child {
          text-align: center;
        }
      }
      .text-right {
        text-align: center !important;
      }
    }
  }
}
</style>
