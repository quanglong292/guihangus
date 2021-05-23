<template>
  <div class="mb-12 pa-0">
    <v-container>
      <div class="center mt-40 mb-40">
        <v-img :src="logo1" width="110" class="margin-auto" />
        <p class="head-line">Customer stories</p>
        <p class="sub-headline">
          We has differentiated project logistics competitiveness based on ultra-heavy cargo transport capacity, consulting abilities, and overseas networks.
        </p>
      </div> </v-container
    ><VueSlickCarousel v-bind="settings" class="carousel-custom">
      <v-col
        class="col-pd-custom"
        v-for="(feedback, i) in listFeedbacks"
        :key="i"
      >
        <div
          class="border-gray p-10 center main-div"
          v-on:click="isHover === true"
        >
          <div class="w-full center avatar">
            <v-img
              :src="feedback.src"
              width="200"
              class="margin-auto"
            />
          </div>
          <p class="sub-header mb-0 center">{{ feedback.name }}</p>
          <div class="sub-div">
            <span class="border-bottom-blue detail center">
              {{ feedback.sub }}
            </span>
          </div>
          <p class="mt-30 fb-description hover-css">
            {{ feedback.description }}
          </p>
        </div>
      </v-col>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
const logo1 = require("../assets/logo_1.svg");
export default {
  components: { VueSlickCarousel },
  props: {
    feedbacks: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      logo1,
      isHover: false,
      settings: [
        {
          focusOnSelect: true,

          dots: true,
          infinite: true,
          speed: 600,
          slidesToShow: 3,
          initialSlide: 2,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        },
      ],
    };
  },
  computed: {
    listFeedbacks() {
      return this.$props.feedbacks;
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.mt-40{
  margin-top: 40px;
}
.mb-40{
  margin-bottom: 40px;
}
.slick-dots {
  padding: 0 !important;
}
.carousel-custom {
  max-width: 1160px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 768px) {
    width: 300px;
  }
  @media screen and (max-width: 320px) {
    width: 220px;
  }
}
.main-div {
  display: flex;
  flex-direction: column;
  margin-top: 80px;
}
.img-custom {
  @media screen and (max-width: 1024px) {
    width: 180px !important;
  }
  @media screen and (max-width: 375px) {
    width: 160px !important;
  }
}
.sub-div {
  text-align: center;
}
.sub-headline {
  font-size: 24px;
  line-height: 28px;
  color: #33424f;
  width: 85%;
  margin: 0 auto 50px;
}
.border-gray {
  border: 1px solid #ebedf0;
  height: 350px;
  @media screen and (max-width: 1120px) {
    height: 360px;
  }
}
.mx-50 {
  margin: 0 100px;
}
.sub-header {
  font-size: 26px;
  font-weight: 700;
  margin-top: 15px;
}
.hover-css {
  :hover {
    text-align: left !important;
  }
}
.price {
  color: #06b7b4;
  font-size: 32px;
  font-weight: 900;
}
.border-bottom-blue {
  border-bottom: 4px solid #06b7b4;
}
.detail {
  font-size: 14px;
}
.fb-description {
  @media screen and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
}
.avatar {
  margin-top: -100px;
  .theme--light.v-image{
   border-radius: 100%; 
  }
  .v-image{
    border-radius: 100%;
  }
}
</style>
