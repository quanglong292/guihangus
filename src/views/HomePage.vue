<template>
  <v-main>
    <TopBar />

    <Banner :infoBanner="infoBanner" />

    <v-container class="mw-1140">
      <div class="center mt-100">
        <v-img
          :src="require('../assets/logo_1.svg')"
          width="100"
          class="margin-auto"
        />
        <p class="head-line">US to VN Logistics Solutions</p>
        <p class="sub-head-line">
          Moving toward new goals of becoming the best supplier of goods and
          services for our customers when it comes to buying goods in the United
          States and sending goods to Vietnam
        </p>
      </div>
    </v-container>
    <v-container class="p-0"
      ><v-row
        class="justify-space-between info-section align-start mb-30 mx-50 mw-ml-mr"
      >
        <v-col class="col-lg-6 col-12 col-md-6">
          <p class="info-section-content">
            GuiHang.US invest time and expertise to fully understand your
            business before designing plans to improve your supply chain. We
            take responsibility for the performance of all our suppliers and for
            ensuring the availability of resources and equipment needed to
            control the flow of goods under our charge.
          </p>
          <p class="mt-30 info-section-content">
            Optimizing logistics chain from A to Z to increase your business
            competitiveness. Every aspect of each solution is leveraged from our
            footprint characterized by its extensive geographical coverage and
            adaptability to meet specific warehouse management purposes and
            legal requirements
          </p>
          <v-img
            :src="require('../assets/images/home/pic1.jpg')"
            class="mt-30 image-3-custom"
          />
        </v-col>
        <v-col class="col-lg-6 col-12 col-md-6">
          <v-img
            class="image-1-custom"
            :src="require('../assets/images/home/pic2.jpg')"
            width="100%"
          />
          <v-img
            :src="require('../assets/images/home/pic4.jpg')"
            height="408"
            class="mt-30 image-2-custom"
          />
        </v-col> </v-row
    ></v-container>
    <div id="videoOverlay">
      <v-container
        ><div class="home-video ml-mr-auto mw-1440">
          <div class="video-play">
            <v-img
              class="video-play video-play-btn"
              src="../assets/images/home/play.png"
              @click="show = true"
            ></v-img>
            <div class="video-text">Our Company Introduce</div>
          </div>

          <v-overlay
            style="display: flex, flex-direction: column"
            :value="show"
          >
            <v-btn elevation="0" class="hide-video-btn" @click="show = false"
              >x</v-btn
            >
            <iframe
              class="video"
              src="https://www.youtube.com/embed/YfDFKgGNP6s"
              title="Shipping"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </v-overlay></div
      ></v-container>
    </div>

    <v-container><Process /></v-container>
    <div class="main-content mt-30 p-10 pb-50">
      <PriceList :prices="listData" />
    </div>

    <v-container class="px-0"><Feedback :feedbacks="feedbacks" /></v-container>
    <Footer />
  </v-main>
</template>

<script>
import TopBar from "../components/TopBar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Feedback from "../components/Feedback";
import PriceList from "../components/PriceList";
import Process from "../components/Process";
const imgBtnPlay = "../assets/images/home/play.png";
const imgBannerLabel = require("../assets/images/banner/pic5.jpg");
const image1 = require("../assets/images/home/1.jpg");
const image2 = require("../assets/images/home/2.jpg");
const image3 = require("../assets/images/home/3.jpg");
const image4 = require("../assets/images/home/4.jpg");
const image5 = require("../assets/images/home/5.jpg");

