<template>
  <div>
    <v-container class="main-label elevation-2 rounded">
      <v-row>
        <v-col class="col-6">
          <v-btn-toggle dense background-color='transparent' class="d-flex justify-end">
            <v-btn class="btn-print" @click="printLabel"
              ><v-icon class="text-light">mdi-cloud-print-outline</v-icon> PRINT LABEL</v-btn
            >
            <v-btn class="btn-download" @click="() => downloadLabel()"
              ><v-icon class="text-light">mdi-download-circle-outline</v-icon> DOWNLOAD LABEL</v-btn>
          </v-btn-toggle>
          <v-card
            class="mb-12 img-label"
            v-for="(img, index) of labels"
            :key="index"
          >
            <v-img :src="img" />
          </v-card>
        </v-col>
        <v-col class="col-6">
          <v-row>
            <v-col>
              <div class="label-infomation">
                <div class="label-info-block">
                  <h1>Shipping Label Essentials</h1>
                  <h2>Print Shipping Labels</h2>
                  <p>
                    It’s highly advised to avoid using inkjet printers, but they will generally do okay if you only print a handful of labels a month. However, be careful to ensure everything on the page is clear and sharp, and that the ink has not smudged. 
                  </p>
                  <p>As you begin to print more labels, take note that printer ink is expensive, and this option can be costly. </p>
                </div>
                <div class="label-info-block">
                  <h2>Put Shipping Labels On The Box</h2>
                  <p>A shipping label is normally placed on the largest side of the package, ideally on the top. This is especially important if there is a “This Way Up” label on the package. The label should be the correct size so it fits entirely on the side where it’s placed. Ensure it is not folded over any edges; important information might not be seen or be able to be scanned. </p>
                  <p>Make sure the labels are firmly secured, with no corners sticking up, and no bumps that could damage the label and make it unreadable. </p>
                </div>
                <div class="label-info-block">
                  <h2>Extra Labelling Information For The Delivery</h2>
                  <p>Extra label information can have many uses, but it can sometimes be restricted or even prohibited by the carrier. Before you use any extra labelling, make sure to check your carrier’s guidelines. However, extra label information can help to inform the carrier of any special requirements and prepare for any issues with the contents. They also help the goods arrive in perfect condition, which is vital for your customers’ satisfaction, avoiding bad reviews or extra costs for replacements and redelivery.</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-col class="bottom-label-result">
        <v-container class="no-padding">
          <v-flex class="d-flex align-center">
            <v-col>
              <p class="tit">FAQs</p>
              <p>
                Stressed about shipping? Please read our FAQs for more infomation.
              </p>
            </v-col>
            <v-col class="right-bottom-label">
              <v-expansion-panels accordion class="elevation-2">
                <v-expansion-panel>
                  <v-expansion-panel-header>Create Your Labels Online?</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>Use Shipping Label Software?</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>Fully Automate With A Shipping Tool?</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>How To Print Shipping Labels?</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>Where To Put Shipping Labels On The Box?</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-flex>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { compressLabel } from "@store/label";
const downloadImage = require("../../assets/images/create-label/dowload.png");

export default {
  name: "LabelResult",
  props: {
    listLabels: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    downloadImage,
  }),
  computed: {
    labels() {
      return this.$props.listLabels;
    },
  },
  methods: {
    async downloadLabel() {
      const result = await compressLabel(this.labels);
      const file = new File([result], "labels.pdf");

      let link = document.createElement("a");
      const url = window.URL.createObjectURL(file);

      link.href = url;
      link.download = "Report.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    },
    async printLabel() {
      let iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.srcdoc = this.labels.reduce((a, b) => a += `<img src="${b}" />`, "");
      document.body.appendChild(iframe);

      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    },
  },
};
</script>
<style lang="scss" scoped>
.main-content{
  color: #ebedf0;
}
.text-light{
  color: #FFF !important;
  margin-right: 5px;
}
.h2-custom {
  color: #5D6E85 !important;
}
.create-label-page p{
  color: #FFF !important;
  line-height: 1.4rem;
}
.main-label {
  padding: 30px;
  margin-top: -80px;
  background-color: #1B2534;
  z-index: 999999999;
  position: relative;
  .img-label {
    margin-top: 20px;
    box-shadow: 0px 10px 23px rgba(0, 0, 0, 0.12);
    .v-image {
      .v-image__image {
        background-size: contain;
      }
    }
  }
}

.btn-print.v-btn.v-btn--has-bg,
.btn-download.v-btn.v-btn--has-bg {
  background: #06b7b4;
  color: #fff;
  font-size: 12px;
  padding: 0 15px;
  opacity: 1;
}
.btn-print.v-btn{
  border-radius: 5px 0 0 5px !important;
}
.btn-download.v-btn{
  border-radius: 0 5px 5px 0 !important;
}
.btn-print.v-btn.v-btn--has-bg:hover,
.btn-download.v-btn.v-btn--has-bg:hover{
  background: #23a3a1;
}
.label-infomation {
  background: #1B2534;
  color: #fff;
  padding: 45px 30px 0 0;
  font-size: 18px;
  z-index: 1;
  position: relative;
  .label-info-block{
    margin-bottom: 25px;
  }
  h1{
    color: #FFF;
    margin-bottom: 25px;
  }
  h2 {
    margin-bottom: 10px;
    font-size: 24px;
    color: #FFF;
  }
  ul {
    // width: 70%;
    li {
      margin-bottom: 10px;
    }
  }
}

.bottom-label-result {
  background: #face7d;
  padding-top: 160px;
  margin-top: -80px;
  padding-bottom: 0 !important;
  .tit {
    color: #696a6c !important;
    font-size: 26px;
    margin: 20px 20px 20px 0;
  }
  p {
    font-size: 38px;
    line-height: 38px;
    color: #05070a !important;
    margin-bottom: 0;
  }
  .right-bottom-label {
    // background: #fff;
    padding: 0 0 40px !important;
    ul {
      padding-left: 0;
      li {
        background: url("../../assets/images/create-label/math-plus.png")
          no-repeat 0 0;
        padding: 4px 0 5px 40px;
        margin-bottom: 20px;
        list-style: none;
        background-size: 18px;
        background-position: left center;
        a {
          color: #05070a;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
