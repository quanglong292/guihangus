<template>
  <div class="main-breadcrumb pt-11">
    <p 
      class="mr-3"
      v-for="(breadcrumb, index) of listBreadcrumbs" :key="index"
    >{{breadcrumb}} <span>></span></p>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data: () => ({
    titleAccount: '',
    id: null,
    listBreadcrumbs:[]
  }),
  watch: {
    '$route' () {
      this.createBreadcrumb()
    }
  },
  mounted(){
    const user = JSON.parse(localStorage.getItem('user'))
    this.titleAccount = 'User Management'
    if(user.role !== 'Customer') this.titleAccount = 'Admin Management'
    this.createBreadcrumb()
  },
  methods:{
    createBreadcrumb(){
      this.listBreadcrumbs = []
      this.listBreadcrumbs.push(...this.$route.meta.breadcrumbs)
      this.id = this.$route.params.id
      this.listBreadcrumbs.unshift(this.titleAccount)
      if(this.id) this.listBreadcrumbs.push(`${this.id}`)
    }
  }
};
</script>
<style lang="scss" scoped>
.main-breadcrumb{
  background: #f4f4f4;
  padding: 20px 40px;
  display: flex;
  padding-top: 20px !important;
  p:last-child{
    span{
      display: none !important;
    }
  }
  & > p{
    color: #5d6e85;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 0;
    span{
      display: inline-block;
      margin-left: 10px;
    }
  }

}
</style>