export default {
  name: "HomePage",
  components: { TopBar, Footer, Banner, Feedback, PriceList, Process },
  data: () => ({
    imgBtnPlay,
    show: false,
    infoBanner: {
      img: imgBannerLabel,
      isHomepage: true,
      title1: "Send packages from",
      title2: "U.S. to Viet Nam from $4.98",
      unit: "ex GST.",
      content:
        "Send packages door to door for low flat-rates, across U.S to Vietnam"
    },
    listData: [
      {
        id: 1,
        col1: "All States of the U.S",
        col2: "Sai Gon - Viet Nam",
        col3: "$2.95/lb"
      },
      {
        id: 2,
        col1: "All States of the U.S",
        col2: "Outside Sai Gon - Viet Nam",
        col3: "$3.95/lb"
      },
      {
        id: 3,
        col1: "All States of the U.S",
        col2: "All States of the U.S",
        col3: "$3.5"
      }
    ],
    feedbacks: [
      {
        id: 1,
        src: image1,
        name: "Angela Henderson",
        sub: "Fresno - California",
        description:
          "“You made every effort to find an option to have the freight in US Monday morning 6/12 and followed through all weekend to keep us updated with the progress.”"
      },
      {
        id: 2,
        src: image2,
        name: "Lauren R Milone",
        sub: "Troy - Michigan",
        description:
          "My shipment was picked up and delivered with excellent service! Needless to say I am extremely satisfied with the results. Will definitely use this service again."
      },
      {
        id: 3,
        src: image3,
        name: "Mary M Otto",
        sub: "Merrimac - Massachusetts",
        description:
          "Dear GHUS, We would like to thank you for an amazing effort and great support. Your professionalism has been super and we really appreciate your efforts."
      },
      {
        id: 4,
        src: image4,
        name: "Ross H Flickinger",
        sub: "Roselle - Illinois",
        description:
          "My shipment was picked up and delivered with excellent service! Needless to say I am extremely satisfied with the results. Will definitely use this service again."
      },
      {
        id: 5,
        src: image5,
        name: "Mauris Elit",
        sub: "Non ut elementum",
        description:
          "Et turpis condimentum purus et fermentum egestas molestie. Maurispurus aliquet fermentum et pellentesque mattis suspendisse quam viverra. At nunc sollicitudin."
      }
    ]
  }),
  beforeUpdate() {
    this.show === this.left && this.clickleft;
  }
};
</script>
<style lang="scss">
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
.avatar .v-image__image--cover {
  width: 200px;
  height: 200px;
  border-radius: 100%;
}
.head-line {
  font-size: 44px;
  font-weight: 900;
  color: #33424f;
  margin-top: 10px;
}
.sub-head-line {
  font-size: 24px;
  width: 80%;
  line-height: 28px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
}

