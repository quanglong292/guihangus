<template>
  <div>
    <div
      class="package-content mb-5"
      v-for="(itemPackage, index) of dataPackage"
      :key="index"
    >
      <div class="d-flex form-info mb-0 mb-sm-10">
        <div class="left-package">
          <h3 class="h3-custom">
            <strong>Package #{{ index + 1 }}</strong>
          </h3>
          <div class="d-flex align-center ml-m50p pa-0 text-feild-custom">
            <div class="mb-0 d-flex align-center input-weight pa-0 pa-sm-2">
              <v-text-field
                class="bg-white br-0"
                v-model="itemPackage.Weight.Value"
                hide-details="auto"
                outlined
                dense
                chips
                small-chips
                type="number"
                @input="emitInfoPackage"
                :rules="rules.weight"
              />
            </div>
            <span class="unit-weight label-size br-0">lb</span>
          </div>
        </div>
        <div class="right-package">
          <v-btn
            elevation="0"
            class="bg-color br-0 btn-add-package txt-color-white text-capitalize"
            v-if="index == (dataPackage.length - 1)"
            @click="addMorePackage"
            >Add <span class="desktop">Package</span>
          </v-btn>
          <v-btn
            v-if="dataPackage.length > 1"
            class="txt-color-white text-capitalize ml-2"
            color="error"
            @click="removeMorePackgae(index)"
          >
            X
          </v-btn>
        </div>
      </div>
      <div class="mt-3">
        <span>Items</span>
        <div class="mt-3" v-if="itemPackage.items.length > 0">
          <v-row>
            <v-col
              v-for="(item, idx) of itemPackage.items"
              :key="idx"
              cols="6"
              class="d-flex flex-rss justify-space-between align-center row-itemPackage"
            >
              <span class="br-0"
                >{{ item.item }} x {{ item.quanlity }} {{ item.unit }}</span
              >
              <span
                class="pa-2 remove-item br-0"
                @click="removedItemPackage(index, idx)"
              >
                <v-img :src="vectorImage"
              /></span>
            </v-col>
          </v-row>
        </div>
        <div class="grid-container mt-3 display-custom">
          <Autocomplete
            outlined
            :items="itemConstraints[index]"
            :index="index"
            :clearText="clearText"
            @emit:objectItem="getObjectItem"
            @emit:searchText="getTextSeatch"
          />
          <v-text-field
            class="br-0 input-custom"
            v-model="itemsPackage[index].quanlity"
            label="Quantity"
            outlined
            dense
            chips
            small-chips
            :rules="rules.quanlity"
            type="number"
          ></v-text-field>
          <v-text-field
            class="br-0 input-custom"
            v-model="itemsPackage[index].unit"
            label="Unit"
            outlined
            dense
            chips
            :rules="rules.unit"
            small-chips
          ></v-text-field>
        </div>
        <div class="text-right mt-3">
          <v-btn
            elevation="0"
            class="text-capitalize br-0"
            v-on:click="addItemPackage(index)"
            ><strong>Save item</strong></v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from "@component/shares/Autocomplete";
import _ from "lodash";

import { rateOrder } from "@store/label";
import { quotations } from "@store/quotation";

const vectorImage = require("../../assets/images/create-label/vector.svg");

