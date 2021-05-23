<template
  >
  <v-container class="rss">
    <div class="center price-list-info">
      <v-img
        :src="require('../assets/logo_1.svg')"
        width="100"
        class="margin-auto"
      />
      <p class="head-line center">The Best Pricing Ever</p>
      <p class="sub-head-line">
        We pride ourselves on providing the best shipping services available
        allover the world. Our skilled personnel, utilising communications,
        tracking and processing software, combined with decades of experience!
      </p>
    </div>
    <v-row class="justify-space-between align-center price-header-row">
      <v-col class="rss-col" v-for="(name, index) in headerTable" :key="name">
        <p
          :class="
            index !== 0 ? 'header-price-center header-price' : ' header-price'
          "
        >
          {{ name }}
        </p>
      </v-col>
    </v-row>
    <v-row
      class="justify-space-between price-row align-center border-gray"
      v-for="data in prices"
      :key="data.id"
    >
      <v-col class="price-data rss-col"> {{ data.col1 }} </v-col>
      <v-col class="center price-data rss-col"> {{ data.col2 }} </v-col>
      <v-col class="price center price-data rss-col"> {{ data.col3 }} </v-col>
      <v-col class="center price-data rss-col">
        <router-link to="/create-label"
          ><v-btn
            class="btn-banner v-btn v-btn--has-bg elevation-0 v-size--default"
            >Create LABEL
            <a>
              <v-img
                src="../assets/images/common/arrow-white.png"
                class="d-none d-md-block"
              /> </a></v-btn
        ></router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PriceList",
  props: {
    prices: {
      type: Array,
      require: true
    }
  },
  data: () => ({
    headerTable: ["From", "To", "Price", ""]
  })
};
</script>
<style lang="scss" scoped>
.btn-banner {
  background-color: #ff6800 !important;
  color: white;
  .v-btn__content {
    a {
      padding-left: 15px;
    }
  }
}
.rss {
  max-width: 1120px;
  @media screen and (max-width: 486px) {
    padding: 0px !important;
  }
}
.price-list-info {
  margin-bottom: 60px;
  margin-top: 60px;
  .sub-head-line {
    margin-top: -20px;
  }
}
.rss-col {
  @media screen and (max-width: 968px) {
    font-size: 14px;
  }
  @media screen and (max-width: 863px) {
    padding: 0px 8px !important;
  }
  @media screen and (max-width: 571px) {
    padding: 0px 5px !important;
  }
  @media screen and (max-width: 425px) {
    padding: 0px 3px !important;
  }
  @media screen and (max-width: 377px) {
    padding: 0px 2px !important;
  }
}
.header-price {
  border-bottom: 4px solid #06b7b4;
  width: fit-content;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 3px;
  @media screen and (max-width: 968px) {
    font-size: 14px;
  }
  @media screen and (max-width: 863px) {
    font-size: 11px;
  }
}
.header-price-center {
  margin-left: auto;
  margin-right: auto;
}
.head-line {
  font-size: 44px;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 25px;
}
.border-gray {
  border: 1px solid #ebedf0;
}
.mx-50 {
  margin: 0 100px;
}
.sub-header {
  font-size: 26px;
  font-weight: 700;
  margin-top: 15px;
}
.price-header-row {
  @media screen and (max-width: 863px) {
    margin: 0px 10px !important;
  }
  @media only screen and (max-width: 600px) {
    padding: 0 0 0 10px;
    margin: 0px 10px !important;
  }
  @media screen and (max-width: 497px) {
    margin: 0px 5px !important;
  }
  @media screen and (max-width: 425px) {
    margin: 0px 2px !important;
  }
  @media screen and (max-width: 381px) {
    margin: 0px 0px !important;
  }
}
.price {
  color: #06b7b4 !important;
  font-size: 22px !important;
  font-weight: 900;
  @media screen and (max-width: 768px) {
    font-size: 18px !important;
  }
  @media screen and (max-width: 425px) {
    font-size: 16px !important;
  }
}
.price-data {
  font-weight: bold;
  font-size: 16px;
  color: black;
}
.price-row {
  border: 1px solid #e2e2e2;
  margin-bottom: 15px;
  // height: 100px;
  @media screen and (max-width: 863px) {
    margin: 5px 10px !important;
  }
  @media only screen and (max-width: 600px) {
    padding: 0 0 0 8px;
  }
  @media screen and (max-width: 497px) {
    margin: 5px 5px !important;
  }
}
.border-bottom-blue {
  border-bottom: 4px solid #06b7b4;
}
.detail {
  font-size: 14px;
}
.avatar {
  margin-top: -100px;
}
@media screen and (max-width: 800px) {
  .price-data {
    font-size: 12px !important;
    padding-right: 0 !important;
    button {
      font-size: 9px;
      span.v-btn__content {
        a {
          display: none;
        }
      }
    }
  }
}
</style>
