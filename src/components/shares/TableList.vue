// CustomIcon.vue
<template>
  <div class="list-order list">
    <v-row class="m-0 text-center title-header" no-gutters>
      <v-col v-for="item in headerTable" :key="item.name" class="name-title">
        <p>
          {{ item.name }}
        </p>
      </v-col>
    </v-row>
    <v-row
      class="border-item text-center align-center"
      v-for="item in orderList"
      :key="item.orderId"
      no-gutters
    >
      <v-col v-if="showCheckbox">
        <div style="display: flex; align-items: center">
          <v-checkbox class="mr-5"></v-checkbox>
        </div>
      </v-col>
      <v-col> {{ item.created }} </v-col>
      <v-col> {{ item.orderId }} </v-col>
      <v-col> {{ item.from }} </v-col>
      <v-col> {{ item.reciever }} </v-col>
      <v-col>
        <div
          :class="displayStatus(item.status)"
          class="rounded-pill text-center status d-flex justify-center"
        >
          {{ item.status }}
        </div>
      </v-col>
      <v-col cols="1" md="2">
        <div class="relative w-auto ma-auto d-inline">
          <v-icon @click="show = !show">mdi-dots-horizontal</v-icon>
          <TooltipAction :listAction="listAction" v-show="show" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TooltipAction from "../../components/shares/TooltipAction.vue";
export default {
  name: "TableList",
  props: {
    orderList: Array,
    headerTable: Array,
    showCheckbox: Boolean,
  },
  components: {
    TooltipAction,
  },
  data: () => ({
    show: false,
    listAction: [
      {
        name: "Edit",
      },
      {
        name: "Cancel",
      },
    ],
  }),
  methods: {
    displayStatus(status) {
      switch (status) {
        case "Completed":
          return "cSuccess";
        case "In Progress":
          return "cError";
        case "Failed":
          return "cInprogress";
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss">
.border-item {
  border: 1px solid #eafafa;
  margin-bottom: 20px !important;
  padding: 20px 0;
}
.status {
  padding: 10px 20px;
  font-weight: 14px;
  font-weight: 500;
}
.title-header {
  color: #1b2534;
  font-size: 16px;
  font-weight: 500;
}

@media only screen and (max-width: 600px) {
  .title-header {
    .name-title {
      p {
        font-size: 10px;
      }
    }
  }
  .border-item {
    .col {
      font-size: 10px;
    }
  }
  .rounded-pill {
    font-size: 7px;
  }
}
</style>
