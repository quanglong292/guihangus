<template>
  <div>
    <v-snackbar
      :color="infoToast.color"
      v-model="infoToast.open">
      {{ infoToast.content }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props:{
    toast:{
      type: Object,
      required: true
    }
  },
  computed:{
    infoToast(){
      return this.$props.toast
    }
  },
  data: () => ({
    snackbar: false,
  }),
};
</script>
