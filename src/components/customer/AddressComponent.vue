<template>
  <div class="px-16 pb-16">
    <!-- <h2 class="mb-4 text-primary text-center">Add new address</h2>
    <v-row>
      <v-col>
        <label class="mb-2 d-block">Sender’s name</label>
        <v-text-field
          hide-details="auto"
          outlined
          dense
          chips
          small-chips
          type="text"
          placeholder="Enter your name"
        ></v-text-field>
      </v-col>
      <v-col>
        <label class="mb-2 d-block">Company</label>
        <v-text-field
          hide-details="auto"
          outlined
          dense
          chips
          small-chips
          type="text"
          placeholder="Optional"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label class="mb-2 d-block">Email</label>
        <v-text-field
          hide-details="auto"
          outlined
          dense
          chips
          small-chips
          type="text"
          placeholder="Used for providing notifications"
        ></v-text-field>
      </v-col>
      <v-col>
        <label class="mb-2 d-block">Phone</label>
        <v-text-field
          hide-details="auto"
          outlined
          dense
          chips
          small-chips
          type="text"
          placeholder="Optional"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label class="mb-2 d-block">Address</label>
        <v-text-field
          hide-details="auto"
          outlined
          dense
          chips
          small-chips
          type="text"
          placeholder="Street address"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label class="mb-2 d-block">City or ZIP Code</label>
        <v-autocomplete
          v-model="indexZip"
          :items="zipCodes"
          item-text="PostalCode"
          item-value="index"
          outlined
          dense
        ></v-autocomplete>
        <div class="input-field-note">
          Search and select a city or zipcode from the dropdown
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-center mt-8 text-center">
      <v-col>
        <v-btn class="btn-primary w-auto px-10" height="40">Save</v-btn>
      </v-col>
    </v-row> -->
    <div></div>
    
  </div>
</template>

<script>
// import Shipper from "@component/label/LabelShipper";
export default {
  name: "AddressComponent",
  props: {
    isSender:{
      type: Boolean,
      require: true
    }
  },
  // components: { Shipper },
  data: () => ({
  }),
};
</script>
<style lang="scss">
.address-item {
  color: #fff;
  background: #00a4e4;
  width: 160px;
  height: 160px;
}
.ico_close {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
