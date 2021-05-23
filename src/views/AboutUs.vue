<template>
  <v-layout>
    <v-main>
      <TopBar />
      <Banner :infoBanner="infoBanner" />

      <v-container>
        <div class="center mt-100 mb-100">
          <v-img :src="logo1" width="110" class="margin-auto" />
          <p class="head-line">
            We give you control of your shipments
          </p>
          <p class="text-base about-headline">
            We invest time and expertise to fully understand your business before designing plans to improve your supply chain. We take responsibility for the performance of all our suppliers and for ensuring the availability of resources and equipment needed to control the flow of goods under our charge.
          </p>
        </div>
      </v-container>
      <div class="section-about">
        <v-container
        ><div class="w-full relative elevation-2 rounded">
          <div class="b-note absolute elevation-2 rounded pa-5 pa-md-10">
            <p class="text-white">
              We provide an independent advice and identifying the right fit for you. Services are sourced and procured based on solution specifications provided by our Supply Chain Solution.
            </p>
            <p class="mt-30 text-white">
              Our teams work around the clock, 365 days a year, to take care of any unexpected circumstances in which speed is a top priority. We offer a variety of ways to reduce transit times, coordinate and arrange immediate deliveries in the shortest time possible, ideal for both regular and single shipments.
            </p>
            <p class="mt-30 text-white">
              Tell us what you need and our specialist team will deliver it personally, taking care of all the procedures. We are committed to deliver outstanding, cutting edge IT solutions that add real value that goes beyond what is expected.
            </p>
          </div>
          <v-img :src="img1" height="500" class="margin-auto b-note-img rounded" /></div
      ></v-container>
      </div>
      
      <v-container> <Feedback :feedbacks="feedbacks"/></v-container>
      <Footer :isMargin="isMargin" />
    </v-main>
  </v-layout>
</template>

<script>
import TopBar from "../components/TopBar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
// import Timeline from "../components/Timeline";
import Feedback from "../components/Feedback";

const logo1 = require("../assets/logo_1.svg");
const img1 = require("../assets/images/banner/pic9.jpg");
const person1 = require("../assets/images/home/person1.png");
const person2 = require("../assets/images/home/person2.png");
const person3 = require("../assets/images/home/person3.png");
const banner = require("../assets/images/banner/about-contact-banner.png");
const image1 = require("../assets/images/home/1.jpg");
const image2 = require("../assets/images/home/2.jpg");
const image3 = require("../assets/images/home/3.jpg");
const image4 = require("../assets/images/home/4.jpg");
const image5 = require("../assets/images/home/5.jpg");

export default {
  name: "AboutUs",
  components: { TopBar, Banner, Footer, Feedback },
  data: () => ({
    logo1,
    img1,
    person1,
    person2,
    person3,
    isMargin: false,
    infoBanner: {
      img: banner,
      isAbout: true,
      title1: "About Us",
      content:
        "GuiHang.US foundation and creating powerful logistics network to send good from U.S to VN",
    },
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
};
</script>
<style lang="scss">
.container {
  max-width: 1140px;
}
.about-headline{
  width: 85%;
  margin: 0 auto;
  font-size: 24px;
  line-height: 28px;
}
</style>
<style lang="scss" scoped>
.timeLine {
  background-color: #f7fdfd;
}
.section-about{
  background-color: #ebedf0;
    padding: 30px 0 30px;
}
.border-gray {
  border: 1px solid #ebedf0;
}
.price {
  color: #06b7b4;
  font-size: 32px;
  font-weight: 900;
}
.detail {
  font-size: 14px;
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
.b-note {
  background: #1b2534;
  padding: 50px;
  width: 540px;
  font-size: 18px;
  margin-top: -8%;
  z-index: 1;
  left: 15%;
}
.trusted {
  padding: 0 10% 5% 10%;
  .mt-30 {
    font-size: 16px;
    padding: 0 15%;
  }
}
@media only screen and (max-width: 768px) {
  .b-note {
    width: 400px;
    margin-top: -12%;
  }
  .container {
    .b-note-img {
      height: 400px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .b-note {
    width: 200px;
    margin-top: -20%;
    p {
      font-size: 10px;
      margin: 0 0 0 0;
      &:first-child {
        margin-bottom: 10px;
      }
    }
  }
  .container {
    .b-note-img {
      height: 300px;
    }
  }
}
</style>
