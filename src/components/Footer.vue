<template>
  <div :class="isMargin ? '' : ''">
    <div class="top-line"></div>
    <div class="content-footer white--text">
      <v-container class="p-0 mt-20">
        <v-row
          class="justify-space-between align-start mt-20 m-center d-block d-md-flex"
        >
          <v-col class="info-content" cols="12" md="4">
            <a href="/" class="mb-2 info-footer">
              <v-img
                :src="require('../assets/images/common/logo-footer.png')"
                class="logo-footer"
                width="250"
            /></a>
            <p class="sub-title">
              Moving toward new goals of becoming the best supplier of goods and services for our customers when it comes to buying goods in the United States and sending goods to Vietnam
            </p>
            <router-link to="/create-label"
              ><v-btn class="btn-footer mT20" elevation="0"
                >GET STARTED CREATING LABEL
                <a>
                  <v-img
                    src="../assets/images/common/arrow-white.png"
                    class="d-none d-md-block"
                  /> </a></v-btn
            ></router-link>
          </v-col>
          <v-col class="quick-link" cols="12" md="3">
            <h3 class="mb-8 quick-link-title">Quick Links</h3>
            <ul class="pl-0">
              <li class="quick-link-content">
                <a style="font-weight: normal !important" href="/">Home</a>
              </li>
              <li class="quick-link-content">
                <a style="font-weight: normal !important" href="/about"
                  >About</a
                >
              </li>
              <li class="quick-link-content">
                <a style="font-weight: normal !important" href="/tracking"
                  >Tracking</a
                >
              </li>
              <li class="quick-link-content">
                <a style="font-weight: normal !important" href="/create-label"
                  >Create Label</a
                >
              </li>
              <li class="quick-link-content">
                <a style="font-weight: normal !important" href="/contact"
                  >Contact</a
                >
              </li>
            </ul>
          </v-col>
          <v-col class="contact-container" cols="12" md="5">
            <div class="contact">
              <v-col class="contact-icon" cols="2">
                <a>
                  <v-img src="../assets/images/common/Message.png" width="23" />
                </a>
              </v-col>

              <div class="contact-info">
                <h3>Email</h3>
                <a href="mailto:info@guihang.us">info@guihang.us</a>
              </div>
            </div>
            <div class="contact">
              <v-col class="contact-icon" cols="2">
                <a>
                  <v-img
                    src="../assets/images/common/Location.png"
                    width="18"
                  />
                </a>
              </v-col>

              <div class="contact-info">
                <h3>Address</h3>
                <a href="">2963 Seltice Way, Burley, Idaho - US </a>
              </div>
            </div>
            <div class="contact">
              <v-col class="contact-icon" cols="2">
                <a>
                  <v-img src="../assets/images/common/Calling.png" width="23" />
                </a>
              </v-col>

              <div class="contact-info">
                <h3>Call Us Now</h3>
                <a href="tel:+0(123)4567890">+0 (123) 456-7890</a>
              </div>
            </div>
          </v-col>
          
        </v-row>
        <div class="bottom-footer">
          <v-row>
            <v-col cols="12" sm="6"
              ><a href="#" class="mr-2">Terms and conditions</a>|<a
                href="#"
                class="ml-2"
                >Privacy policy</a
              ></v-col
            >
            <v-col class="text-right" cols="12" sm="6"
              ><p>© 2021 Guihang.us. All rights reserved</p></v-col
            >
          </v-row>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    isMargin: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    pointer:
      "https://www.google.com/maps/place/11210+Bellaire+Blvd,+Houston,+TX+77072,+Hoa+Kỳ/@29.7045577,-95.5760043,17z/data=!4m2!3m1!1s0x8640dd3b6efd39c7:0x553693326ae4c926?hl=vi-VN",
  }),
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 1140px;
  @media screen and (max-width: 1024px) {
    max-width: 840px;
  }
  @media screen and (max-width: 768px) {
    max-width: 640px;
  }
  @media screen and (max-width: 425px) {
    max-width: 380px;
  }
}
.top-line {
  height: 30px;
  background: #1b2534;
}

.content-footer {
  background: #ebedf0;
  // background: #1b2534;
  padding: 40px 0 0 0;
  ul {
    padding-left: 0;
    li {
      margin-bottom: 5px;
      list-style: none;
      a {
        color: #5d6e85 !important;

        background: url("../assets/images/common/arrow-right.png") no-repeat 3px;
        padding-left: 20px;
        font-weight: 400;
      }
    }
  }
}
.m-center {
  @media screen and (max-width: 1024px) {
    margin-left: 10px;
  }
}
.info-content {
  width: 371px;
  padding-top: 0px;
  padding-bottom: 40px;
  margin-bottom: 10px;

  .sub-title {
    margin-top: 15px;
    font-family: Roboto;
    font-style: normal;
    // font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.1px;
    margin-bottom: 0;
    color: #1b2534;
    @media screen and (max-width: 768px) {
      text-align: center;
    }
  }
}

