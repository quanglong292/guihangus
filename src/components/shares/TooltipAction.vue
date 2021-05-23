// CustomIcon.vue
<template>
  <div class="tooltip-action">
    <ul>
      <li v-for="item in listAction" :key="item.name">
        <a href="#">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TooltipAction",
  props: {
    listAction: Array,
  },
  data: () => ({}),
};
</script>
<style lang="scss">
.tooltip-action {
  position: absolute;
  top: 20px;
  left: 0;
  z-index: 10;
  background: #fff;
  width: 60px;
  filter: drop-shadow(0px 2px 7px rgba(0, 0, 0, 0.12));
  ul {
    margin-left: 0;
    padding-left: 0;
    li {
      list-style: none;
      a {
        color: #8692a4;
        display: block;
        padding: 5px 10px;
      }
      a.active,
      a:hover {
        color: #fff;
        background: linear-gradient(103.01deg, #06b7b4 0%, #00a4e4 100%);
        text-decoration: none;
      }
    }
  }
}
</style>