.border-gray {
  border: 1px solid #ebedf0;
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
.ml-mr-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}
.mx-50 {
  margin: 0 100px;
}
.sub-header {
  font-size: 26px;
  font-weight: 700;
  margin-top: 15px;
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
.avatar {
  margin-top: -100px;
}
</style>
<style lang="scss" scoped>
#videoOverlay {
  background-color: rgba(0, 0, 0, 0.5);
  background: url("../assets/images/home/pic4.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 40px;
}
.image-2-custom {
  height: 270px !important;
}
.head-line {
  font-size: 44px;
  font-weight: 900;
  color: #33424f;
  margin-top: 10px;
  margin-bottom: 15px !important;
  @media screen and (max-width: 1024px) {
    font-size: 35px;
  }
  @media screen and (max-width: 833px) {
    font-size: 32px;
  }
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
  @media screen and (max-width: 425px) {
    font-size: 26px;
  }
  @media screen and (max-width: 350px) {
    font-size: 22px;
  }
}
.sub-head-line {
  font-size: 24px;
  width: 80%;
  line-height: 28px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  // @media screen and (max-width: 1024px) {
  //   font-size: 18px;
  //   width: 75%;
  // }
  // @media screen and (max-width: 833px) {
  //   font-size: 16px;
  // }
  // @media screen and (max-width: 768px) {
  //   font-size: 15px;
  //   width: 80%;
  //   .price-list-info .sub-head-line{
  //     width:90%;
  //   }
  // }
  // @media screen and (max-width: 425px) {
  //   font-size: 14px;
  //   width: 80%;
  // }
  // @media screen and (max-width: 350px) {
  //   font-size: 13px;
  //   width: 90%;
  // }
}

.home-video {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  height: 600px;
  @media screen and (max-width: 1024px) {
    height: 500px;
  }
  @media screen and (max-width: 768px) {
    height: 450px;
  }
  @media screen and (max-width: 425px) {
    height: 450px;
  }
}
.hide-video-btn {
  font-size: 28px !important;
  border: none;
  background: transparent !important;
  position: absolute;
  top: -40px;
  right: -54px;
  min-width: 40px;
}
.video-play {
  margin: auto;
  flex: 0 0 auto;
  cursor: pointer;
}
.video-text {
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 42px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #ffffff;
  margin-top: 20px;
  @media screen and (max-width: 1024px) {
    font-size: 28px;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
  @media screen and (max-width: 425px) {
    font-size: 16px;
  }
}
.video {
  width: 1000px !important;
  height: 560px !important;
  @media screen and (max-width: 1024px) {
    width: 760px !important;
    height: 400px !important;
  }
  @media screen and (max-width: 768px) {
    width: 600px !important;
    height: 350px !important;
  }
  @media screen and (max-width: 620px) {
    width: 550px !important;
    height: 350px !important;
  }
  @media screen and (max-width: 550px) {
    width: 400px !important;
    height: 270px !important;
  }
  @media screen and (max-width: 425px) {
    width: 280px !important;
    height: 180px !important;
  }
}
.video-play-btn {
  width: 120px;
  height: 120px;
  :hover {
    cursor: pointer;
    opacity: 80%;
  }
  @media screen and (max-width: 1024px) {
    width: 160px;
    height: 160px;
  }
  @media screen and (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
  @media screen and (max-width: 425px) {
    width: 60px;
    height: 60px;
  }
}
.info-section {
  max-width: 1140px;
  margin-left: auto !important;
  margin-right: auto !important;
  overflow: hidden;
  @media screen and (max-width: 1064px) {
    max-width: 840px;
  }
  @media screen and (max-width: 768px) {
    max-width: 640px;
  }
  @media screen and (max-width: 425px) {
    max-width: 380px;
  }
}
.mt-m60 {
  @media screen and (max-width: 820px) {
    margin-top: -100px !important;
  }
}
.info-section-left {
  padding: 0px 92px 20px 0px !important;

  @media screen and (max-width: 1140px) {
    padding: 10px 40px 20px 0px !important;
  }
  @media screen and (max-width: 1024px) {
    padding: 10px 40px 20px 0px !important;
  }
  @media screen and (max-width: 820px) {
    padding: 10px 0px 0px 0px !important;
    text-align: center;
  }
}
.info-section-right {
  margin-top: -40px;
  @media screen and (max-width: 1148px) {
    padding-top: 10px;
  }
  @media screen and (max-width: 1148px) {
    margin-top: -60px;
  }
  @media screen and (max-width: 820px) {
    margin-top: 10px;
  }
}
.info-section-content {
  //   font-family: Roboto;
  //   font-style: normal;
  //   font-weight: normal;
  //   font-size: 16px;
  //   line-height: 24px;
  //   letter-spacing: 0.1px;
  //   color: #05070a;
  //   width: 560px;
  //   margin-bottom: 20px;
  //   @media screen and (max-width: 1140px) {
  //     width: 460px;
  //   }
  //   @media screen and (max-width: 1080px) {
  //     width: 380px;
  //   }

  //   @media screen and (max-width: 975px) {
  //     width: 320px;
  //   }
  //   @media screen and (max-width: 855px) {
  //     font-size: 14px;
  //     width: 290px;
  //   }
  //   @media screen and (max-width: 820px) {
  //     font-size: 13px;
  //     width: 450px;
  //     margin-left: auto;
  //     margin-right: auto;
  //   }
  //   @media screen and (max-width: 685px) {
  //     font-size: 14px;
  //     width: 100%;
  //   }
}
// .image-1-custom {
//   width: 440px !important;
//   @media screen and (max-width: 1064px) {
//     width: 400px !important;
//   }
//   @media screen and (max-width: 1048px) {
//     width: 340px !important;
//   }
//   @media screen and (max-width: 968px) {
//     width: 300px !important;
//   }
//   @media screen and (max-width: 855px) {
//     width: 310px !important;
//     margin-left: auto;
//     margin-right: auto;
//   }
//   @media screen and (max-width: 820px) {
//     width: 450px !important;
//   }
// }
// .image-2-custom {
//   @media screen and (max-width: 1138px) {
//     width: 260px !important;
//   }
//   @media screen and (max-width: 1048px) {
//     width: 220px !important;
//   }
//   @media screen and (max-width: 855px) {
//     width: 310px !important;
//     margin-left: auto;
//     margin-right: auto;
//   }
//   @media screen and (max-width: 820px) {
//     width: 450px !important;
//   }
// }
// .image-3-custom {
//   @media screen and (max-width: 1065px) {
//     width: 350px;
//   }
//   @media screen and (max-width: 968px) {
//   }
//   @media screen and (max-width: 820px) {
//     margin-left: auto;
//     margin-right: auto;
//   }
// }
</style>
<style lang="scss" scoped>
.price-list-info {
  margin-top: 60px;
}
.main-banner {
  height: 420px;
}
</style>