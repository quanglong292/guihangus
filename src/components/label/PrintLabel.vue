<template>
  <div>
    <v-row>
      <v-col md="7" class="right-result">
        <div class="block">
          <h2 class="label-title mb-8">Here is your label</h2>
          <p class="label-content mb-12">
            Sit id odio urna sagittis lectus tempor risus. Amet, fames nulla
            nisi viverra laoreet morbi et a.
          </p>
        </div>
      </v-col>
      <v-col md="5">
        <v-card class="mb-7 box-action">
          <div class="grid-container">
            <div
              class="py-4 d-flex align-center justify-center font-bold"
              @click="printLabel"
            >
              <img
                :src="require('../../assets/images/order-detail/ico_print.png')"
              />
              <span class="ml-2">Print</span>
            </div>
            <div class="d-flex align-center justify-center font-bold">
              <v-btn
                @click="() => downloadLabel()"
                width="100%"
                height="100%"
                class="bg-tranparent"
                :disabled="downloadBtn"
              >
                <img
                  :src="
                    require('../../assets/images/order-detail/ico_download.png')
                  "
                />
                <span class="ml-2 text-capitalize"> Download </span>
              </v-btn>
            </div>
            <div>
              <v-btn
                width="100%"
                height="100%"
                class="bg-tranparent"
              >
              <span class="ml-2 text-capitalize"> Order details </span>
              </v-btn>
              <!-- <Button
                label="Show Receipt"
                color="bg-tranparent"
                width="100%"
                height="100%"
                :disabled="submitStatus"
              /> -->
              <!-- <Button
                label="Back"
                color="bg-tranparent"
                width="100%"
                height="100%"
                :disabled="submitStatus"
              /> -->
            </div>
          </div>
        </v-card>
        <!-- <v-flex class="mb-8 ml-2">
          <v-btn class="btn-print mr-4" @click="printLabel">PRINT LABEL</v-btn>
          <v-btn @click="() => downloadLabel()"
            ><v-img
              :src="require('../../assets/images/create-label/download.png')"
              width="1"
            />
          </v-btn>
        </v-flex> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col md="7" class="right-result">
        <v-row>
          <v-col>
            <div class="label-infomation">
              <div class="pb-8">
                <h2>Mi elit cras vitae ac.</h2>
                <ul>
                  <li>Id sit pretium sagittis, arcu.</li>
                  <li>Viverra cras feugiat odio porttitor nam habitant.</li>
                  <li>Lacus vel sed aenean et pulvinar faucibus.</li>
                  <li>
                    Dignissim in quis elit mauris, erat enim neque pharetra.
                  </li>
                  <li>
                    Vestibulum egestas nisl praesent ut tincidunt mauris nunc,
                    interdum.
                  </li>
                  <li>
                    Proin iaculis mauris ut dolor viverra purus ut facilisis
                    duis.
                  </li>
                </ul>
              </div>
              <div class="">
                <h2>Aliquet justo lectus.</h2>
                <ul>
                  <li>Lorem mattis pharetra nibh a.</li>
                  <li>
                    Arcu sit at ut sit volutpat vitae molestie in. Augue tellus
                    mauris.
                  </li>
                  <li>
                    Condimentum at magna vulputate donec mauris orci viverra
                    justo non.
                  </li>
                  <li>
                    Morbi phasellus sagittis gravida eget. Velit cursus ante ut
                    sed sit.
                  </li>
                  <li>
                    Nam odio morbi suspendisse eleifend. In quis iaculis
                    commodo.
                  </li>
                  <li>
                    Eleifend velit ultrices non id at vitae leo. Amet convallis
                    condimentum.
                  </li>
                </ul>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="5">
        <div class="mb-12" v-for="(img, index) of listLabels" :key="index">
          <p class="label-package">Package #{{ index + 1 }}</p>
          <v-card class="mb-12 img-label">
            <v-img :src="img" />
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { compressLabel } from "@store/label";
export default {
  name: "PrintLabel",
  props: {
    listLabels: {
      type: Array,
      required: true
    }
  },
  components: {},
  data: () => ({
    downloadBtn: false,
    stepper: {
      package: false,
      from: false,
      to: false
    }
  }),
  methods: {
    async downloadLabel() {
      this.downloadBtn = true
      const result = await compressLabel(this.$props.listLabels);
      const file = new File([result], "labels.pdf");

      let link = document.createElement("a");
      const url = window.URL.createObjectURL(file);

      link.href = url;
      link.download = "Report.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
      this.downloadBtn = false
    },
    async printLabel() {
      let iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.srcdoc = this.listLabels.reduce(
        (a, b) => (a += `<img src="${b}" />`),
        ""
      );

      document.body.appendChild(iframe);

      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    div {
      cursor: pointer;
      &:hover {
        background-color: whitesmoke;
      }
    }
  }
  .bg-tranparent {
    background-color: transparent !important;
  }
  .box-action.box-action.box-action.box-action.box-action {
    padding: 10px;
    margin-bottom: 0 !important;
    span {
      font-size: 14px !important;
    }
    button {
      font-weight: bold;
      text-transform: inherit !important;
      white-space: inherit !important;
      font-size: 13px !important;
      height: 100% !important;
      // &:hover::before {
      //   background: transparent !important;
      //   opacity: 1 !important;
      // }
    }
  }
  .btn-print.v-btn.v-btn--has-bg {
    background: #06b7b4;
    color: #fff;
    font-size: 12px;
    padding: 20px 34px;
  }

  .label-infomation {
    background: #ffffff;
    color: #5d6e85;
    padding: 20px 25px;
    font-size: 18px;
    z-index: 1;
    position: relative;
    h2 {
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.2px;
      color: #06b7b4;
    }
    ul {
      width: 70%;
      li {
        margin-bottom: 5px;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.1px;
        color: #5d6e85;
      }
    }
  }
  .img-label {
    margin: 0 auto;
    .v-image {
      .v-image__image {
        background-size: contain;
      }
    }
  }
  .label-title {
    font-style: normal;
    font-weight: bold;
    font-size: 44px;
    line-height: 54px;
    color: #5d6e85;
  }
  .label-content {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: #5d6e85;
  }
  .label-package {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #354a67;
  }
}
</style>
