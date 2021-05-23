<template>
  <div class="text-center">
    <v-dialog
      :value="openDialog"
      @input="$emit('dialog:close')"
      width="600"
      content-class="order-dialog cancel-dialog"
    >
      <v-card class="overflow-hidden">
        <div class="header-dialog">
          <div class="h-top-dialog">
            <p></p>
            <p @click="$emit('dialog:close')"><img :src="icoClose" /></p>
          </div>
          <v-row>
            <v-col cols="12" sm="8" class="mx-auto">
              <h2>{{ title }}</h2>
              <p>{{ caption }}</p>
            </v-col>
          </v-row>
        </div>
        <div class="body-dialog">
          <v-row>
            <v-col cols="12" sm="10" class="mx-auto">
              <v-textarea
                outlined
                placeholder="Please nter reason that make you decide to cancel this order."
                v-model="content"
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row>
        </div>
        <div class="footer-dialog">
          <Button
            label="Submit"
            color="btn-confirm text-capitalize"
            :disabled="disabled"
            @submit:btnSubmit="$emit('submit:Cancel', content)"
          />
          <v-btn class="btn-cancel" @click="$emit('dialog:close')">
            Close
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Button from "@component/shares/Button";

const icoClose = require("../../assets/images/common/icon/close_lg.png");
export default {
  props: {
    dialog: {
      type: Boolean,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    caption: {
      type: String,
      require: true
    },
    disabledBtn: {
      type: Boolean,
      require: true
    }
  },
  components: { Button },
  computed: {
    openDialog() {
      return this.$props.dialog;
    },
    disabled(){
      return this.$props.disabledBtn
    }
  },

  data: () => ({
    icoClose,
    content: null
  }),
};
</script>
<style lang="scss">
.cancel-dialog {
  .body-dialog {
    border: none !important;
    width: 100%;
    .v-textarea{
      fieldset{
        border-color: #EBEDF0 !important;
      }
    }
    textarea {
      height: 80px;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.2px;
      resize: none;
    }
    textarea::placeholder{
      color: #8692A4;
      font-style: italic;
      font-size: 12px;
    }
  }
  .v-btn{
    text-transform: inherit !important;
  }
}
</style>