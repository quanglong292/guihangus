<template>
  <div class="text-center">
    <v-dialog :value="openDialog" @input="$emit('dialog:close')" width="500" content-class="modal-remove">
      <v-card>
        <div class="header-dialog">
          <div class="h-top-dialog">
            <p></p>
            <p @click="$emit('dialog:close')"><img :src="icoClose" /></p>
          </div>
          <img :src="icoRemove" v-if="!isRestore" />
          <img :src="icoActiveOrder" v-if="isRestore"/>
          <h2>Move to trash?</h2>
          <p>
            You want to move:
            <strong v-for="(item, index) of listItems" :key="index"
              >{{ item }}{{ items.length == index + 1 ? "" : ", " }}</strong
            >
            {{ isRestore ? "to Lists" : "to Trash" }}
            <!-- <span v-if="identifyRemove === 'user'">
              <strong v-for="(item, index) of listItems" :key="index"
                >{{ item.fullName }}{{ items.length == index + 1 ? "" : ", " }}</strong
              >
              {{ isRestore ? "to Users" : "to Trash" }}
            </span> -->
          </p>
        </div>
        <div class="footer-dialog">
          <Button
            label="Proceed"
            class="btn-confirm"
            width="50%"
            :disabled="disabled"
            @submit:btnSubmit="acceptRemove"
          />
          <!-- <v-btn class="btn-confirm" @click="acceptRemove"> Proceed </v-btn> -->
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Button from "@component/shares/Button";

const icoClose = require("../../assets/images/common/icon/close_lg.png");
const icoRemove = require("../../assets/images/common/icon/remove-list.svg");
const icoActiveOrder = require("../../assets/images/common/icon/remove-trash.svg");
export default {
  props: {
    dialog: {
      type: Boolean,
      require: true
    },
    items: {
      type: Array,
      require: true
    },
    isRestore: {
      type: Boolean,
      default: false
    },
    disabledBtn: {
      type: Boolean,
      default: false
    }
  },
  components:{Button},
  computed: {
    listItems(){
      return this.$props.items
    },
    openDialog(){
      return this.$props.dialog
    },
    disabled(){
      return this.$props.disabledBtn
    }
  },
  
  data: () => ({
    icoClose,
    icoRemove,
    icoActiveOrder
  }),
  methods: {
    acceptRemove() {
      this.$emit("remove:Accept");
    }
  }
};
</script>