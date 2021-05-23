<template>
  <v-row class="justify-space-between align-start align-stretch mw-1140" >
    <v-col cols="12" sm="6" md="4">
      <div class="border-gray h100 p-10">
        <v-img :src="require('../assets/images/home/truck.svg')" width="70" />
        <p class="sub-header">What We Do.</p>
        <p>
          From warehousing and handling to packaging and transport and distribution, our expert knowledge of each field of the logistics chain makes our offering unique.
        </p>
      </div>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <div class="border-gray h100 p-10">
        <v-img :src="require('../assets/images/home/bag.svg')" width="70" />
        <p class="sub-header">Who We Help.</p>
        <p>
          We offers integrated, single source solutions to meet the needs of every type of customer, regardless of size or location.
        </p>
      </div>
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <div class="border-gray h100 p-10">
        <v-img :src="require('../assets/images/home/pipe.svg')" width="70" />
        <p class="sub-header">Why Choose Us.</p>
        <p>
          We take responsibility for the performance of all our suppliers and for ensuring the availability of resources and equipment needed to control.
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Process",
};
</script>

<style lang="scss" scoped>
.h100{
  height: 100%;
}
.mx-165 {
  margin: 0px 165px !important;
}
.mx-165-rss {
  @media screen and (max-width: 768px) {
    margin: 0px 25px !important;
  }
}
.mw-1140 {
  max-width: 1140px !important;
}
</style>