.pcustom {
  width: max-content;
  margin-top: 20px;

  @media screen and (max-width: 1024px) {
    margin-top: 2px !important;

    width: auto;
  }
  @media screen and (max-width: 525px) {
    width: auto;
  }
}
.info-footer {
  padding: 5px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1080px) {
    margin-top: 20px;
    // margin-left: 35px;
  }
  @media screen and (max-width: 768px) {
    align-items: center;
  }
  @media screen and (max-width: 480px) {
    margin-top: 20px;
    // margin-left: 20px;
  }

  @media screen and (max-width: 375px) {
    margin-top: 15px;
    padding-left: 0px;
  }
}
.btn-footer {
  background: #06b7b4 !important;
  color: white !important;
  width: 300px;
  height: 50px;
  margin-top: 30px;
  a {
    padding-left: 20px;
  }
  @media screen and (max-width: 1080px) {
    font-size: 10px;
  }
  @media screen and (max-width: 768px) {
    display: block;
    margin: 0 auto;
  }
  @media screen and (max-width: 425px) {
    font-size: 11px;
  }
  @media screen and (max-width: 375px) {
    font-size: 10px;
    height: 40px;
  }
}
.contact-container {
  display: flex;
  flex-direction: column;
  padding-left: 60px;
  @media screen and (max-width: 425px) {
    padding-left: 0px;
  }
  .contact {
    display: flex;
    margin-bottom: 30px;
  }
  .contact-info {
    a {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.1px;
      color: #5d6e85;

      text-decoration: none !important;
    }
  }
}
.email-text {
  font-size: 16px;
  font-weight: normal;
  color: black !important;
  margin-bottom: 5px !important;
  @media screen and (max-width: 1080px) {
    font-size: 14px;
  }
  @media screen and (max-width: 425px) {
    font-size: 12px;
  }
  @media screen and (max-width: 375px) {
    font-size: 10px;
  }
}
.address-footer {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.2px;
  color: #05070a !important;
  margin-top: 30px;
  width: max-content;
  margin-top: 10px;
  @media screen and (max-width: 1180px) {
    font-size: 16px;
  }
  @media screen and (max-width: 1080px) {
    font-size: 14px;
  }
  @media screen and (max-width: 425px) {
    font-size: 12px;
  }
  @media screen and (max-width: 375px) {
    font-size: 10px;
  }
}
.quick-link {
  padding-left: 40px;
  @media screen and (max-width: 860px) {
    padding-left: 80px !important;
  }
  @media screen and (max-width: 768px) {
    padding-left: 70px !important;
  }

  @media screen and (max-width: 425px) {
    padding-left: 10px !important;
    margin-bottom: 20px !important;
  }
}
.quick-link-title {
  font-family: Roboto;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color: #1b2534;
  margin-bottom: 15px !important;

  @media screen and (max-width: 860px) {
    font-size: 16px;
  }
  @media screen and (max-width: 570px) {
    font-size: 15px;
  }
  @media screen and (max-width: 375px) {
    font-size: 12px;
  }
  @media screen and (max-width: 325px) {
    font-size: 11px;
  }
}
.quick-link-content {
  margin-bottom: 10px !important;

  a {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */
    margin-right: 15px;
    letter-spacing: 0.1px;

    /* Guihang.us/Brand/3 */

    @media screen and (max-width: 860px) {
      font-size: 14px;
    }
    @media screen and (max-width: 570px) {
      font-size: 13px;
    }
    @media screen and (max-width: 375px) {
      font-size: 11px;
    }
    @media screen and (max-width: 335px) {
      font-size: 9px;
    }
  }
}
.bottom-footer {
  padding: 30px 0 0 0;
  border-top: 1px solid #8692a4;
  a,
  p {
    font-size: 12px;
    color: #696a6c;
    @media screen and (max-width: 600px) {
      text-align: center !important;
    }
  }
  @media screen and (max-width: 600px) {
    text-align: center !important;
  }
}

@media only screen and (max-width: 768px) {
  .info-content {
    width: 100%;
  }
  .quick-link {
    padding-left: 30px;
    margin-top: 10px;
  }
}
</style>
