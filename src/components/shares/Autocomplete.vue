<template>
  <div class="position-relative aotucomplete">
    <v-text-field
      class="input-complete"
      label="Search item"
      full-width
      v-model="search"
      autocomplete="off"
      :outlined="outlined"
      @focus="focusInput"
      @blur="hiddenList"
      @input="searchItem"
    ></v-text-field>
      <!-- @blur="showListData = false" -->
    <v-card
      class="mx-auto table-data"
      v-if="showListData"
    >
      <v-list class="list-item" v-if="listData.length > 0">
        <v-list-item-group>
          <v-list-item
            v-for="(list, i) in listData"
            :key="i"
            @click="chooseItem(i)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="list.item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div v-else class="py-3 px-2 font-bold no-data">
        No data available
      </div>
    </v-card>
  </div>
</template>
<script>

import _ from "lodash";

export default {
  name: "Header",
  props: {
    items:{
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    },
    outlined:{
      type: Boolean,
      default: false
    },
    clearText:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    listDataSearch(){
      return this.$props.items
    },
    indexContains(){
      return this.$props.index
    }
  },
  watch: {
    items(){
      this.listData = this.$props.items
    },
    clearText(){
      this.clearData()
    }
  },
  data: () => ({
    search: '',
    showListData: false,
    listData: [],
    selectItem: null
  }),
  methods:{
    searchItem: _.debounce(async function() {
      this.$emit('emit:searchText', this.search, this.indexContains)
      const data = this.listDataSearch.filter(data =>{
        return data.item.toLowerCase().match(this.search.toLowerCase())
      })
      this.listData = [...data]
    }, 500),
    chooseItem(index){
      const data = this.listData[index]
      this.search = data.item
      this.$emit('emit:objectItem', data, this.indexContains)
    },
    focusInput(){
      if(this.search == ''){
        this.listData = this.listDataSearch
      }
      this.showListData = true
    },
    clearData(){
      this.search = ''
    },
    hiddenList(){
      setTimeout(() => {
        this.showListData = false
      }, 200);
    }
  },
};
</script>
<style lang="scss" scoped>
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
.aotucomplete{
  width: 100%;
  .table-data{
    z-index: 999;
    @extend .position-absolute;
    top: 58px;
    right: 0;
    left: 0;
    .list-item{
      max-height: 200px;
      overflow: auto;
    }
    .no-data{
      opacity: .7;
      font-size: 13px;
    }
  }
}

</style>