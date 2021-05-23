<template>
  <v-btn 
    :class="[`${color}`]" 
    :depressed="depressed"
    :disabled="disabled"
    :width="width"
    :height="height"
    :x-large="large"
    @click="submit"
  >
    <div v-if="progress">
      <v-progress-circular
        v-if="disabled"
        class="mr-2"
        :size="20"
        :width="3"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-icon left v-if="icon">
      {{icon}}
    </v-icon>
    {{label}}
  </v-btn>
  
</template>
<script>
export default {
  name: "Header",
  props: {
    label:{
      type: String,
      require: true
    },
    color:{
      type: String,
      default: 'btn-primary'
    },
    textColor:{
      type: Boolean
    },
    depressed:{
      type: Boolean,
      default: false
    },
    disabled:{
      type: Boolean,
      default: false
    },
    width:{
      type: String
    },
    height:{
      type: String,
    },
    large: {
      type: Boolean,
      default: false
    },
    progress:{
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
    }
  },
  data: () => ({
  }),
  methods:{
    submit(){
      this.$emit('submit:btnSubmit')
    }
  }
};
</script>