export default {
  name: "Package",
  components:{Autocomplete},
  props: {
    inforPackage: {
      type: Array,
      required: true
    },
    reciverAddress: {
      type: String,
      required: true
    }
  },
  data: () => ({
    vectorImage,
    total: 0,
    totalLbs: 0,
    checktest: false,
    checkFilter: false,
    clearText: false,
    checkForm: false,
    search: null,
    itemsInPackage: [],
    itemConstraints: [],
    itemsPackage: [],
    textSearchs: [],
    mockItemConstraints: [],
    samplePackage: {
      item: "",
      quanlity: 1,
      unit: "Cái",
      price: 0,
      id: ""
    },
    rules: {
      weight: [
        (value) => !!value || "Required.",
        (value) => value <= 40 || "Max 40 lbs",
        (value) => value > 0 || "Min > 0 lbs",
        (value) => {
          const pattern = /[0-9]$/;
          return pattern.test(value) || "Invalid phone number.";
        }
      ],
      quanlity: [
        (value) => !!value || "Required.",
        (value) => value > 1 || "Min is 1lbs",
      ],
      unit: [
        (value) => !!value || "Required.",
      ]
    }
  }),
  created() {
    this.getQuotations();
    for (let i = 0; i < this.dataPackage.length; i++) {
      this.itemsPackage.push(this.samplePackage);
      this.textSearchs.push("");
    }
  },
  computed: {
    dataPackage() {
      return this.$props.inforPackage;
    },
    adressReciver() {
      return this.$props.reciverAddress;
    }
  },
  watch: {
    adressReciver() {
      if (this.checkForm && this.adressReciver != "") {
        this.emitInfoPackage();
      }
    }
  },
  methods: {
    addItemPackage(index) {
      if (this.textSearchs[index] && this.textSearchs[index] != "") {
        const data = this.itemsPackage[index];
        data.item = this.textSearchs[index];
        if (data.item != "" && data.quanlity > 0 && data.unit != "") {
          const item = _.pick(data, [
            "id",
            "item",
            "quanlity",
            "unit",
            "price"
          ]);
          this.dataPackage[index].items.push(item);
          this.clearItem(index);
        }
        this.emitInfoPackage();
        this.textSearchs[index] = "";
        this.clearText = !this.clearText
      }
    },
    async getQuotations() {
      const result = await quotations({trash: false, page: 1});
      this.mockItemConstraints = result?.data?.map(item => {
        const resultItem = {
          item: item.title,
          quanlity: 1,
          unit: item.unit,
          price: item.fee,
          id: item._id
        };
        return resultItem;
      });
      setTimeout(() => {
        this.itemConstraints.push(this.mockItemConstraints);
      }, 1000);
    },
    removedItemPackage(indexPackages, idx) {
      const item = this.dataPackage[indexPackages].items[idx];
      this.total -= item.price * item.quanlity;
      this.dataPackage[indexPackages].items.splice(idx, 1);
      this.emitInfoPackage();
    },
    addMorePackage() {
      const packageItem = {
        SequenceNumber: "1",
        Weight: {
          Units: "LB",
          Value: 0
        },
        Dimensions: {
          Length: "12",
          Width: "12",
          Height: "12",
          Units: "IN"
        },
        items: []
      };
      if (this.dataPackage.length > 0) {
        if (this.checkForm) this.dataPackage.push(packageItem);
      } else this.dataPackage.push(packageItem);
      this.itemsPackage.push(this.samplePackage);
      this.textSearchs.push("");
      this.itemConstraints.push(this.mockItemConstraints);
      this.emitInfoPackage();
    },
    removeMorePackgae(index) {
      const data = this.dataPackage[index];
      if (data.items.length > 0) {
        data.items.forEach(e => {
          this.total -= e.price * e.quanlity;
          if(this.total < 0) this.total = 0
        });
      }
      this.dataPackage.splice(index, 1);
      this.emitInfoPackage();
    },
    clearItem(index) {
      this.itemsPackage[index] = {
        item: "",
        quanlity: 1,
        unit: "Cái",
        price: 0,
        id: ""
      };
    },
    emitInfoPackage: _.debounce(async function() {
      this.checkForm = true;
      const dataRates = [];
      this.totalLbs = 0;
      for (let i = 0; i < this.dataPackage.length; i++) {
        const packageItem = this.dataPackage[i];
        if (packageItem.items.length == 0 || packageItem.Weight.Value <= 0 || packageItem.Weight.Value > 40) {
          this.checkForm = false;
          break;
        } else {
          this.totalLbs += Number(packageItem.Weight.Value);
          const itemDataRates = {
            weight: packageItem.Weight.Value,
            address: this.adressReciver,
            products: []
          };
          packageItem.items.map(item => {
            itemDataRates.products.push({ id: item.id, qty: item.quanlity });
          });
          dataRates.push(itemDataRates);
        }
      }
      if (this.checkForm && this.adressReciver != "") {
        const result = await rateOrder({ body: dataRates });
        this.total = result?.data;
      }
      this.$emit("update:package", this.total, this.totalLbs, this.checkForm);
    }, 1000),
    getObjectItem(obj, index){
      this.textSearchs[index] = obj.item
      this.itemsPackage[index] = obj
      this.$forceUpdate()
    },
    getTextSeatch(text, idx){
      this.textSearchs[idx] = text
    }
  }
};
</script>
<style lang="scss" scoped>
.label-size {
  font-size: 15px;
}
.h2-custom {
  color: #5D6E85 !important;
}
.left-package {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 860px) {
    width: 65%;
  }
  @media screen and (max-width: 768px) {
    width: 35%;
  }
  @media screen and (max-width: 754px) {
    width: 40%;
  }
  @media screen and (max-width: 678px) {
    width: 45%;
  }
  @media screen and (max-width: 592px) {
    width: 50%;
  }
  @media screen and (max-width: 480px) {
    width: 55%;
  }
  @media screen and (max-width: 375px) {
    width: 65%;
  }
}
.right-package {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}
.display-custom {
  display: flex !important;
}
.flex-rss {
  @media screen and (max-width: 768px) {
    flex-direction: column !important;
  }
}
.bg-color {
 span.desktop{
   margin-left: 5px;
 }
}
.txt-color-white {
  color: white !important;
}
.custom-selected {
  margin: 0;
  min-height: 39px;
}
.bg-white {
  background-color: #fff;
}
.bg-smoker {
  background-color: #ebedf0;
  border-radius: 4px;
}
.h3-custom {
  color: #354A67;
  white-space: nowrap;
  margin-right: 30px;
  @media screen and (max-width: 987px) {
    font-size: 14px;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
}
.text-feild-custom {
  width: 150px;
  @media screen and (max-width: 600px) {
    width: 120px;
    margin-right: 20px;
  }
  @media screen and (max-width: 550px) {
    width: 100px;
  }
}
.input-custom {
  max-width: 80px !important;
  border-left: none;
  @media screen and (max-width: 768px) {
    width: 60px;
  }
}
.form-info {
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.btn-add-package {
  @media screen and (max-width: 960px) {
    font-size: 12px;
  }
  @media screen and (max-width: 830px) {
    padding: 0 16px !important;
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    padding: 0 10px !important;
    font-size: 12px;
    margin: 0;
  }
}
.ml-m50p {
  @media screen and (max-width: 768px) {
    margin-left: -50px;
  }
  @media screen and (max-width: 607px) {
    margin-left: -30px;
  }
  @media screen and (max-width: 600px) {
    margin-left: 0px;
  }
}
.desktop {
  @media screen and (max-width: 600px) {
    display: none;
  }
}
.tablet {
  @media screen and (max-width: 17777px) {
    display: none;
  }
  @media screen and (max-width: 610px) {
    display: inline-block;
  }
}
::v-deep {
  .package-content {
    .grid-container {
      // display: grid;
      // grid-template-columns: 1fr auto auto;
      display: flex;
      .v-text-field--outlined fieldset{
        border-color: #EBEDF0 !important;
      }
      .v-autocomplete{
        flex-grow: 1 !important;
      }
      .v-text-field {
        flex-grow: 0;
        // width: 100px;
        .v-input__control {
          @extend .custom-selected;
          .v-input__slot {
            @extend .custom-selected;
          }
          .v-text-field__details {
            display: none;
          }
          .v-select__slot {
            .v-input__append-inner {
              display: none;
            }
          }
        }
      }
    }
    .remove-item {
      cursor: pointer;
    }
    .row-itemPackage {
      opacity: 0.8;
    }
    .unit-weight {
      padding: 8px 14px;
      border: 1px solid #ebedf0;
      background: #fff;
      border-radius: 4px;
      height: 41px;
      @extend .bg-white;
      border-left: unset;
    }
    .input-weight {
      padding-right: 0px !important;

      width: 100%;
      .v-text-field {
        position: relative;
        .v-input__control {
          border: 1px solid #ebedf0;
          fieldset {
            border-color: transparent !important;
          }
          @extend .custom-selected;
          .v-input__slot {
            @extend .custom-selected;
          }
          .v-text-field__details {
            position: absolute;
            bottom: -25px;
          }
          .v-select__slot {
            .v-input__append-inner {
              display: none;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 900px) {
    .package-content {
      .grid-container {
        display: block;
        .v-input {
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
