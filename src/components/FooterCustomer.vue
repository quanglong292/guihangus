<template>
  <div>
    <div class="footer-container">
        <img :src="logoFooter" />
        <p>© 2021 Guihang.us. All rights reserved</p>
    </div>
  </div>
</template>

<script>
const logoFooter = require("../assets/images/common/customer/logo-footer.svg");
export default {
  name: "FooterCustomer",
  data: () => ({
    logoFooter,
  }),
};
</script>
<style lang="scss">
.footer-container{
  border-top: 1px solid #D5F6F5;
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
  background: #f7f7f7;
  p{
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.2px;
    color: #696A6C;
    margin-bottom: 0;
  }
}
</style>
