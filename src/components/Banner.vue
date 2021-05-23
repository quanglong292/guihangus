<template>
  <div class="main-banner" :style="{ 'background-image': 'url(' + infoBanner.img + ')' }">
    <v-container>
      <div class="banner-wrapper">
      <div
        :class="
          infoBanner.createLabel
            ? 'info-banner-createLabel'
            : 'info-banner'
        "
      >
        <h1>{{ infoBanner.title1 }}</h1>
        <h1 v-if="infoBanner.isContact">{{ infoBanner.title }}</h1>
        <h1 class="bottom-h1">
          {{ infoBanner.title2 }}
          <div class="unit">{{ infoBanner.unit }}</div>
        </h1>
        <p class="mt0">{{ infoBanner.content }}</p>
        <router-link class="router-btn" to="/create-label">
          <v-btn elevation="0" v-if="infoBanner.isHomepage" class="btn-banner">
            Create label now
          </v-btn></router-link
        >
        </div>
      </div></v-container
    >
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    infoBanner: Object,
  },
  data: () => ({

  }),
};
</script>
<style lang="scss">
.banner-wrapper{
  position: relative;
  width: 100%;
  height: 370px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 50px;
}
.main-banner {
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  height: 400px;
  margin-top: -80px;
  .info-banner {
    color: #fff;
    z-index: 2;

    h1 {
      font-size: 48px;
      margin-bottom: 5px;
      color: #fff;
    }
    p {
      font-size: 18px;
      margin-top: 0;
      width:65%;
    }
  }
  .info-banner-createLabel {
    width: 100%;
    color: #fff;
    transform: translate(0%, -50%);
    z-index: 2;
    // top: 50%;
    // left: 0;
    text-align: center;
    margin-bottom: 20px;
    h1 {
      line-height: 42px;
      font-size: 42px;
      color: #fff;
      @media screen and (max-width: 1100px) {
        font-size: 55px;
        line-height: 85px;
      }
      @media screen and (max-width: 885px) {
        font-size: 50px;
        line-height: 75px;
      }
      @media screen and (max-width: 768px) {
        font-size: 45px;
        line-height: 75px;
      }
      @media screen and (max-width: 680px) {
        font-size: 40px;
        line-height: 55px;
      }
      @media screen and (max-width: 580px) {
        font-size: 35px;
        line-height: 55px;
      }
      @media screen and (max-width: 485px) {
        font-size: 25px;
      }
      @media screen and (max-width: 370px) {
        font-size: 20px;
      }
    }
    p {
      margin-top: 5px;
      font-size: 18px;
      color: #fff !important;
      @media screen and (max-width: 1100px) {
        font-size: 17px;
      }
      @media screen and (max-width: 600px) {
        font-size: 16px;
      }
      @media screen and (max-width: 585px) {
        margin-top: -5px;
        font-size: 15px;
      }
      @media screen and (max-width: 485px) {
        font-size: 14px;
      }
      @media screen and (max-width: 425px) {
        font-size: 13px;
      }
      @media screen and (max-width: 370px) {
        font-size: 12px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.banner {
  // max-width: 1140px;
}
.router-btn {
  a {
    text-decoration: none !important;
  }
  text-decoration: none !important;
  :hover {
    text-decoration: none !important;
  }
  :focus {
    text-decoration: none !important;
  }
}
.btn-banner {
  a {
    text-decoration: none !important;
  }
  text-decoration: none !important;
  :hover {
    text-decoration: none !important;
  }
  :focus {
    text-decoration: none !important;
  }
  width: 250px;
  height: 50px;
  border-radius: 4px;
  background-color: #ff6800 !important;
  color: white;
  margin-top: 20px;
  @media screen and (max-width: 768px) {
    width: 230px;
    height: 50px;
  }
  @media screen and (max-width: 375px) {
    width: 200px;
    height: 50px;
  }
}
.info-banner {
  // margin-top: 10%;
  @media screen and (max-width: 900px) {
    margin-left: 55px;
  }
  @media screen and (max-width: 768px) {
    margin-left: 45px;
  }
  @media screen and (max-width: 530px) {
    margin-left: 35px;
  }
  @media screen and (max-width: 340px) {
    margin-left: 25px;
  }
  h1 {
    display: flex;
    @media screen and (max-width: 1100px) {
      font-size: 55px;
      line-height: 75px;
    }
    @media screen and (max-width: 885px) {
      font-size: 50px;
      line-height: 75px;
    }
    @media screen and (max-width: 768px) {
      font-size: 45px;
      line-height: 75px;
    }
    @media screen and (max-width: 680px) {
      font-size: 40px;
      line-height: 55px;
    }
    @media screen and (max-width: 580px) {
      font-size: 35px;
      line-height: 55px;
    }
    @media screen and (max-width: 485px) {
      font-size: 25px;
    }
    @media screen and (max-width: 370px) {
      font-size: 20px;
    }
  }
  .bottom-h1 {
    margin-top: -25px;
    @media screen and (max-width: 1100px) {
      margin-top: -18px;
    }
    @media screen and (max-width: 681px) {
      margin-top: -12px;
    }
    @media screen and (max-width: 485px) {
      margin-top: -20px;
    }
  }
  .unit {
    font-size: 25px;
    padding-top: 0.6rem;
    font-weight: normal;
    @media screen and (max-width: 1100px) {
      font-size: 22px;
      margin-top: -20px;
    }
    @media screen and (max-width: 681px) {
      font-size: 20px;
      margin-top: -18px;
    }
    @media screen and (max-width: 600px) {
      font-size: 18px;
      margin-top: -18px;
    }
    @media screen and (max-width: 585px) {
      font-size: 16px;
    }
    @media screen and (max-width: 485px) {
      margin-top: -16px;
      font-size: 15px;
    }
    @media screen and (max-width: 425px) {
      font-size: 14px;
    }
    @media screen and (max-width: 370px) {
      margin-top: -14px;
      font-size: 13px;
    }
  }
  p {
    margin-top: 10px;
    @media screen and (max-width: 1100px) {
      font-size: 18px;
    }
    @media screen and (max-width: 600px) {
      font-size: 16px;
    }
    @media screen and (max-width: 585px) {
      font-size: 15px;
    }
    @media screen and (max-width: 485px) {
      font-size: 14px;
    }
    @media screen and (max-width: 425px) {
      font-size: 13px;
    }
    @media screen and (max-width: 370px) {
      font-size: 12px;
    }
  }
}
.img-banner {
  width: 100%;
  @media screen and (max-width: 1700px) {
    height: 440px !important;
  }
  @media screen and (max-width: 1100px) {
    height: 400px !important;
  }
}
</style>
